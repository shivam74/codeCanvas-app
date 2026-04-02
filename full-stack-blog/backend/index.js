import "dotenv/config";
import express from "express";
import connectDB from "./lib/connectDB.js";
import { validateEnv } from "./lib/validateEnv.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

validateEnv();

const app = express();

if (process.env.CLIENT_URL) {
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
} else {
  app.use(cors());
}

app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

app.listen(3000, () => {
  connectDB();
});
