import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;