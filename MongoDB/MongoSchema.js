// import mongoose from "mongoose";

// const MongoSchema = new mongoose.Schema({
//     name: { type: String },
//     name: { type: String },
//     name: { type: String },
//     name: { type: String },
// })

// const UserModal = mongoose.model('new', MongoSchema)


import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const User = mongoose.model('Post', postSchema);

export default User;
