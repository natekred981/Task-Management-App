import mongoose from "mongoose";
import express  from "express";
import router from "./routes/task-routes.js";
import bodyParser from "body-parser"; 
import HttpError from "./models/http-error.js";
import cors from 'cors';
import signup_router from "./routes/signup-routes.js";

//this file serves the backend, connects the backend to the database, uses cors

const app = express();
app.use(bodyParser.json()); //this parses requests like a post request into json
app.use(cors());

app.use('/api/tasks',router); 
app.use('/api/user', signup_router);
app.use((req, res, next) => {
    throw new HttpError('could not find the route', 404); //this error will go into the error app.use below it
});
app.use((error, req, res, next) => { //function will execute if any middleware gets an error
    if (res.headerSent){ //if a response has been sent
        return next(error); //a little bit confused about these errors
    }
    res.status(error.code || 500) //either 400 or 500 error
    res.json({message: error.message || "An unknown error occured!"});
});


const CONNECT_URL = 'mongodb+srv://natekred2:043bTdJmD7cpUbqr@cluster0.rjuqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(CONNECT_URL)
.then(() => {
    app.listen(4001);
    console.log("Connected to the database");
}).catch(() => {
    console.log("Connection failed!")
});