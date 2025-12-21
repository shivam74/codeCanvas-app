import { Router } from "express";
import Posts from "../models/post.model.js";
import {createPost, deletePost, getPost,getPosts} from "../controllers/post.controller.js";

const router=Router();

router.get("/",getPosts);
router.get("/:slug",getPost);
router.post("/",createPost);
router.delete("/:id",deletePost);

export default router;