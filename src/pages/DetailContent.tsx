import { Card,Box, CardContent, Typography, Paper } from "@mui/material";
import React from "react";
import {write} from '../data/wirte'
import {content} from '../data/content'
import TableC from "../component/TableC";
import { SearchBar } from "../component/SearchBar";
import { Color } from "../data/color";

export function DetailContent(){
    return(
        <>
            <Box>
                <Card variant="outlined" >
                    <React.Fragment>
                        <Box>
                            <div style={{backgroundColor:'#EAEAEA', padding:'2rem'}}>
                                {/* title */}
                                <Typography variant="h5" component="div">
                                    {content.title}
                                </Typography>
                                {/* extra infos */}
                                <Box sx={{ mt:2, justifyContent: 'space-between', display: 'flex' }}>
                                    <Typography color="text.secondary">
                                        ㅇㅇ | {content.createdAt}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        조회수 {content.visitCount} 
                                    </Typography>
                                </Box>
                            </div>
                        </Box> 
                        <CardContent sx={{minHeight:'300px'}}>
                            <Box sx={{pt:2, height:'100%'}}>
                                <Typography>
                                    {content.content}
                                </Typography>
                            </Box>
                        </CardContent>
                        <div style={{backgroundColor:'#EAEAEA', paddingLeft:'2rem', paddingRight:'2rem', paddingTop:'1rem', paddingBottom:'1rem'}}>
                            <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                                <Typography color="text.secondary">
                                댓글 {content.readCount}
                                </Typography>
                            </Box>
                        </div>
                        <div>
                            {content.comments.map( e => {
                                return(
                                    <Card sx={{borderBottom:'1px #EAEAEA solid'}}>
                                        <CardContent>
                                            <Box>
                                                <strong>ㅇㅇ</strong> | {e.createdAt}
                                            </Box>
                                            <Box sx={{mt:1}}>
                                                {e.content}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </React.Fragment>
                </Card>
            </Box>
            <div style={{backgroundColor:Color.darkBlue, padding:'2rem'}}></div>
            <TableC />
            <SearchBar />
        </>
    )
}