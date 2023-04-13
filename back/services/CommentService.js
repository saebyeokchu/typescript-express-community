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

const getCommentUnlockCode = async (contentId, commentId) => {
    const getCommentUnlockCode = await Post.find({contentId},{comments : {$elemMatch : {id : commentId}}})

    return getCommentUnlockCode[0]['comments'] === undefined ? -1 : getCommentUnlockCode[0]['comments'][0]['unlockCode']
}

async function add(contentId, newComment) {
    const lastCommentIdQuery = await getLastCommentId(contentId);
    const lastCommentId = lastCommentIdQuery[0]['comments'].length === 0 ? 0 : lastCommentIdQuery[0]['comments'][0]['id'] + 1;

    newComment.id = lastCommentId;
    return Post.updateOne({contentId : contentId},{$push : {comments : newComment}, $inc : { commentCount : 1}})
}

async function remove(contentId, commentId){
    return await Post.updateOne({contentId}, { $pull : { "comments" : { "id" : commentId }} })
}



export {
    getCommentUnlockCode,
    add,
    remove
}

