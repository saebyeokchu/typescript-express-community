async function getDetail(){
    const detail = await details.find({});
    return detail;
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
app.use(cors());

//connecting to mongodb using mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/details",{
    useNewUrlParser:true
});

const connection = mongoose.connection;
connection.once("open", function(){
    console.log("Connection with MongoDB was successful");
});



let details = require("./model.js");



const router = express.Router();
app.use("/",router);
router.route("/getData").get(function(req, res){
    // res.send("hi")
    // details.find({}, function(err, result){
    //     res.send("hi")
    //     // if(err) {
    //     //     res.render(err);
    //     // }else{
    //     //     res.render(result);
    //     // }
    // })
    getDetail().then(function(items){
        res.send(items)
    })
})

app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});
