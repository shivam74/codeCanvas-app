import User from "../models/user.model.js";
import { ensureUserByClerkId } from "../lib/ensureUser.js";

export const syncUser = async (req, res) => {
  const clerkUserId = req.auth?.userId;
  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { username, email, img } = req.body || {};
  if (req.body?.clerkUserId && req.body.clerkUserId !== clerkUserId) {
    return res.status(403).json({ message: "Cannot sync another user" });
  }

  try {
    const user = await ensureUserByClerkId(clerkUserId, { username, email, img });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to sync user" });
  }
};

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedPosts || []);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch saved posts" });
  }
};

export const savePost = async (req, res) => {
  const clerkUserId = req.auth?.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedPosts?.some((p) => p === postId);

    if (!isSaved) {
      await User.findByIdAndUpdate(user._id, {
        $push: { savedPosts: postId },
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: postId },
      });
    }

    res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update saved posts" });
  }
};
