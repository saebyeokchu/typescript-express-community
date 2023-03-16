const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contents = new Schema({
    _id : {
        type: ObjectId
    },
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
    comments : {
        id : {
            type : Number
        },
        content : {
            type : String
        },
        createdAt : {
            type : String
        }
    }
});

module.exports = mongoose.model("contents", contents);