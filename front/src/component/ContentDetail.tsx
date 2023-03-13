import React from "react";
import { Card,Box, CardContent, Typography, Paper, InputBase, Button } from "@mui/material";

import { Color, Content } from "../data";

type CommentProps = {
    content : string,
    createdAt : string
}

function Comment({content, createdAt} : CommentProps){
    return(
        <Card sx={{borderBottom:`1px ${Color.Code.lightGrey} solid`}}>
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

export function ContentDetail(){
    return(
        <Box>
            <Card variant="outlined" >
                <React.Fragment>
                    <Box>
                        <div style={{backgroundColor:Color.Code.lightGrey, padding:'2rem'}}>
                            {/* title */}
                            <Typography variant="h5" component="div">
                                {Content.Template.title}
                            </Typography>
                            {/* extra infos */}
                            <Box sx={{ mt:2, justifyContent: 'space-between', display: 'flex' }}>
                                <Typography color="text.secondary">
                                    ㅇㅇ | {Content.Template.createdAt}
                                </Typography>
                                <Typography color="text.secondary">
                                    조회수 {Content.Template.visitCount} 
                                </Typography>
                            </Box>
                        </div>
                    </Box> 
                    {/* 중간 콘텐츠만 고정값 */}
                    <CardContent sx={{minHeight:'300px'}}>
                        <Box sx={{pt:2, height:'100%'}}>
                            <Typography>
                                {Content.Template.content}
                            </Typography>
                        </Box>
                    </CardContent>
                    {/* 댓글 알림창 */}
                    <div style={{backgroundColor:Color.Code.lightGrey, paddingLeft:'2rem', paddingRight:'2rem', paddingTop:'1rem', paddingBottom:'1rem'}}>
                        <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Typography color="text.secondary">
                                댓글 {Content.Template.readCount}
                            </Typography>
                        </Box>
                    </div>
                    {/* 댓글 (5줄?) */}
                    <Paper>
                        <InputBase 
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="댓글"
                            sx={{p:2}}/> 
                        <button className="tw to-cursor-pointer" style={{width:'100%',height:'2rem',backgroundColor:Color.Code.darkBlue}}>등록</button>
                    </Paper>
                    <div>
                        {Content.Template.comments.map( e => {
                            return <Comment content={e.content} createdAt={e.createdAt}/>
                        })}
                    </div>
                </React.Fragment>
            </Card>
        </Box>
    )
}