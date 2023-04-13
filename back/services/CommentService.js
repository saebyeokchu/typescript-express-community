import { Post } from "../model/Post.js"

const getLastCommentId = async (contentId) => { //need to improved
    return await Post.find({ contentId }, 
        {
            contentId : 0, 
            title : 0, 
            content : 0, 
            viewCount :0, 
            commentCount : 0, 
            createdCode :0,
            unlockCode : 0, 
            createdAt:0, 
            comments : {$slice : 1}}
        ).sort({"comments.id" : -1});
}

async function addComment(contentId, newComment) {
    const lastCommentIdQuery = await getLastCommentId(contentId);
    const lastCommentId = lastCommentIdQuery[0]['comments'].length === 0 ? 0 : lastCommentIdQuery[0]['comments'][0]['id'] + 1;

    newComment.id = lastCommentId;
    return Post.updateOne({contentId : contentId},{$push : {comments : newComment}, $inc : { commentCount : 1}})
}

async function deleteComment(contentId, commentId){
    const deleteResult = await Post.update({contentId}, { $pull : { "comments" : { "id" : commentId }} })

    console.log(deleteResult)
}

export {
    addComment,
    deleteComment
}

