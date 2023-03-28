import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AlertColor } from "@mui/material";

import { Messages, Post } from "../data";
import { AlertMessage, PostDeleteDialog, PostEditDialog, } from "../component";

import { useAlert } from "../hook/useAlert";
import HygallRepository from "./HygallRepository";

type HygallProviderPros = {
    children : ReactNode
}

type SearchTargetData = {
    contentId : number
    title : string
}

type uploadResponse = {
    fileName : string
    message : string
}


type HygallContext = { //get, change, set
    getPostList : () => void
    getPost : (contentId : number) => void
    addPost : (title : string, content : string, unlockCode : string) => Promise<boolean>
    deletePost : () => Promise<boolean | undefined>

    setListBreakPoint : (breakPoint : number) => void
    appendSearchTargetData : (searchTargetData : SearchTargetData) => void
    setSearchKeyword : (keyword : string) => void
    uploadImage : (formData : FormData) => Promise<string | undefined>
    cleanPost : () => void

    mainList : Post.PostList[]
    post : Post.Post
    filteredMainList : Post.PostList[]
    listBreakPoint : number
    searchKeyword : string
    searchTargetData : SearchTargetData[]
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
    const [searchTargetData, setSearchTargetData] = useState<SearchTargetData[]>([])
    const [filteredMainList, setFilteredMainList] = useState<Post.PostList[]>([])

    const [alertState, onAlertStateChange, alertMessage, showAlertMessage] = useAlert()

    useEffect(() => {
        if(mainList.length > 0) {
            filterMainList()
        }
    },[mainList, searchKeyword, listBreakPoint])

    const getPostList = async () => {
        //refresh 할때만 불러오면 좋겠다
        await hygallRepository.getPostList().then(response => {
            if(response.status === 200){
                setMainList(response.data as Post.PostList[]) //다른거 들어올 일 없음)
            }else{
                onAlertStateChange(Messages.ErrorCode.Unkwoun)
            }
        });
    }

    const getPost = async (contentId : number) => {

        await hygallRepository.getPost(contentId).then(response => {
            if(response.status === 200){
                // console.log("before", post)
                setPost(response.data[0] as Post.Post)
                // console.log("after", post)
            }else{
                onAlertStateChange(Messages.ErrorCode.Unkwoun)
            }
        })
    }

    const addPost = async (title : string, content : string, unlockCode : string) => {

        if(typeof(onAlertStateChange) !== "function"){ 
           return false
        }

       if(unlockCode.length < 4){
           onAlertStateChange(Messages.ErrorCode.ShortLockCode)
           return false
       }

       if(!title || !content) {//둘중 하나라도 값이 없으면 리턴
           onAlertStateChange(Messages.ErrorCode.NoAddContent)
           return false
       }

       return await hygallRepository.addPost(new Post.Post(mainList.length,{title, content, unlockCode})).then((res)=>{
           onAlertStateChange(res ? Messages.ErrorCode.Success : Messages.ErrorCode.AddFail)
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
            onAlertStateChange(Messages.ErrorCode.Success)
        }else{
            onAlertStateChange(Messages.ErrorCode.DeleteFail)
        }

        return response
    })

   }

    const appendSearchTargetData = (newSearchData : SearchTargetData) => setSearchTargetData([ ... searchTargetData, newSearchData]) 

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
        }).catch(() => onAlertStateChange(Messages.ErrorCode.ImageUploadFail))
    }

    const cleanPost = () => {
        setPost(new Post.Post(-1,{}))
    }

    return(
        <HygallContext.Provider value={{
            getPostList,
            getPost,
            addPost,
            deletePost,
            setListBreakPoint,
            setSearchKeyword,
            appendSearchTargetData,
            uploadImage,
            cleanPost,
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
            <PostDeleteDialog />
            <PostEditDialog />
        </HygallContext.Provider>
    )
}

