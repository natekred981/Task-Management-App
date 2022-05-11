import HttpError from "../models/http-error.js";
import bodyParser from "body-parser";
import * as uuid from 'uuid';
import PostMessage from "../models/postMessage.js";
//getPosts is designed to grab from the schema and see if we are successfully grabbing the schema
//createPost is designed to save a post that we create by getting the body of the 
//request we made, and then saving that body to somewhere


const Dummy_form = [{
    id: uuid.v4(),
    title: 'A',
    option: 'B',
    description: 'C',
    creator: 'D'
}
];
export const getTasksByUser = (req, res, next) => {
    const taskId = req.params.cid;
    const tasks = Dummy_form.filter(c => {
        return c.creator === taskId;
    });
    if (!tasks || tasks.length === 0){
        throw new HttpError("Could not find task for creator: " + taskId, 404);
    }
    res.json({tasks});
};

export const postNewTask = async (req, res, next) => {
    const {title, option, description, creator} = req.body;
    const createdTask = new PostMessage({
        title,
        option,
        description,
        creator
    });

    await createdTask.save(createdTask);
    res.status(201).json({message: createdTask});


    // const createdProduct = new PostMessage({
    //     title: req.body.title,
    //     option: req.body.option,
    //     description: req.body.description,
    //     creator: req.body.creator
    // });

    // createdProduct._id.toString();
    // const result = await createdProduct.save();
    // console.log(createdProduct);
    // res.json(result);

};



