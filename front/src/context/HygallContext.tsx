import { AlertColor } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Write, Content, Messages } from "../data";
import { useAlert } from "../hook/useAlert";
import { AlertMessage } from "../pages";
import HygallRepository from "./HygallRepository";

type HygallProviderPros = {
    children : ReactNode
}

type SearchTargetData = {
    contentId : number
    title : string
  }

type HygallContext = { //get, change, set
    getMainList : () => void
    setListBreakPoint : (breakPoint : number) => void
    appendSearchTargetData : (searchTargetData : SearchTargetData) => void
    setSearchKeyword : (keyword : string) => void
    addContent : (title : string, content : string) => Promise<boolean>

    mainList : Write.MainList[]
    filteredMainList : Write.MainList[]
    listBreakPoint : number
    searchKeyword : string
    searchTargetData : SearchTargetData[]
}

const HygallContext = createContext({} as HygallContext)

export function useHygallContext(){
    return useContext(HygallContext)
}

//session, cookie, storgae 여부 나중에 결정
//전부 지금은 state로 관리해도 문제 없을듯
export function HygallProvider ({children} : HygallProviderPros){
    const hygallRepository = new HygallRepository();
    const [listBreakPoint, setListBreakPoint] = useState<number>(-1)
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [searchTargetData, setSearchTargetData] = useState<SearchTargetData[]>([])
    const [mainList,setMainList] = useState<Write.MainList[]>([])
    const [filteredMainList, setFilteredMainList] = useState<Write.MainList[]>([])

    const [alertState, onAlertStateChange, alertMessage, showAlertMessage] = useAlert()

    useEffect(() => {
        if(mainList.length > 0) {
            filterMainList()
        }
    },[mainList, searchKeyword, listBreakPoint])

    const getMainList = () => {
        //refresh 할때만 불러오면 좋겠다
        const response :Promise<Number | Write.MainList[]> = hygallRepository.getAllMainList();
        response.then((e) => {
            if(typeof e === "number"){
                console.log("no data")
            }else{
                setMainList( e as Write.MainList[]) //다른거 들어올 일 없음)
            }
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

    async function addContent(title : string | undefined, content : string | undefined){

        console.log("title", title)
        console.log("content", content)
        
        //둘중 하나라도 값이 없으면 리턴
        // block at 0321 for image import
        //  if(typeof(onAlertStateChange) !== "function"){
        //     return false
        //  }

        // if(!title || !content) {
        //     onAlertStateChange(Messages.ErrorCode.NoAddContent)
        //     return false
        // }

        // return await hygallRepository.addContent(new Content.Content(mainList.length,{title : title, content : content})).then((res)=>{
        //     onAlertStateChange(res ? Messages.ErrorCode.Success : Messages.ErrorCode.AddFail)
        //     return res
        // });
    }

    return(
        <HygallContext.Provider value={{
            appendSearchTargetData,
            getMainList,
            setListBreakPoint,
            setSearchKeyword,
            addContent,
            mainList,
            filteredMainList,
            listBreakPoint,
            searchKeyword,
            searchTargetData,

        }}>
            {children}
            <AlertMessage show={showAlertMessage as boolean} alertState={alertState as AlertColor} alertMessage={alertMessage as string}/>
        </HygallContext.Provider>
    )
}

