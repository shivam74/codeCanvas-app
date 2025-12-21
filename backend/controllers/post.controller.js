import postModel from "../models/post.model.js"


export const getPosts = async (req,res)=>{
    const posts =await postModel.find();
    res.status(200).json(posts);
}

export const getPost= async (req,res)=>{
    const slug = req.params.slug;
    const post =await postModel.findOne({slug:slug});
    res.status(200).json(post);
}

export const createPost= async (req,res)=>{
    try {
        const newPost = await postModel.create(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
    }  
}

export const deletePost= async (req,res)=>{
    try {
        const id = req.params.id;
        const deleted=await postModel.findOneAndDelete(req.params.id);
        if(!deleted)res.status(404).json({message:`Post not found with id - ${id}`});
        res.status(200).json({message:`Post deleted with id - ${id}`});
    } catch (error) {
        console.log(error.message);
    }  
}

