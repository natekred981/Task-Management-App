import mongoose from "mongoose";
//const { uniqueValidator } = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    tasks: { type: String, required: true },
});


const user = mongoose.model('User', userSchema);

export default user; 
