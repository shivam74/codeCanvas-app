import express from "express";
import { requireAuth } from "@clerk/express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.patch("/feature", requireAuth(), featurePost);

router.get("/", getPosts);
router.post("/", requireAuth(), createPost);
router.get("/:slug", increaseVisit, getPost);
router.delete("/:id", requireAuth(), deletePost);

export default router;
