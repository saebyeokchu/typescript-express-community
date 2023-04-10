import { Post } from "../model/Post.js"

const getLastCommentId = async (contentId) => { //need to improved
    return await Post.find({ contentId }, {comments : 1}).sort({"comments.id" : -1}).limit(1)
}

async function addComment(contentId, newComment) {
    const lastCommentIdQuery = await getLastCommentId(contentId);
    const lastCommentId = lastCommentIdQuery[0]['comments'].length === 0 ? 0 : lastCommentIdQuery[0]['comments'][0]['id'] + 1;

    newComment.id = lastCommentId;
    return Post.updateOne({contentId : contentId},{$push : {comments : newComment}, $inc : { commentCount : 1}})
}

export {
    addComment
}

