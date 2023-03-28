import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Canvas } from "../component";
import { useHygallContext } from "../context/HygallContext";


export function Edit(){
    const navigate = useNavigate()
    const { post, cleanPost } = useHygallContext()
    let { contentId } = useParams()

    console.log(post)

    
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