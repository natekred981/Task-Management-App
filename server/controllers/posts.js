import PostMessage from "../models/postMessage.js";

//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    
    try {
        
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error){
        res.status(409).json({message: error.message});
    }
}