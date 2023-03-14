const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let content = new Schema({
    _id : {
        type: String
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
        commentId : {
            type : String
        },
        content : {
            type : String
        },
        createdAt : {
            type : String
        }
    }
});

module.exports = mongoose.model("details", details);