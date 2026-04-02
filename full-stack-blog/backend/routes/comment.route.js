import express from "express";
import { requireAuth } from "@clerk/express";
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", requireAuth(), addComment);
router.delete("/:id", requireAuth(), deleteComment);

export default router;
