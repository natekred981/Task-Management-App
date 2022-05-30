import HttpError from "../models/http-error.js";
import PostMessage from "../models/postMessage.js";
import * as uuid from 'uuid';
import { validationResult } from "express-validator";

//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere
export const getTasksByUserId = async (req, res, next) => {
    const taskId = req.params.uid;
    let tasks;
    try {
        tasks = await PostMessage.find({creator: taskId});
    }
    catch(err){
        const error = new HttpError("No tasks found, please try again", 500);
        return  next(error);
    }
     
    if (!tasks || tasks.length === 0){
        return next(
            new HttpError("Could not find task for creator: " + taskId, 404)
        );
    }
    res.json({tasks: tasks.map(task => task.toObject({getters: true}))});
};

export const getTasks = async (req, res, next) => {
    // const taskId = req.params.cid;
    let tasks;
    try {
        tasks = await PostMessage.find({});
    }
    catch(err){
        const error = new HttpError("No tasks found, please try again", 500);
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
    const errrors = validationResult(req);
    if (!errrors.isEmpty()){
        const error =  new HttpError('Invalid inputs passed, pleae check your data', 422);
        return next(error);
    }
    const {title, description, creator } = req.body;
    const createdTask = new PostMessage({
        id: uuid.v4(),
        title,
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

export const updateTask = async (req, res, next) => {
    const errrors = validationResult(req);
    if (!errrors.isEmpty()){
        const error =  new HttpError('Invalid inputs passed, pleae check your data', 422);
        return next(error);
    }
    const {title, description} = req.body;
    const taskId = req.params.tid;
    try {
        const updateTask = await PostMessage.find(t => t.id === taskId); 
        const taskIndex = await PostMessage.findIndex(t => t.id === taskId) 
        updateTask.title = title;
        updateTask.description = description;
    }
    catch (err) {
        const error = new HttpError("Updating task failed", 404);
        return next(error);
    }
    res.status(201).json({message: updateTask});
};

export const deleteTask = async (req, res, next) => {

};



