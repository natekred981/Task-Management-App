import mongoose from "mongoose";
import cors from "cors";
import express  from "express";
import nodemon from "nodemon";
import bodyParser from "body-parser";
import getPosts from "./routes/posts.js";

const app = express();
const router = express.Router();
app.use(cors());
const CONNECT_URL = 'mongodb+srv://natekred2:043bTdJmD7cpUbqr@cluster0.rjuqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(CONNECT_URL);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("connected to MongoDB");
});
app.use('/posts', getPosts);
app.listen(4001, () => {
    console.log("server running");
});
    //.then(() => app.listen(4001, () => console.log(`Server running on port: 4001`)))
    //.catch(error => console.log(error));


 
 
 

// //app.use('/posts',router);
// //app.use(bodyParser.json({limit:"30mb", extended: true}));
// //app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
// //app.use(cors()); 

// const PORT = 4000;

// //app.get('/', function(req, res) {
// //    res.send("Hello");
// //});

// //app.use('/posts',router);
// app.listen(PORT);