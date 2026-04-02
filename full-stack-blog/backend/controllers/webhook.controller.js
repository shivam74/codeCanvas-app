import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      return res.status(500).json({ message: "Webhook secret not configured" });
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
      evt = wh.verify(payload, headers);
    } catch {
      return res.status(400).json({ message: "Webhook verification failed" });
    }

    if (evt.type === "user.created") {
      const email = evt.data.email_addresses?.[0]?.email_address;
      const newUser = new User({
        clerkUserId: evt.data.id,
        username: evt.data.username || email || evt.data.id,
        email: email || `${evt.data.id}@users.clerk.local`,
        img: evt.data.profile_image_url || evt.data.image_url,
      });

      try {
        await newUser.save();
      } catch (e) {
        if (e.code !== 11000) throw e;
      }
    }

    if (evt.type === "user.deleted") {
      const deletedUser = await User.findOneAndDelete({
        clerkUserId: evt.data.id,
      });

      if (deletedUser?._id) {
        await Post.deleteMany({ user: deletedUser._id });
        await Comment.deleteMany({ user: deletedUser._id });
      }
    }

    return res.status(200).json({ message: "Webhook received" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Webhook handler failed" });
  }
};
