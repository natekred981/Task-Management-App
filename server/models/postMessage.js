import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    crestor: String
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;