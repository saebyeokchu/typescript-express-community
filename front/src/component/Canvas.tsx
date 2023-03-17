import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paper, TextField, InputBase, Box, Button } from "@mui/material"

import { Length, Color } from "../data"
import { useHygallContext } from "../context/HygallContext";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function Canvas(){
    const navigate = useNavigate();
    const {addContent} = useHygallContext()
    const titleRef = useRef<string>()
    let contentRef = useRef<any>()
    var toolbarOptions = [ //이미지 핸들러 구현해야함
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['image'],
      ];

    return(
        <>
            <Paper sx={{height:Length.MiddlePaperSize}}>
                <InputBase 
                    fullWidth
                    sx={{ height : '3.5rem', p : 2}}
                    placeholder="제목"
                    inputRef={titleRef}
                />
                <ReactQuill //이미지 첨부
                    theme="snow" 
                    placeholder="본문"
                    modules={{toolbar : toolbarOptions}}
                    ref={contentRef}
                    style={{height : Length.MiddlePaperSize - 100}}/>
            </Paper>
            <Box sx={{display:'flex',p:"0.5rem",gap :"10px", justifyContent:'flex-end',flexDirection:'row',backgroundColor:Color.Code.darkBlue}}>
                {/* 링크 연결 나중에 */}
                <Button variant="contained" onClick={() => navigate(-1)}>목록으로</Button> 
                <Button variant="contained" onClick={() => addContent(titleRef.current.value, contentRef.current.value)}>저장</Button>
            </Box>
        </>
    )
}