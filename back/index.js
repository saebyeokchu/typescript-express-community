import prerequest from "../back/configs/prerequest.js"
import dbconfig from "../back/configs/dbconfig.js"
import PostService from "./services/PostService.js" 

const [app, PORT, router] = prerequest()

const ps = PostService();
ps()


// //get post list
// router.route("/getPostList").get(function(req, res){
//     postAction().getPostList().then(function(items){
//         res.send(items)
//     })
// })

// //get post
// router.route("/getPost/:contentId").get(function(req, res){
//     post.getPost(req.params.contentId).then(function(item){
//         res.send(item)
//     });
// })


// //add new content
// app.post("/addPost", function(req, res){
//     const reqBody = req.body;
//     reqBody.unlockCode = getUnlockCode(reqBody.unlockCode)
    
//     post.addPost(reqBody).then(function(response){
//         res.send(response)
//     }) 
// })

// //edit content
// app.post("/editPost", function(req, res){
//     const reqBody = req.body;
    
//     post.editPost(reqBody.contentId, reqBody.title, reqBody.content).then(function(response){
//         res.send(response)
//     }) 
// })

// router.route("/deletePost/:contentId").get(function(req,res){
//     post.deletePost(req.params.contentId).then(function(item){
//         res.send(item)
//     });
// })


// //upload image
// app.post("/uploadImage",async function(req, res){
//     const { file } = req.files;

//     //test if type of image not matched
//     if(!/^image/.test(file.mimetype)){
//         res.status(400).send('No files were uploaded');
//     } 

//     const fileName = moment().format('YYYYMMDDHHMMSS') + "." + file.mimetype.split('/')[1];

//     file.mv(__dirname + '/public/' + fileName, function(err){
//         if(err) {
//             return res.status(500).send(err)
//         }
//     });

//     res.status(200).send({fileName,meesage : 'File is successfully uploaded'}); //all good
// })

// //unlock code
// app.post("/checkUnlockCode", async function(req, res){
//     const reqBody = req.body;
    
//     const targetPost = await getPostUnlockCode(reqBody.contentId);
//     const checkResult = checkUnlockCode(reqBody.inputUnlockCode, targetPost[0].unlockCode);

//     res.send(checkResult)
// })

app.listen(PORT, function() {
    console.log("Server is running on Port : " + PORT);
});
