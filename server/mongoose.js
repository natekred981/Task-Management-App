import mongoose from "mongoose";
import PostMessage from "./models/postMessage.js";

const CONNECT_URL = 'mongodb+srv://natekred2:043bTdJmD7cpUbqr@cluster0.rjuqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(CONNECT_URL)
.then(() => {
    console.log("Connected to the database")
}).catch(() => {
    console.log("Connection failed!")
});

export const getTasksByUser2 = async (req, res, next) => {
    const products = await PostMessage.find().exec();
    res.json(products);
}

export const createProduct = async (req, res, next) => {
    const createdProduct = new PostMessage({
        title: req.body.title,
        option: req.body.option,
        description: req.body.description,
        creator: req.body.creator
    });

    createdProduct._id.toString();
    const result = await createdProduct.save();
    console.log(createdProduct);
    res.json(result);
}





