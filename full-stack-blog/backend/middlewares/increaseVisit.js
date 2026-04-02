import Post from "../models/post.model.js";

const increaseVisit = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (slug) {
      await Post.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });
    }
  } catch {
    // non-blocking
  }
  next();
};

export default increaseVisit;
