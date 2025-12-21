import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,//type _id of object
      ref: "User",// id of user collection object
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",// id of Post collection object
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
