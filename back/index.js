async function getList(){    
    //view version for main list
    return await contents.find({}, {comments : 0, content : 0}).sort({contentId : -1});
    // db.contents.find({contentId : {$gte : 1, $lt : 3}})
}

async function get(contentId){
    return await contents.find({contentId}, {_id : 0, unlockCode : 0})
}

function addPost(newContent){
    return contents.insertMany([newContent]);
}

const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require("cors");
const makeUnlockCode = require("./makeUnlockCode.js")
const app = express();
const PORT = 4000;

app.use(cors());

//file upload
app.use(fileUpload());
app.use(express.static('public'));

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
const moment = require("moment/moment.js");

//router
const router = express.Router();

app.use("/",router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get post list
router.route("/getList").get(function(req, res){
    getList().then(function(items){
        res.send(items)
    })
})

//get post
router.route("/get/:contentId").get(function(req, res){
    get(req.params.contentId).then(function(item){
        res.send(item)
    });
})

//add new content
app.post("/add", function(req, res){
    const reqBody = req.body;
    reqBody.unlockCode = makeUnlockCode(reqBody.unlockCode)

    console.log(reqBody)
    
    addPost(reqBody).then(function(response){
        res.send(response)
    }) 
})

router.route("/delete/:contentId").get(function(req,res){
    deletePost(req.params.contentId).then(function(item){
        res.send(item)
    });
})


//upload image
app.post("/upload",async function(req, res){
    const { file } = req.files;

    //test if type of image not matched
    if(!/^image/.test(file.mimetype)){
        res.status(400).send('No files were uploaded');
    }

    const fileName = moment().format('YYYYMMDDHHMMSS') + "." + file.mimetype.split('/')[1];

    file.mv(__dirname + '/public/' + fileName, function(err){
        if(err) {
            return res.status(500).send(err)
        }
    });

    res.status(200).send({fileName,meesage : 'File is successfully uploaded'}); //all good
})

app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});
