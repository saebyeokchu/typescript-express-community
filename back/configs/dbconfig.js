import mongoose from 'mongoose';

export default function dbconfig(){
    mongoose.connect("mongodb://localhost:27017/hygdb",{
        useNewUrlParser:true
    });
    
    const connection = mongoose.connection;
    connection.once("open", function(){
        console.log("Connection with MongoDB was successful");
    });
}