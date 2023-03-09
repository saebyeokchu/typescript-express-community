import { SearchBar } from "./SearchBar"
import { useState } from "react"
import { Paper, TextField, InputBase, Box, Button } from "@mui/material"
import { Color } from "../data/Color"
import { Length } from "../data"

export function CanvasC(){
    return(
        <>
            <Paper sx={{height:Length.MiddlePaperSize}}>
                <InputBase 
                    fullWidth
                    sx={{ height : '3.5rem', p : 2}}
                    placeholder="제목"
                />
                <hr />
                <InputBase 
                    fullWidth
                    multiline
                    rows={Length.MiddlePaperSize/26}
                    sx={{ height : '3.5rem', p : 2 }}
                    placeholder="본문"/> 
            </Paper>
            <Box sx={{display:'flex',p:"0.5rem",gap :"10px", justifyContent:'flex-end',flexDirection:'row',backgroundColor:Color.darkBlue}}>
                <Button variant="contained">저장</Button>
            </Box>
        </>
    )
}