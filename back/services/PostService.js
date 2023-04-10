import { Post } from "../model/Post.js"

const testPostService = () => {
    console.log("Successfully connected to PostService")
}

const getPostLastContentId = async () => {
    return await Post.find({ }, {contentId : 1}).sort({contentId : -1}).limit(1);
}

const getPostList = async () => {
    return await Post.find({ contentId : { $gt : 0 }}, {comments : 0, content : 0}).sort({contentId : -1});
}

const getPost = async (contentId) => {
    return await Post.find({contentId}, {_id : 0, unlockCode : 0})
}

const getPostUnlockCode = async (contentId) => {
    return await Post.find({contentId},{unlockCode:1})
}

const addPost = async (newContent) => {
    const insertResult = await Post.insertMany([newContent]);
    const lastContentId = await getPostLastContentId();
    const targetObjectId = insertResult[0]['_id'].valueOf();

    const updateContentIdResult = await Post.updateOne({"_id" : targetObjectId},{ contentId : lastContentId[0]['contentId'] + 1})

    return updateContentIdResult && insertResult ? lastContentId[0]['contentId'] + 1 : -1
}

const editPost = (contentId, title, content) => {
    return Post.updateOne({contentId},{$set : {title, content}})
}

const deletePost = (contentId) => {
    return Post.deleteOne({contentId});
}

export {
    testPostService,
    getPostList,
    getPost,
    getPostUnlockCode,
    addPost,
    editPost,
    deletePost
}