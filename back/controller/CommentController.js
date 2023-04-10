import * as CommentService from "../services/CommentService.js" 
import * as Utils from "../utils/unlockCode.js"

export default function CommentController(app, router){
    app.post("/addComment", function(req, res){
        const reqBody = req.body; 
        reqBody.unlockCode = Utils.getUnlockCode(reqBody.unlockCode)
        
        CommentService.addComment(reqBody.contentId,reqBody.newComment).then(function(response){
            res.send(response)
        }) 
    })
}

