import { Post } from "../model/Post.js"


function addComment(contentId, commentBody) {
    return Post.updateOne({contentId : contentId},{$push : {comments : commentBody}})
}