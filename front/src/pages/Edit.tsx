import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Canvas } from "../component";
import { useHygallContext } from "../context/HygallContext";


export function Edit(){ 
    const navigate = useNavigate()
    const {addPost, uploadImage, post, cleanPost, editPost} = useHygallContext()
    let { contentId } = useParams()

    useEffect(()=>{
        if(post === undefined){ 
            navigate("/")
        }else if(post.contentId < 1 || !contentId){
            navigate("/")
        }
    },[])

    return (
        post &&
            <Canvas 
                mode = "edit"
                post = {post}
                addPost = {addPost}
                uploadImage ={uploadImage}
                cleanPost = {cleanPost}
                editPost = {editPost}
            />
        
    )
}