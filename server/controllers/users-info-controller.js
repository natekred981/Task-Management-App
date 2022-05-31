import { validationResult } from 'express-validator';
import HttpError from '../models/http-error.js';
import user from '../models/user.js';




export const signup = async (req, res, next) => {
    const errrors = validationResult(req);
    if (!errrors.isEmpty()){
        const error =  new HttpError('Invalid inputs passed, pleae check your data', 422);
        return next(error);
    }

    const { name, email, password, tasks } = req.body;

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

    const createdUser = new user({
        name,
        email,
        password,
        tasks
    });

    try {
        await createdUser.save();
    }
    catch (err) {
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(err);
    }

    res.status(201).json({user: createdUser});

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

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError('Could not identify user, credentials seem to be wrong', 401);
        return next(error);
    }

    res.json({message: 'Logged in!'});
};