import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

const Task = mongoose.model('Task', postSchema);

export default Task;