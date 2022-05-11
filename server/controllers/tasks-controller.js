import HttpError from "../models/http-error.js";
import bodyParser from "body-parser";
import * as uuid from 'uuid';
import PostMessage from "../models/postMessage.js";
//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere

// export const getPosts = async (req, res) => {
//     try {
//         const postMessage = await PostMessage.find();
//         res.status(200).json(postMessage);
//     }
//     catch (error) {
//         res.status(404).json({message: error.message});
//     }
// }

// export const createPost = async (req, res) => {
//     const post = req.body;
//     const newPost = new PostMessage(post);
    
//     try {
        
//         await newPost.save();
//         res.status(201).json(newPost);
//     }
//     catch (error){
//         res.status(409).json({message: error.message});
//     }
// }

const Dummy_form = [{
    id: uuid.v4(),
    title: 'A',
    option: 'B',
    description: 'C',
    creator: 'D'
}
];
export const getTasksByUser = (req, res, next) => {
    const taskId = req.params.cid;
    const tasks = Dummy_form.filter(c => {
        return c.creator === taskId;
    });
    if (!tasks || tasks.length === 0){
        throw new HttpError("Could not find task for creator: " + taskId, 404);
    }
    res.json({tasks});
};

export const postNewTask = (req, res, next) => {
    const {title, option, description, creator} = req.body;
    const createdTask = {
        title,
        option,
        description,
        creator
    };

    Dummy_form.push(createdTask);
    res.status(201).json(createdTask);

};



