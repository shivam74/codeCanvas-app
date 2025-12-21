import express from "express"
import connectDB from "./lib/connectDB.js"
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js"
import postRouter from "./routes/post.route.js"

 

const app = express();
app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter);
app.use("/comments",commentRouter);


console.log("changed")

app.listen(3000,()=>{
    connectDB();
    console.log("server is running");
});