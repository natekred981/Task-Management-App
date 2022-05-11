import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    option: {type: String, required: true},
    description: {type: String, required: true},
    creator: {type: String, required: true}
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;