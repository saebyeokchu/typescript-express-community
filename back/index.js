import prerequest from "../back/configs/prerequest.js"
import dbconfig from "../back/configs/dbconfig.js"

import PostController from "./controller/PostController.js"
import CommentController from "./controller/CommentController.js"

const [app, PORT, router] = prerequest() //connect through express
dbconfig() //connect with database
PostController(app, router)
CommentController(app, router)

//get post list
// router.route("/getPostList").get(function(req, res){
//     PostService.getPostList().then(function(items){
//         res.send(items)
//     })
// })


app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});
