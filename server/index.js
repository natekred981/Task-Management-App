import mongoose from "mongoose";
import express  from "express";
import router from "./routes/task-routes.js";
import bodyParser from "body-parser"; 
import HttpError from "./models/http-error.js";
import cors from 'cors';
import signup_router from "./routes/signup-routes.js";
import dotenv from 'dotenv';
dotenv.config();

//this file serves the backend, connects the backend to the database, uses cors

const app = express();
app.use(bodyParser.json()); //this parses requests like a post request into json
 // enable cors to the server
//  const corsOpt = {
//     origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
//     allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
// };
// app.use(cors(corsOpt)); // cors for all the routes of the application
// app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work
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

const CONNECT_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rjuqp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(CONNECT_URL)
.then(() => {
    app.listen(4001);
    console.log("Connected to the database");
}).catch(() => {
    console.log("Connection failed!")
});