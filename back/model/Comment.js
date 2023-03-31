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

module.exports = mongoose.model("Comment", Comment);
