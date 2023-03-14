const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let details = new Schema({
    name : {
        type: String
    },
    age : {
        type : Number
    }
});

module.exports = mongoose.model("details", details);