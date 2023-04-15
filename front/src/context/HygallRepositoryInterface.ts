import { AxiosResponse } from "axios"
import { Post } from "../data"

export default interface HygallRepositoryInterface {
    // getAllMainList() : Promise<Write.MainList[]>
    getPostList() : Promise<AxiosResponse<any, any>>
    getPost(contentId : number) : Promise<AxiosResponse<any,any>>
    increasePostViewCount(contentId : number) : void
    addPost(newContent : Post.Post) : Promise<boolean>
    deletePost(contentId : number) : Promise<boolean>
    uploadImage(formData : FormData) : Promise<boolean | object>
    checkUnlockCode(contentId:number,inputUnlockCode:string) : Promise<boolean>
    checkUnlockCodeForComment(contentId : number, commentId : number, inputUnlockCode : string) : Promise<boolean>

    //comment
    removeComment(contentId : number, commentId : number) : Promise<boolean>
}