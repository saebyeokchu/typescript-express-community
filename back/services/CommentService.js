import { Post } from "../model/Post.js"

const getLastCommentId = async (contentId) => { //need to improved
    return await Post.aggregate([{$match: { contentId }}, {$unwind: "$comments"}, {$sort: {"comments.id": -1}},{$limit: 1},{$group: {"_id": "$comments.id"}}] )
}

const getCommentUnlockCode = async (contentId, commentId) => {
    const getCommentUnlockCode = await Post.find({contentId},{comments : {$elemMatch : {id : commentId}}})

    return getCommentUnlockCode[0]['comments'] === undefined ? -1 : getCommentUnlockCode[0]['comments'][0]['unlockCode']
}

async function add(contentId, newComment) {
    const lastCommentIdQuery = await getLastCommentId(contentId);
    const lastCommentId = lastCommentIdQuery.length > 0 ? lastCommentIdQuery[0]['_id'] + 1 : 0 ;

    newComment.id = lastCommentId;
    return Post.updateOne({contentId : contentId},{$push : {comments : newComment}, $inc : { commentCount : 1}})
}

async function remove(contentId, commentId){
    return await Post.updateOne({contentId}, { $pull : { "comments" : { "id" : commentId }}, $inc : { commentCount : -1} })
}



export {
    getCommentUnlockCode,
    add,
    remove
}

