import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    img : {
        type : String,
    },
    savedPosts : {
        type : [String],
        dafault : []
    }
},
{timestamps : true}
)

export default mongoose.model("User",userSchema);