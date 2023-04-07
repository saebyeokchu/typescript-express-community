import * as CommentService from "../services/CommentService.js" 

export default function CommentController(app, router){
    app.post("/addComment", function(req, res){
        const reqBody = req.body; 
        
        console.log(reqBody)
        
        CommentService.addComment(reqBody.contentId,reqBody.newComment).then(function(response){
            res.send(response)
        }) 
    })
}

