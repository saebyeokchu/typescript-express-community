import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card,Box, CardContent, Typography, Paper, InputBase, Button, Chip, Snackbar, Alert, ButtonGroup } from "@mui/material";

import { Constant, Post } from "../data";
import { useHygallContext } from "../context/HygallContext";
import { MiddleBreak } from "./";

type CommentProps = {
    content : string,
    createdAt : string
}

function Comment({content, createdAt} : CommentProps){
    return(
        <Card sx={{borderBottom:`1px ${Constant.ColorCode.lightGrey} solid`}}>
            <CardContent>
                <Box>
                    <strong>ㅇㅇ</strong> | {createdAt}
                </Box>
                <Box sx={{mt:1}}>
                    {content}
                </Box>
            </CardContent>
        </Card>
    )
}

export function PostDetail(){
    const { post, openPostEditDialog, openPostDeleteDialog } = useHygallContext()

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
                                    조회수 {post.commentCount} 
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
                                <Button variant="contained" color="warning" size="small">좋아요 {post.like}</Button>
                                <Button variant="contained" size="small" onClick={openPostEditDialog}>수정</Button>
                                <Button variant="contained" onClick={openPostDeleteDialog} size="small">삭제</Button>
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
                                    maxRows="5"
                                    sx={{ ml: 1 , p :2 }}
                                    placeholder="댓글(최대 200자)"
                                    inputProps={{  maxLength:200 }}
                                    size="small"
                                />
                            </Paper>
                            <Button variant="contained">등록</Button>
                        </Box>
                    </Box>
                    
                    {/* 댓글 (5줄?) */}
                    <div>
                        {Post.PostTemplate.comments.map( (e, index) => {
                            return <Comment key={`post-detail-comment-${index}`} content={e.content} createdAt={e.createdAt}/>
                        })}
                    </div>
                    <MiddleBreak />
                </React.Fragment>
            </Card>
        </Box>
    )
}