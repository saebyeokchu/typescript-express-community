import { useNavigate, useParams } from "react-router-dom";
import { Card,Box, CardContent, Typography, Paper } from "@mui/material";

import { SearchBar,PostList, PostDetail } from "../component";
import { useHygallContext } from "../context/HygallContext";
import { useEffect, useState } from "react";
import { Loading } from "../component/Loading";
import { Post } from "../data";

export function Detail(){
    const navigate = useNavigate()
    let { contentId } = useParams()
    const { getPost, post } = useHygallContext()

    if(contentId === undefined){
        return <Loading />
    }

    if(post === undefined || post === null){
        navigate("/")
        console.log("here")
        return <span />
    }

    console.log(post)
    console.log( post === null , post === undefined  )


    useEffect(() => { 
        getPost(parseInt(contentId as string))
    },[contentId])

    return(
        <>
            { post.contentId < 0 ? <Loading /> : <PostDetail /> }
            <PostList />
            <SearchBar />
        </>
    )
}