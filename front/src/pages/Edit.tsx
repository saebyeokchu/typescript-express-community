import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Canvas } from "../component";
import { useHygallContext } from "../context/HygallContext";
import { useAlert } from "../hook";


export function Edit(){
    const navigate = useNavigate()
    const { getPostList ,post, cleanPost } = useHygallContext()
    let { contentId } = useParams()

    useEffect(()=>{
        if(post === undefined){ 
            navigate("/")
        }else if(post.contentId < 1 || !contentId){
            navigate("/")
        }
    },[])

    return (
        <Canvas 
            mode = "edit"
        />
    )
}