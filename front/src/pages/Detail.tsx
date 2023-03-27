import { useParams } from "react-router-dom";
import { Card,Box, CardContent, Typography, Paper } from "@mui/material";

import { SearchBar,PostList, PostDetail } from "../component";
import { useHygallContext } from "../context/HygallContext";
import { useEffect, useState } from "react";
import { Loading } from "../component/Loading";
import { Post } from "../data";

export function Detail(){
    let { contentId } = useParams()
    const { getPost, post } = useHygallContext()


    if(contentId === undefined){
        return <Loading />
    }

    useEffect(() => { 
        getPost(parseInt(contentId as string))
    },[])


    return(
        <>
            { post.contentId < 1 ? <Loading /> : <PostDetail /> }
            <PostList />
            <SearchBar />
        </>
    )
}