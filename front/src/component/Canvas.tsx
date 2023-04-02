import React, { useRef, useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, InputBase, Box, Button } from "@mui/material"

import { Constant } from "../data"
import { useHygallContext } from "../context/HygallContext";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/canvas.scss'
import { Loading } from "./";

type CanvasProps = {
    mode : string | undefined
}
 
//image ref ; https://stackoverflow.com/questions/68997364/how-to-upload-image-inside-react-quill-content
export function Canvas({mode} : CanvasProps){
    const navigate = useNavigate();
    const {addPost, uploadImage, post, cleanPost, editPost} = useHygallContext()

    const titleRef = useRef<any>()
    let contentRef = useRef<any>()
    const pwRef = useRef<any>()

    const postAvailable = post.contentId > 0;

    if(mode===undefined || mode === "") {
        return <Loading />
    }

    const imageHandler = () =>{
        const input = document.createElement('input')
        input.setAttribute('type','file')
        input.setAttribute('accept', 'image/jpg,image/jpeg,image/png')
        input.click()

        input.onchange = async () => {
            const file : File | null = input.files ? input.files[0] : null
            let data = null
            const formData = new FormData()

            const quillObj = contentRef.current.getEditor()
            const range = quillObj.getSelection(true)
            
            if(file){ //if file uploaded
                formData.append('file',file)
                formData.append('resource_type','raw')

                //save image to express server
                await uploadImage(formData).then(response => {
                    if(response){
                        quillObj.editor.insertEmbed(range.index, 'image',response)
                        quillObj.setSelection(range.index + 1)
                    }
                })
            }

        }
    }

    const modules = useMemo(() => {
        return {
            toolbar : {
                container : [ //이미지 핸들러 구현해야함
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['image'],
                ],
                handlers : {
                    image : imageHandler
                }
            }
        }
    },[])

    const save = () => {
        if(!titleRef || !contentRef || !pwRef){
            return;
        }

        if(!(titleRef.current) || !(pwRef.current)){
            return; 
        } 

        //본문 place holder문제있음
        if(mode === "new"){
            addPost(titleRef.current.value , contentRef.current.value, pwRef.current.value).then(res => {
                if(res){
                    navigate(-1)
                }
            })
        }else{
            editPost(titleRef.current.value , contentRef.current.value).then(res => {
                if(res){
                    navigate(`/detail/${post.contentId}`)
                }
            })
        }
    }

    const moveToPostList = () => {
        //post값 초기화
        cleanPost()

        //메인으로 이동
        navigate("/")

        //history 있으면 clear
    }

    useEffect(() => {  
        if(postAvailable){
            const quillObj = contentRef.current.getEditor()
            const range = quillObj.getSelection(true)

            if(titleRef.current){
                titleRef.current.value = post.title
            }

            if(pwRef.current){ 
                pwRef.current.value = "수정중 입니다"  
            }

            if(contentRef.current){ //#9 proper cursor position    
                contentRef.current.value = post.content 
            } 
        }
    },[titleRef, pwRef])        

    return(
        <>
            <Paper sx={{height:Constant.MiddlePaperSize}}>
                <InputBase 
                    fullWidth
                    sx={{ height : '3.5rem', p : 2}}
                    placeholder="제목"
                    inputRef={titleRef}
                />
                <ReactQuill //이미지 첨부
                    theme="snow" 
                    placeholder="본문"
                    modules={modules}
                    ref={contentRef}
                    style={{height : Constant.MiddlePaperSize - 150}}
                    // value={postAvailable? post.content : ""}
                />
                <InputBase //숫자만 accept하기
                        fullWidth
                        sx={{ height : '3.5rem', mt : 5, p : 2}}
                        placeholder="수정 / 삭제용 비밀번호(4~6자리)"
                        inputRef={pwRef}
                        inputProps={{ maxLength : 6}}
                        type={postAvailable ? "text" : "password"}
                        disabled={postAvailable ? true : false}
                /> 
            </Paper>
            <Box sx={{display:'flex',p:"0.5rem",gap :"10px", justifyContent:'flex-end',flexDirection:'row',backgroundColor:Constant.ColorCode.darkBlue}}>
                {/* 링크 연결 나중에 */}
                <Button variant="contained" onClick={moveToPostList}>목록으로</Button> 
                <Button variant="contained" onClick={() => save()}>저장</Button>
            </Box>
        </>
    )
}