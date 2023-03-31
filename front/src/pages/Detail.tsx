import { Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { SearchBar,PostList, PostDetail, Notice } from "../component";
import { useHygallContext } from "../context/HygallContext";
import { Messages } from "../data";

export function Detail(){
    let { contentId } = useParams()
    const { getPost, post } = useHygallContext()

    useEffect(() => { 
        getPost(parseInt(contentId as string))
    },[contentId]) 

    return(
        <>
            { 
                contentId === undefined || post === undefined  || post.contentId < 0 ? 
                    <Notice errorCode={Messages.ErrorCode.LoadFail} reactElement={<Button variant="contained">목록으로</Button>}/> 
                        : 
                    <PostDetail /> 
            }
            <PostList />
            <SearchBar />
        </>
    )
}