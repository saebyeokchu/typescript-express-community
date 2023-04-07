import { Post } from "../model/Post.js"

function addComment(contentId, newComment) {
    return Post.updateOne({contentId : contentId},{$push : {comments : newComment}, $inc : { commentCount : 1}})
}

export {
    addComment
}

