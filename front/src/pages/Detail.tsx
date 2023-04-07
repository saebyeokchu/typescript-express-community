import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SearchBar,PostList, PostDetail, Notice, PostDeleteDialog } from "../component";
import { useHygallContext } from "../context/HygallContext";
import { Messages } from "../data";

export function Detail(){
    const navigate = useNavigate()
    let { contentId } = useParams()
    const { 
        getPost, 
        post,
        searchTargetData,
        filteredMainList,
        appendSearchTargetData,
        openPostEditDialog, 
        openPostDeleteDialog, 
        addComment,
        setSearchKeyword
    } = useHygallContext()
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

    return(
        <>
            { 
                post ?
                    post.content !== "" && post.title !=="" && <>
                        <PostDetail 
                             post={post} 
                             openPostEditDialog={openPostEditDialog} 
                             openPostDeleteDialog={openPostDeleteDialog} 
                             addComment={addComment}
                        />
                        <PostList 
                            filteredMainList = {filteredMainList}
                            searchTargetData = {searchTargetData}
                            appendSearchTargetData = {appendSearchTargetData}
                        />
                    </>
                        : 
                    <Notice errorCode={Messages.ErrorCode.LoadFail} reactElement={<Button variant="contained" onClick={() => navigate("/")}>목록으로</Button>} variant={undefined}/> 
            }
            <SearchBar 
                setSearchKeyword = {setSearchKeyword}
            />
        </>
    )
}