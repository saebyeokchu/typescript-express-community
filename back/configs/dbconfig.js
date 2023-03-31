export default function dbconfig(){
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost:27017/hygall1",{
        useNewUrlParser:true
    });
    
    const connection = mongoose.connection;
    connection.once("open", function(){
        console.log("Connection with MongoDB was successful");
    });
    
}