import * as CommentService from "../services/CommentService.js" 
import * as Utils from "../utils/unlockCode.js"

export default function CommentController(app, router){
    app.post("/addComment", function(req, res){
        const reqBody = req.body; 
        reqBody.unlockCode = Utils.getUnlockCode(reqBody.unlockCode)
        
        CommentService.add(reqBody.contentId,reqBody.newComment).then(function(response){
            res.send(response)
        }) 
    })

    router.route("/removeComment/:contentId&:commentId").get(function(req,res){
        CommentService.remove(req.params.contentId, req.params.commentId).then(function(item){
            res.send(item)
        });
    })

    //unlock code
    app.post("/checkUnlockCodeForComment", async function(req, res){
        const reqBody = req.body;
        const targetUnlockCode = await CommentService.getCommentUnlockCode(reqBody.contentId, reqBody.commentId);

        if(targetUnlockCode === -1){
            res.status(500).send(false)
        }else{
            res.status(200).send(reqBody.inputUnlockCode === targetUnlockCode ? true : false)
        }
    })
}

