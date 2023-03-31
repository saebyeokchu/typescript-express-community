import mongoose, { Schema } from "mongoose";
// import Comment from "./Comment";

const postSchema = new Schema({
    // _id : {
    //     type: ObjectId
    // },
    contentId : {
        type : Number
    },
    title : {
        type : String
    },
    content : {
        type : String
    },
    viewCount : {
        type : Number
    },
    commentCount : {
        type : Number
    },
    createdAt : {
        type : String
    },
    unlockCode : {
        type : String
    },
    // comments : [Comment]
},{
    collection:'contents',
    versionKey: false //here
});

export const Post = mongoose.model("post", postSchema);
