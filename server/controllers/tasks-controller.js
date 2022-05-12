import HttpError from "../models/http-error.js";
import bodyParser from "body-parser";
import * as uuid from 'uuid';
import PostMessage from "../models/postMessage.js";
//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere
export const getTasksByUser = async (req, res, next) => {
    const taskId = req.params.cid;
    let tasks;
    try {
        tasks = await PostMessage.find({creator: taskId});
    }
    catch(err){
        const error = new HttpError("Creating task failed, please try again", 500);
        return  next(error);
    }
     
    if (!tasks || tasks.length === 0){
        return next(
            new HttpError("Could not find task for creator: " + taskId, 404)
        );
    }
    res.json({tasks: tasks.map(task => task.toObject({getters: true}))});
};

export const postNewTask = async (req, res, next) => {
    const {title, option, description, creator} = req.body;
    const createdTask = new PostMessage({
        title,
        option,
        description,
        creator
    });
    try {
        await createdTask.save(createdTask);
        
    }
    catch (err){
        const error = new HttpError("Creating task failed, please try again", 500);
        return  next(error);
    }
    
    res.status(201).json({message: createdTask});

};



