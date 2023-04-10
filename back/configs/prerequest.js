import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
// const moment = require("moment/moment.js");
// const { getUnlockCode, checkUnlockCode } = require("./utils/unlockCode.js")

export default function config(){
    const app = express();
    const PORT = 4000;
    const router = express.Router();
    
    app.use(cors());
    
    //file upload
    app.use(fileUpload());
    app.use(express.static('public'));

    //router
    app.use("/",router);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return [app, PORT, router];
}
