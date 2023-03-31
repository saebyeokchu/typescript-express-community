import { Post } from "../model/Post.js"

export default function PostService(){
    const testPostService = () => {
        console.log("Successfully connected to PostService")
    }

    const getPostList = async () => {
        return await Post.find({ contentId : { $gt : 0 }}, {comments : 0, content : 0}).sort({contentId : -1});
    }

    // const getPost = async (contentId) => {
    //     return await Post.find({contentId}, {_id : 0, unlockCode : 0})
    // }

    // const getPostUnlockCode = async (contentId) => {
    //     return await Post.find({contentId},{unlockCode:1})
    // }

    // const addPost = (newContent) => {
    //     return Post.insertMany([newContent]);
    // }

    // const editPost = (contentId, title, content) => {
    //     return Post.updateOne({contentId},{$set : {title, content}})
    // }

    // const deletePost = (contentId) => {
    //     return Post.deleteOne({contentId});
    // }
}
