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
        post,
        searchTargetData,
        filteredMainList,

        getPostList,
        getDetailPageData,
        increasePostLikeCount,
        appendSearchTargetData,
        openPostEditDialog, 
        openPostDeleteDialog, 
        openCommentDeleteDialog,
        addComment,
        setSearchKeyword
    } = useHygallContext()
    let postAvailable = false 

    if(contentId === undefined){
        return <Notice errorCode={Messages.ErrorCode.LoadFail} reactElement={<Button variant="contained" onClick={() => navigate("/")}>목록으로</Button>} variant={undefined}/> 
    }

    useEffect(() => { 
        if(filteredMainList === undefined || filteredMainList.length === 0) getPostList()

        if(contentId === undefined) return
        getDetailPageData(parseInt(contentId))
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
                             openCommentDeleteDialog={openCommentDeleteDialog}
                             increasePostLikeCount={increasePostLikeCount}
                        />
                        <PostList 
                            filteredMainList = {filteredMainList}
                            searchTargetData = {searchTargetData}
                            appendSearchTargetData = {appendSearchTargetData} //여기 조회수 업데이트 하려고 다 불러와야 하남 ..
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