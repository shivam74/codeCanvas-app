import express from "express";
import { requireAuth } from "@clerk/express";
import { getUserSavedPosts, savePost, syncUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/saved", requireAuth(), getUserSavedPosts);
router.patch("/save", requireAuth(), savePost);
router.post("/sync-user", requireAuth(), syncUser);

export default router;
