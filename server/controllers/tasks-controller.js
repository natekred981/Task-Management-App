import HttpError from "../models/http-error.js";
import Task from "../models/task.js";
import * as uuid from 'uuid';
import { validationResult } from "express-validator";

//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere

export const getTaskByTaskId = async (req, res, next) => {
    const taskId = req.params.cid;
    let tasks;
    try {
        tasks = await Task.find({});
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
    const createdTask = new Task({
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description } = req.body;
  const taskId = req.params.tid;
  console.log(taskId);

  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update task.',
      500
    );
    return next(error);
  }

  task.title = title;
  task.description = description;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not save updated task.',
      500
    );
    return next(error);
  }

  res.status(200).json({ task: task.toObject({ getters: true }) });
};

export const deleteTask = async (req, res, next) => {
    const taskId = req.params.tid;

  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete task.',
      500
    );
    return next(error);
  }

  try {
    await task.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not properly remove task.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted task.' });
};



