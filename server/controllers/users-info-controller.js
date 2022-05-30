import * as uuid from 'uuid';
import HttpError from '../models/http-error.js';
import PostMessage from '../models/postMessage.js';


export const signup = (req, res, next) => {
    const errrors = validationResult(req);
    if (!errrors.isEmpty()){
        const error =  new HttpError('Invalid inputs passed, pleae check your data', 422);
        return next(error);
    }

    const { name, email, password } = req.body;

    const createdUser = {
        id: uuid.v4(),
        name,
        email,
        password
    }

    res.status(201).json({user: createdUser});

};

export const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifier = PostMessage.find(u => u.email === email);

    if (!identifier || identifier.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
    }

    res.json({message: 'Logged in!'});
};