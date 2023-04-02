import * as Utils from "../utils/unlockCode.js"
import * as CommentService from "../services/CommentService" 
import moment from 'moment'
import path from 'path';
const __dirname = path.resolve();

export default function CommentController(app, router){
    app.post("/addComment", function(req, res){
        const reqBody = req.body;
        reqBody.commentBody.unlockCode = Utils.getUnlockCode(reqBody.commentBody.unlockCode)
        
        CommentService.addComment(reqBody.contentId,reqBody.commentBody).then(function(response){
            res.send(response)
        }) 
    })
}

