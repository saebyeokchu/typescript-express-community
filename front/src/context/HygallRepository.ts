import axios, { Axios, AxiosResponse } from 'axios';
import { Post } from '../data'
import HygallRepositoryInterface from './HygallRepositoryInterface';

const tempApiUrl = 'http://127.0.0.1:4000';

export default class HygallRepository implements HygallRepositoryInterface{

    async getPostList() : Promise<AxiosResponse<any, any>>{
        return await axios.get(`${tempApiUrl}/getPostList`).then(response => {
            return response
        });
    }

    async getPost(contentId : number) : Promise<AxiosResponse<any,any>>{
        return await axios.get(`${tempApiUrl}/getPost/${contentId}`).then(response => {
            return response
        })
    }

    async increasePostViewCount(contentId : number) : Promise<boolean>{
        return await axios.get(`${tempApiUrl}/increasePostViewCount/${contentId}`).then(response => {
            return response.status === 200 
        })
    }

    async addPost(newPost : Post.Post) : Promise<boolean> { //async 필요없음
        return await axios.post(`${tempApiUrl}/addPost`,newPost).then(response => {
            return response.status === 200 ? response.data.contentId : false
        })
    }

    async editPost(contentId : number, title : string, content : string, ) : Promise<boolean> { //async 필요없음
        console.log(contentId, title, content)

        return await axios.post(`${tempApiUrl}/editPost`,{contentId, title, content}).then(response => {
            return response.status === 200
        })
    }

    async deletePost(contentId : number) : Promise<boolean>{
        return await axios.get(`${tempApiUrl}/deletePost/${contentId}`).then(response=> {
            return response.status === 200
        })
    }

    async uploadImage(formData : FormData) : Promise<boolean | object>{
        return await fetch(`${tempApiUrl}/uploadImage`, {method:'POST',body : formData}).then(response => {
            return response.status === 200 ? response.json() : false
        })
    }

    async checkUnlockCode(contentId:number,inputUnlockCode:string) : Promise<boolean>{
        return await axios.post(`${tempApiUrl}/checkUnlockCode`,{contentId, inputUnlockCode}).then(response => {
            return response.status===200 ? response.data : false
        })
    }

    //comment
    async addComment(contentId : number, newComment : Post.Comment) : Promise<boolean> { //async 필요없음
        return await axios.post(`${tempApiUrl}/addComment`,{contentId, newComment}).then(response => {
            return response.status === 200
        })
    }

    async removeComment(contentId : number, commentId : number) : Promise<boolean>{
        return await axios.get(`${tempApiUrl}/removeComment/${contentId}&${commentId}`).then(response=> {
            return response.status === 200
        })
    }

    async checkUnlockCodeForComment(contentId : number, commentId : number, inputUnlockCode : string) : Promise<boolean> {
        return await axios.post(`${tempApiUrl}/checkUnlockCodeForComment`,{contentId, commentId, inputUnlockCode}).then(response => {
            return response.status === 200 ? response.data : false
        })
    }
}