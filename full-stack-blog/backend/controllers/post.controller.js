import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { ensureUserByClerkId } from "../lib/ensureUser.js";

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const query = {};

    const cat = req.query.cat;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;

    if (cat) query.category = cat;

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    if (author) {
      const user = await User.findOne({ username: author }).select("_id");

      if (!user) {
        return res.status(404).json({ message: "No post found!" });
      }

      query.user = user._id;
    }

    let sortObj = { createdAt: -1 };

    if (sortQuery) {
      switch (sortQuery) {
        case "newest":
          sortObj = { createdAt: -1 };
          break;
        case "oldest":
          sortObj = { createdAt: 1 };
          break;
        case "popular":
          sortObj = { visit: -1 };
          break;
        case "trending":
          sortObj = { visit: -1 };
          query.createdAt = {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          };
          break;
      }
    }

    if (featured) query.isFeatured = true;

    const posts = await Post.find(query)
      .populate("user", "username img")
      .sort(sortObj)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPosts = await Post.countDocuments(query);
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to load posts" });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "user",
      "username img"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to load post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await ensureUserByClerkId(clerkUserId);

    if (!req.body?.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    let slug = String(req.body.title).replace(/ /g, "-").toLowerCase();

    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    const newPost = new Post({ user: user._id, slug, ...req.body });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json("Post has been deleted");
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost) {
      return res.status(403).json({ message: "You can delete only your posts!" });
    }

    res.status(200).json("Post has been deleted");
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete post" });
  }
};

export const featurePost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role !== "admin") {
      return res.status(403).json({ message: "You cannot feature posts!" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const isFeatured = post.isFeatured;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { isFeatured: !isFeatured },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update feature" });
  }
};

export const uploadAuth = async (req, res) => {
  try {
    const { IK_URL_ENDPOINT, IK_PUBLIC_KEY, IK_PRIVATE_KEY } = process.env;
    if (!IK_URL_ENDPOINT || !IK_PUBLIC_KEY || !IK_PRIVATE_KEY) {
      return res.status(503).json({ message: "Image upload is not configured." });
    }
    const imagekit = new ImageKit({
      urlEndpoint: IK_URL_ENDPOINT,
      publicKey: IK_PUBLIC_KEY,
      privateKey: IK_PRIVATE_KEY,
    });
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Upload authentication failed" });
  }
};
