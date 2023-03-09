import { SearchBar } from "./SearchBar"
import { useState } from "react"
import { Paper, TextField, InputBase, Box, Button } from "@mui/material"
import { Color } from "../data/color"

export function CanvasC(){
    return(
        <>
            <Paper sx={{height:window.innerHeight - 170}}>
                <InputBase 
                    fullWidth
                    sx={{ height : '3.5rem'}}
                    placeholder="제목"/>
                {/* <TextField
                    fullWidth 
                    multiline
                    maxRows={10000}
                    rows={(window.innerHeight - 170)/26}
                /> */}
                <hr />
                <InputBase 
                    fullWidth
                    multiline
                    rows={(window.innerHeight - 170)/26}
                    sx={{ height : '3.5rem' }}
                    placeholder="본문"/> 
            </Paper>
            <Box sx={{display:'flex',p:"0.5rem",gap :"10px", justifyContent:'flex-end',flexDirection:'row',backgroundColor:Color.darkBlue}}>
                <Button variant="contained">저장</Button>
            </Box>
        </>
    )
}