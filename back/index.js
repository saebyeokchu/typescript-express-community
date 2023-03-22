async function get(){    
    //view version for main list
    return await contents.find({}, {comments : 0, content : 0}).sort({contentId : -1});
    // db.contents.find({contentId : {$gte : 1, $lt : 3}})
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
app.use(cors());

//connecting to mongodb using mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hygdb",{
    useNewUrlParser:true
});

const connection = mongoose.connection;
connection.once("open", function(){
    console.log("Connection with MongoDB was successful");
});

let contents = require("./model.js");

const router = express.Router();
app.use("/",router);
router.route("/get").get(function(req, res){
    get().then(function(items){
        res.send(items)
    })
})

app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});
