const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Comment = new Schema({
    id : {
        type : Number
    },
    content : {
        type : String
    },
    createdAt : {
        type : String
    }
})

let contents = new Schema({
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
    comments : [Comment]
},{
    collection:'contents',
    versionKey: false //here
});

module.exports = mongoose.model("contents", contents);