import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { ensureUserByClerkId } from "../lib/ensureUser.js";

export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username img")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to load comments" });
  }
};

export const addComment = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    const postId = req.params.postId;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const desc = req.body?.desc;
    if (!desc || !String(desc).trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const user = await ensureUserByClerkId(clerkUserId);

    const newComment = new Comment({
      desc: String(desc).trim(),
      user: user._id,
      post: postId,
    });

    const savedComment = await newComment.save();
    await savedComment.populate("user", "username img");

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to add comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    const id = req.params.id;

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
      await Comment.findByIdAndDelete(req.params.id);
      return res.status(200).json("Comment has been deleted");
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedComment = await Comment.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!deletedComment) {
      return res.status(403).json({ message: "You can delete only your comment!" });
    }

    res.status(200).json("Comment deleted");
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete comment" });
  }
};
