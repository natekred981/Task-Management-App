import HttpError from "../models/http-error.js";
import Task from "../models/task.js";
import * as uuid from 'uuid';
import { validationResult } from "express-validator";
import user from "../models/user.js";
import mongoose from "mongoose";

//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere

export const getTasksByUserId = async (req, res, next) => {
    const userId = req.params.gid;
    let userWithTasks;
    try {
        userWithTasks = await user.findById(userId).populate('tasks');
    }
    catch(err){
        const error = new HttpError("No tasks found, please try again", 500);
        return  next(error);
    }
     
    if (!userWithTasks || userWithTasks.length === 0){
        return next(
            new HttpError("Could not find any tasks for the user", 404)
        );
    }
    res.json({tasks: userWithTasks.tasks.map(task => task.toObject({getters: true}))});
};

export const getTaskbyId = async (req, res, next) => {
  const taskId = req.params.taskId;
  let task;
  try {
    task = await Task.findById(taskId);
  }
  catch(err){
    const error = new HttpError(
      'Something went wrong, could not find the task',
      500
    );
    return next(error);
  };

  if (!task) {
    const error = new HttpError(
      'Could not find task for the provided id',
      404
    )
    return next(error);
  }
  res.json({ task: task.toObject({ getters: true})});
};

export const postNewTask = async (req, res, next) => {
    

    const errrors = validationResult(req);
    if (!errrors.isEmpty()){
        const error =  new HttpError('Invalid inputs passed, please check your data', 422);
        return next(error);
    }
    const {title, description } = req.body;
    const createdTask = new Task({
        title,
        description,
        creator: req.userData.userId
    });

    let User;
    try {
        User = await user.findById(req.userData.userId);
    }
    catch (err){
        const error = new HttpError('Not a valid user!', 500);
        return next(error);
    }

    if (!User){
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTask.save({session: sess, validateModifiedOnly: true}); 
        User.tasks.push(createdTask);
        await User.save({session: sess});
        await sess.commitTransaction();       
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
  const taskId = req.params.pid;
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
    const taskId = req.params.did;

  let task;
  try {
    task = await Task.findById(taskId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete task.',
      500
    );
    return next(error);
  }

  if (!task) {
      const error = new HttpError('Could not find place for this id', 404);
      return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await task.remove({session: sess});
    task.creator.tasks.pull(task);
    await task.creator.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not properly remove task.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted task.' });
};



