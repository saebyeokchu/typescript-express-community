import { Chip } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

import { useHygallContext } from "../context/HygallContext"

type ListBreakPointButtonProps = {
    label : string
    breakPoint : number
}

export function ListBreakPointButton({label, breakPoint} : ListBreakPointButtonProps){
    const [onHover, setOnHover] = useState(false)
    const { listBreakPoint, changeListBreakPoint } = useHygallContext()
    const selected = listBreakPoint === breakPoint

    function setBreakPoint(){
        changeListBreakPoint(breakPoint)
    }

    return(
        <Link to="/" className="no-underline">
            <Chip 
                label={label} 
                sx={{color:'white', backgroundColor:`rgba(255, 255, 255, ${onHover || selected ? ".5" : ""})!important`}}
                variant="outlined"
                onClick={setBreakPoint}  
                onMouseOver={()=>setOnHover(true)}
                onMouseOut={()=>setOnHover(false)}
            />
        </Link>
    )
}