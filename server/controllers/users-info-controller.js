import { validationResult } from 'express-validator';
import HttpError from '../models/http-error.js';
import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { secret } from '../secret_file.js';




export const signup = async (req, res, next) => {
    const errrors = validationResult(req);
    if (!errrors.isEmpty()){
        const error =  new HttpError('Invalid inputs passed, please check your data', 422);
        return next(error);
    }
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email })
    }
    catch (err){
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
          );
          return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
          'User already exists',
          422
        );
        return next(error);
      }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err){
        const error = new HttpError(
            'Could not create user, please try again',
            500
        )
    }

    const createdUser = new user({
        name,
        email,
        password: hashedPassword,
        tasks: []
    });

    try {
        await createdUser.save();
    }
    catch (err) {
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email}, 
            secret,
             {expiresIn: '1h'});
    } catch (err){
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error);
    }
    
    res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});

};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await user.findOne({ email: email });
    }
    catch (err) {
        const error = new HttpError('Login failed, try again later', 500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('Could not identify user, credentials seem to be wrong', 401);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Could not log you in, please check your cedentials and try again.',
               500 );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError('Could not identify user, credentials seem to be wrong', 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: existingUser.id, email: existingUser.email}, 
            secret,
             {expiresIn: '1h'});
        
    } catch (err){
        const error = new HttpError('Loggin in failed, please try again', 500);
        return next(error);
    }

    res.json({userId: existingUser.id, email: existingUser.email, token: token});
};