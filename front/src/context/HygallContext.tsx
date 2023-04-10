import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AlertColor } from "@mui/material";

import { Messages, Post, Search } from "../data";
import { AlertMessage, PostDeleteDialog, PostEditDialog, } from "../component";

import HygallRepository from "./HygallRepository";
import { useAlert, usePostEditDialog, usePostDeleteDialog } from "../hook";

type HygallProviderPros = {
    children : ReactNode
}

type uploadResponse = {
    fileName : string
    message : string
}

type HygallContext = { //get, change, set
    getPostList : () => Promise<boolean>
    getPost : (contentId : number) => void
    addPost : (title : string, content : string, unlockCode : string) => Promise<boolean>
    editPost : (title : string, content : string) => Promise<boolean>
    deletePost : () => Promise<boolean | undefined>

    addComment : (commentContnet : string) => Promise<boolean>

    setListBreakPoint : (breakPoint : number) => void
    appendSearchTargetData : (searchTargetData : Search.SearchTargetData) => void
    setSearchKeyword : (keyword : string) => void
    uploadImage : (formData : FormData) => Promise<string | undefined>
    cleanPost : () => void
    cleanPostList : () => void

    openPostEditDialog : () => void
    closePostEditDialog : () => void
    openPostDeleteDialog : () => void
    closePostDeleteDialog : () => void

    mainList : Post.PostList[]
    post : Post.Post
    filteredMainList : Post.PostList[]
    listBreakPoint : number
    searchKeyword : string
    searchTargetData : Search.SearchTargetData[]
}

const HygallContext = createContext({} as HygallContext)

const api = 'http://127.0.0.1:4000';

export function useHygallContext(){
    return useContext(HygallContext)
}

