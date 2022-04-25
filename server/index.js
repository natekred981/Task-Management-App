import mongoose from "mongoose";
import cors from "cors";
import express  from "express";
import router from "./routes/posts.js";
 

//this file serves the backend, connects the backend to the database, uses cors

const app = express();

app.use(cors()); //allows you to make requests from one website to another website in the browser

const CONNECT_URL = 'mongodb+srv://natekred2:043bTdJmD7cpUbqr@cluster0.rjuqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(CONNECT_URL);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connected to MongoDB");
});

app.use('/posts', router); 
app.listen(4001, () => {
    console.log("server running");
});
