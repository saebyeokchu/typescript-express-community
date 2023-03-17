async function get(){    
    //view version for main list
    return await contents.find({}, {comments : 0, content : 0}).sort({contentId : -1});
    // db.contents.find({contentId : {$gte : 1, $lt : 3}})
}

function addContent(newContent){
    contents.insertOne(newContent);
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
app.use(cors());

//connecting to mongodb using mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hygall1",{
    useNewUrlParser:true
});

const connection = mongoose.connection;
connection.once("open", function(){
    console.log("Connection with MongoDB was successful");
});

let contents = require("./model.js");

//router
const router = express.Router();
app.use("/",router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.route("/get").get(function(req, res){
    get().then(function(items){
        res.send(items)
    })
})
router.route("/add").post(function(req, res){
    console.log("query => " + req.query)
    console.log(req.body)
    console.log(req.params)
    console.log(req)
})

//post params
router.route("/postReqTest").post(function(req,res){
    console.log(req.body)
    console.log(req.params)

})

//get params
router.route("/test/:tests").get(function(req, res){
    console.log(req.params)
})

app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});
