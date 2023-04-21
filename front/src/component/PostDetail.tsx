import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card,Box, CardContent, Typography, Paper, InputBase, Button, CardActions, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Constant, Messages, Post } from "../data";
import { MiddleBreak } from "./MiddleBreak";  
import { Notice } from "./Notice";

type CommentProps = {
    comment : Post.Comment
    openCommentDeleteDialog : Function
}

type PostDetailProps = {
    post : Post.Post
    openPostEditDialog : Function
    openPostDeleteDialog : Function

    addComment : Function
    openCommentDeleteDialog : Function
    increasePostLikeCount : Function
}

function Comment({comment, openCommentDeleteDialog} : CommentProps){ 
    return( 
        <Card sx={{borderBottom:`1px ${Constant.ColorCode.lightGrey} solid`}}>
            <CardContent>
                <Box sx={{justifyContent:'space-between', alignItems: 'center'}} display="flex">
                    <Box><strong>ㅇㅇ</strong> | {comment.createdAt}</Box>
                    <Box>
                        <IconButton aria-label="add to favorites" onClick={() => openCommentDeleteDialog(comment.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{mt:2,justifyContent:'space-between'}} display="flex">
                    <Box>{comment.content}</Box>
                </Box>
            </CardContent>
            
        </Card>
    )
}

export function PostDetail( { post, openPostEditDialog, openPostDeleteDialog, addComment, openCommentDeleteDialog, increasePostLikeCount } : PostDetailProps){
    const commentRef = useRef<HTMLInputElement>()
    const pwRef = useRef<HTMLInputElement>()

    const handleCommentButtonClicked = async () => {
        if(commentRef && commentRef.current && pwRef && pwRef.current){
            await addComment(commentRef.current.value, pwRef.current.value).then((response : boolean) => {
                if(response){
                    if(!(commentRef && commentRef.current && pwRef && pwRef.current)){
                        return
                    }
                    commentRef.current.value = ""
                    pwRef.current.value = ""
                }
            })
        }
    }
    
    return(  
        <Box> 
            <Card variant="outlined" >
                <React.Fragment>
                    <Box>
                        <div style={{backgroundColor:Constant.ColorCode.lightGrey, padding:'2rem'}}>
                            {/* title */}
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                            {/* extra infos */}
                            <Box sx={{ mt:2, justifyContent: 'space-between', display: 'flex' }}>
                                <Typography color="text.secondary">
                                    ㅇㅇ | {post.createdAt}
                                </Typography>
                                <Typography color="text.secondary">
                                    조회수 {post.viewCount} 
                                </Typography>
                            </Box>
                        </div>
                    </Box> 
                    {/* 중간 콘텐츠만 고정값 */}
                    <CardContent>
                        <Box sx={{position:'relative', minHeight:'300px'}}>
                            <Box sx={{pt:2, width:'100%',pb:20}}> 
                                <div dangerouslySetInnerHTML={{__html: post.content}} />
                            </Box>
                            <Box sx={{
                                position:'absolute',
                                bottom:'2px',
                                display:'flex',
                                justifyContent:'center',
                                width:'100%', 
                                gap:'10px'}}>
                                <Button variant="contained" size="small">댓글 {post.commentCount}</Button>
                                <Button variant="contained" color="warning" size="small" onClick={()=>increasePostLikeCount()}>좋아요 {post.likeCount}</Button>
                                <Button variant="contained" size="small" onClick={()=>openPostEditDialog()}>수정</Button>
                                <Button variant="contained" onClick={()=>openPostDeleteDialog()} size="small">삭제</Button>
                            </Box>
                        </Box>
                    </CardContent> 
                    {/* 댓글 알림창 */}
                    <Box 
                        sx={{
                            backgroundColor:Constant.ColorCode.lightGrey, 
                            p:1
                        }}>
                        <Box sx={{ display:'flex', flexDirection:'column', gap:'10px'}}>
                            <Paper sx={{width:'100%'}} component="form">
                                <InputBase
                                    fullWidth
                                    multiline
                                    rows={5}
                                    sx={{ ml: 1 , p :2 }}
                                    placeholder="댓글(최대 200자)"
                                    inputProps={{  maxLength:200 }}
                                    size="small"
                                    inputRef={commentRef}
                                    autoComplete="off"
                                /> 
                            </Paper>
                            <Paper sx={{width:'100%'}} component="form">
                                <InputBase //숫자만 accept하기
                                    fullWidth
                                    sx={{ height : '3.5rem', p : 2}}
                                    placeholder="삭제용 비밀번호(4~6자리)"
                                    inputRef={pwRef}
                                    inputProps={{ maxLength : 6}}
                                    type="password"
                                    autoComplete="off"
                                /> 
                            </Paper>
                            <Button variant="contained" onClick={handleCommentButtonClicked}>등록</Button>
                        </Box>
                    </Box>
                    {/* 댓글 (5줄?) */}
                    <Box>
                        {post && post.commentCount > 0 ? post.comments.map( (e, index) => {
                            return <Comment key={`post-detail-comment-${index}`} comment={e} openCommentDeleteDialog={openCommentDeleteDialog}/>
                        })  : <Notice errorCode={Messages.ErrorCode.NoComment} reactElement={undefined} variant="sx" />}
                    </Box>
                    <MiddleBreak />
                </React.Fragment>
            </Card>
        </Box>
    )
}