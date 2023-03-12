import { createContext, ReactNode, useContext, useState } from "react";

type HygallProviderPros = {
    children : ReactNode
}

type HygallContext = {
    changeListBreakPoint : (breakPoint : number) => void
    listBreakPoint : number
}

const HygallContext = createContext({} as HygallContext)

export function useHygallContext(){
    return useContext(HygallContext)
}

export function HygallProvider ({children} : HygallProviderPros){
    const [listBreakPoint, setListBreakPoint] = useState(-1)

    const changeListBreakPoint = (breakPoint : number) => setListBreakPoint(breakPoint)

    return(
        <HygallContext.Provider value={{
            changeListBreakPoint,
            listBreakPoint
        }}>
            {children}
        </HygallContext.Provider>
    )
}

