import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SearchBar,PostList, PostDetail, Notice, PostDeleteDialog } from "../component";
import { useHygallContext } from "../context/HygallContext";
import { Messages } from "../data";

export function Detail(){
    const navigate = useNavigate()
    let { contentId } = useParams()
    const { getPost, post } = useHygallContext()
    let postAvailable = false

    useEffect(() => { 
        if(typeof(getPost) === "function"){
            getPost(parseInt(contentId as string))
        } 
    },[contentId]) 

    useEffect(() => {
        if(post){
            postAvailable = post.title !== "" && post.content !== ""
        }
    },[post])

    // console.log(post)

    // if(typeof(post.isEmpty) === "function"){
    //     console.log(post.title)
    //     console.log(post.content)
    //     console.log(post.isEmpty())
    //     postAvailable = !post.isEmpty()
    // }


    return(
        <>
            { 
                post ?
                    post.content !== "" && post.title !=="" && <>
                        <PostDetail />
                        <PostList />
                    </>
                        : 
                    <Notice errorCode={Messages.ErrorCode.LoadFail} reactElement={<Button variant="contained" onClick={() => navigate("/")}>목록으로</Button>} variant={undefined}/> 
            }
            <SearchBar />
        </>
    )
}