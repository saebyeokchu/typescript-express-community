import { createContext, ReactNode, useContext, useState } from "react";
import { Write } from "../data";
import HygallRepository from "./HygallRepository";

type HygallProviderPros = {
    children : ReactNode
}

type HygallContext = { //get, change, set
    getMainList : () => void
    changeListBreakPoint : (breakPoint : number) => void

    mainList : Write.MainList[]
    listBreakPoint : number
}

const HygallContext = createContext({} as HygallContext)

export function useHygallContext(){
    return useContext(HygallContext)
}

//session, cookie, storgae 여부 나중에 결정
//전부 지금은 state로 관리해도 문제 없을듯
export function HygallProvider ({children} : HygallProviderPros){
    const hygallRepository = new HygallRepository();
    const [listBreakPoint, setListBreakPoint] = useState(-1)
    const [mainList, setMainList] = useState<Write.MainList[]>([])

    const getMainList = () => {
        const response :Promise<Number | Write.MainList[]> = hygallRepository.getAllMainList();
        response.then((r) => {
            if(typeof r === "number"){
                console.log("no data")
            }else{
                setMainList(r)
            }
        })
    }

    const changeListBreakPoint = (breakPoint : number) => setListBreakPoint(breakPoint)

    return(
        <HygallContext.Provider value={{
            getMainList,
            changeListBreakPoint,
            mainList,
            listBreakPoint
        }}>
            {children}
        </HygallContext.Provider>
    )
}

