import { useLog } from "../util/useLog"
import { Chip } from "@mui/material"
import { useState } from "react"
import { useHygallContext } from "../context/HygallContext"
import { Link } from "react-router-dom"

type ChipCProps = {
    label : string
    breakPoint : number
}

export function ChipC({label, breakPoint} : ChipCProps){
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