//session, cookie, storgae 여부 나중에 결정
//전부 지금은 state로 관리해도 문제 없을듯
export function HygallProvider ({children} : HygallProviderPros){
    const hygallRepository = new HygallRepository();

    const [mainList,setMainList] = useState<Post.PostList[]>([])
    const [post,setPost] = useState<Post.Post>(new Post.Post(-1,{}))

    const [listBreakPoint, setListBreakPoint] = useState<number>(-1)
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [searchTargetData, setSearchTargetData] = useState<Search.SearchTargetData[]>([])
    const [filteredMainList, setFilteredMainList] = useState<Post.PostList[]>([])
    
    const {alertState, onAlertStateChange, alertMessage, showAlertMessage} = useAlert()
    const [showPostEditDialog, setShowPostEditDialog] = usePostEditDialog()
    const [showPostDeleteDialog, setShowPostDeleteDialog] = usePostDeleteDialog()

    useEffect(() => {
        if(mainList.length > 0) {
            filterMainList()
        }
    },[mainList, searchKeyword, listBreakPoint])

    const getPostList = async () => {
        //refresh 할때만 불러오면 좋겠다
        return await hygallRepository.getPostList().then(response => {
            const success = response.status === 200;

            if(success){
                setMainList(response.data as Post.PostList[]) //다른거 들어올 일 없음)
            }else{
                (onAlertStateChange as Function)(Messages.ErrorCode.Unkwoun)
            }

            return success;
        });
    }

    const getPost = async (contentId : number) => {
        await hygallRepository.getPost(contentId).then(response => {
            if(response.status === 200){
                // console.log("before", post)
                setPost(response.data[0] as Post.Post)
                // console.log("after", post)
            }else{
                (onAlertStateChange as Function)(Messages.ErrorCode.Unkwoun)
            }
        })
       
    }

    const addPost = async (title : string, content : string, unlockCode : string) => {

       if(unlockCode.length < 4){
           onAlertStateChange(Messages.ErrorCode.ShortLockCode)
           return false
       }

       if(!title || !content) {//둘중 하나라도 값이 없으면 리턴
           onAlertStateChange(Messages.ErrorCode.NoAddContent)
           return false
       }

       return await hygallRepository.addPost(new Post.Post(mainList.length,{title, content, unlockCode})).then((res : boolean | number)=>{
           onAlertStateChange(typeof(res) === "number" ? Messages.ErrorCode.Success : Messages.ErrorCode.AddFail)
           return res
       });
   }

   const editPost = async (title : string, content : string) => {

    const alertMsg = onAlertStateChange as Function

   if(!title || !content) {//둘중 하나라도 값이 없으면 리턴
    alertMsg(Messages.ErrorCode.NoAddContent)
       return false
   }

   return await hygallRepository.editPost(post.contentId, title, content).then((res)=>{
    alertMsg(res ? Messages.ErrorCode.Success : Messages.ErrorCode.AddFail)
       return res
   });
}

   const deletePost = async () => {
    if(post.contentId < 1) {
        return;
    }
    
    return await hygallRepository.deletePost(post.contentId).then(response => {
        if(response === undefined){
            return false
        }
        
        if(response){
            (onAlertStateChange as Function)(Messages.ErrorCode.Success)
        }else{
            (onAlertStateChange as Function)(Messages.ErrorCode.DeleteFail)
        }

        return response
    })

   }

    const appendSearchTargetData = (newSearchData : Search.SearchTargetData) => setSearchTargetData([ ... searchTargetData, newSearchData]) 

    //추후 발전방향, 검색버튼을 누르면 그 순간 데이터를 저장 ? 세션같은데?
    const filterMainList = () => { //title 거르기 (일단), 조건은 chip and search keywords
        if(searchKeyword === ""){
            setFilteredMainList(mainList.filter(l => l.viewCount >= listBreakPoint))
        }else{
            setFilteredMainList(mainList.filter(l => l.viewCount >= listBreakPoint && l.title.includes(searchKeyword)))
        }
    }

    //save image to express server
    const uploadImage = async (formData : FormData) => {
        return await hygallRepository.uploadImage(formData).then(response => {
            if(typeof(response) === "object"){
                return `${api}/${(response as uploadResponse).fileName}`
            }
        }).catch(() => {
            onAlertStateChange(Messages.ErrorCode.ImageUploadFail)
            return undefined
        })
    }

    const cleanPost = () => {
        setPost(new Post.Post(-1,{}))
    }

    const cleanPostList = () => {
        setMainList([])
        setFilteredMainList([])
    }

    //unlock code
    const checkUnlockCode = async (inputUnlockCode : string) => {
        const unlockCodeLength = inputUnlockCode.length;
        if(unlockCodeLength < 4 || unlockCodeLength > 6){
            onAlertStateChange(Messages.ErrorCode.ShortLockCode)
            return;
        }

        return await hygallRepository.checkUnlockCode(post.contentId, inputUnlockCode).then(response => {
            if(!response) {
                (onAlertStateChange as Function)(Messages.ErrorCode.UnmatchedUnlockCode)
            }else{
                closePostEditDialog()
            }

            return response
        })

    }

    //comment
    const addComment = async (content : string, unlockCode : string) => {
        const unlockCodeLength = unlockCode.length;
        if(unlockCodeLength < 4 || unlockCodeLength > 6){
            onAlertStateChange(Messages.ErrorCode.ShortLockCode)
            return;
        }

        if(!content) {
            onAlertStateChange(Messages.ErrorCode.NoAddContent)
            return false
        }

        if(post.contentId < 1){
            onAlertStateChange(Messages.ErrorCode.AddFail)
            return false
        }

        const response : boolean =  await hygallRepository.addComment(post.contentId, new Post.Comment({content, unlockCode}))
        
        if(response){
            onAlertStateChange(Messages.ErrorCode.Success)
            getPost(post.contentId)
        }else{
            onAlertStateChange(Messages.ErrorCode.AddFail)
        }

        return response
    }

    const openPostEditDialog = () => (setShowPostEditDialog as React.Dispatch<React.SetStateAction<boolean>>)(true)
    const closePostEditDialog = () => (setShowPostEditDialog as React.Dispatch<React.SetStateAction<boolean>>)(false)
    const openPostDeleteDialog = () => (setShowPostDeleteDialog as React.Dispatch<React.SetStateAction<boolean>>)(true)
    const closePostDeleteDialog = () => (setShowPostDeleteDialog as React.Dispatch<React.SetStateAction<boolean>>)(false)

    return(
        <HygallContext.Provider value={{
            getPostList,
            getPost,
            addPost,
            editPost,
            deletePost,
            addComment,
            setListBreakPoint,
            setSearchKeyword,
            appendSearchTargetData,
            uploadImage,
            cleanPost,
            cleanPostList,
            openPostEditDialog,
            closePostEditDialog,
            openPostDeleteDialog,
            closePostDeleteDialog,
            mainList,
            post,
            filteredMainList,
            listBreakPoint,
            searchKeyword,
            searchTargetData,

        }}>
            {children}
            <AlertMessage 
                show={showAlertMessage as boolean} 
                alertState={alertState as AlertColor} 
                alertMessage={alertMessage as string}/>
            <PostDeleteDialog 
                show={showPostDeleteDialog as boolean}
                handleClose={closePostDeleteDialog}
                checkUnlockCode={checkUnlockCode}
                deletePost={deletePost}
            />
            <PostEditDialog 
                show={showPostEditDialog  as boolean}
                handleClose={closePostEditDialog}
                checkUnlockCode={checkUnlockCode}
                contentId={post? post.contentId : undefined}
            />
        </HygallContext.Provider>
    )
}

