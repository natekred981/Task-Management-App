import mongoose from "mongoose";
import express  from "express";
import router from "./routes/task-routes.js";
import bodyParser from "body-parser"; 
import HttpError from "./models/http-error.js";
import cors from 'cors';

//this file serves the backend, connects the backend to the database, uses cors

const app = express();
app.use(bodyParser.json()); //this parses requests like a post request into json
//app.use(cors()); //allows you to make requests from one website to another website in the browser

// const CONNECT_URL = 'mongodb+srv://natekred2:043bTdJmD7cpUbqr@cluster0.rjuqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(CONNECT_URL);
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("connected to MongoDB");
// });
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Orign', '*');
//     res.setHeader('Access-Control-Allow-Orign', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Orign', 'GET, POST, PATCH, DELETE');
//     next();
// })
app.use('/api/tasks',router); 
app.use((req, res, next) => {
    throw new HttpError('could not find the route', 404);
});
app.use((error, req, res, next) => { //function will execute if any middleware gets an error
    if (res.headerSent){ //if a response has been sent
        return next(error);
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