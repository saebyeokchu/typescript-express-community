import React, { useState } from "react";
import { Card,Box, CardContent, Typography, Paper, InputBase, Button, Chip, Avatar, SnackbarContent, Snackbar, Alert, ButtonGroup } from "@mui/material";

import { Constant, Post } from "../data";
import { useHygallContext } from "../context/HygallContext";
import { MiddleBreak } from "./MiddleBreak";

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
    const { post, deletePost } = useHygallContext()
    const [ openDeleteSnackBar, setOpenDeleteSnackBar ] = useState<boolean>(false)

    const onDeleteClicked = () => {
        setOpenDeleteSnackBar(false)
        deletePost()
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
                                    조회수 {post.commentCount} 
                                </Typography>
                            </Box>
                        </div>
                    </Box> 
                    {/* 중간 콘텐츠만 고정값 */}
                    <CardContent sx={{minHeight:'300px'}}>
                        <Box sx={{pt:2, height:'100%'}}>
                            <div dangerouslySetInnerHTML={{__html: post.content}} />
                        </Box>
                        <Box sx={{display:'flex',gap:'10px',justifyContent:'center'}}>
                            <Button variant="contained" color="warning" size="small">좋아요 {post.like}</Button>
                            <Button variant="contained" size="small">수정</Button>
                            <Button variant="contained" onClick={() => setOpenDeleteSnackBar(true)} size="small">삭제</Button>
                        </Box>
                    </CardContent>
                    {/* 댓글 알림창 */}
                    <Box 
                        sx={{
                            backgroundColor:Constant.ColorCode.lightGrey, 
                            p:1}}>
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Box sx={{ gap:'10px', justifyContent: 'flex-end', display: 'flex' }}>
                                <Chip
                                    color="primary"
                                    label={`댓글 ${post.commentCount}`}
                                />
                            </Box>
                            <Box sx={{ display:'flex', flexDirection:'row', gap:'10px'}}>
                                <Paper component="form"  sx={{ width: 500}}>
                                    <InputBase
                                        sx={{ ml: 1 }}
                                        placeholder="댓글(최대 200자)"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Paper>
                                <Button variant="contained">등록</Button>
                            </Box>
                        </Box>
                        
                        {/* <Paper>
                            <InputBase 
                                fullWidth
                                rows={3}
                                placeholder="댓글"
                                sx={{p:2}}/> 
                        </Paper> */}
                    </Box>
                    {/* Action */}
                    <Snackbar 
                        open={openDeleteSnackBar} 
                        autoHideDuration={500} 
                        anchorOrigin={{vertical:'bottom', horizontal:'center'}}
                    >
                        <Alert
                            severity="error"
                            sx={{width:'600px'}}
                            action={
                                <ButtonGroup>
                                    <Button color="inherit" size="small" onClick={onDeleteClicked}>
                                        삭제할께요
                                    </Button>
                                    <Button color="success" size="small" onClick={()=>setOpenDeleteSnackBar(false)}>
                                        안 할래요
                                    </Button>
                                </ButtonGroup>
                              }
                        >
                            <span>삭제하시면 되돌릴 수 없어요!</span>
                        </Alert>
                    </Snackbar>
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