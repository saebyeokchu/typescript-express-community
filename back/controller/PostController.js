import * as Utils from "../utils/unlockCode.js"
import * as PostService from "../services/PostService.js" 
import moment from 'moment'
import path from 'path';
const __dirname = path.resolve();

export default function PostController(app, router){
    router.route("/getPostList").get(function(req, res){
        PostService.getPostList().then(function(items){
            res.send(items)
        })
    })

    
//get post
router.route("/getPost/:contentId").get(function(req, res){
    PostService.getPost(req.params.contentId).then(function(item){
        res.send(item)
    });
})


//add new content
app.post("/addPost", function(req, res){
    const reqBody = req.body;
    reqBody.unlockCode = Utils.getUnlockCode(reqBody.unlockCode)
    
    PostService.addPost(reqBody).then(function(contentId){
        res.status(200).send({contentId}); //all good
    }) 
})

//edit content
app.post("/editPost", function(req, res){
    const reqBody = req.body;
    
    PostService.editPost(reqBody.contentId, reqBody.title, reqBody.content).then(function(response){
        res.send(response)
    }) 
})

router.route("/deletePost/:contentId").get(function(req,res){
    PostService.deletePost(req.params.contentId).then(function(item){
        res.send(item)
    });
})


//upload image
app.post("/uploadImage",async function(req, res){
    const { file } = req.files;

    //test if type of image not matched
    if(!/^image/.test(file.mimetype)){
        res.status(400).send('No files were uploaded');
    } 

    const fileName = moment().format('YYYYMMDDHHMMSS') + "." + file.mimetype.split('/')[1];

    file.mv(__dirname + '/public/' + fileName, function(err){
        if(err) {
            return res.status(500).send(err)
        }
    });

    res.status(200).send({fileName,meesage : 'File is successfully uploaded'}); //all good
})

//unlock code
app.post("/checkUnlockCode", async function(req, res){
    const reqBody = req.body;
    
    const targetPost = await PostService.getPostUnlockCode(reqBody.contentId);
    const checkResult = Utils.checkUnlockCode(reqBody.inputUnlockCode, targetPost[0].unlockCode);

    res.send(checkResult)
})
}

