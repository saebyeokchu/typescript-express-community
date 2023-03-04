import { SearchBar } from "../component/SearchBar"
import { useState } from "react"
import { useLog } from "../util/useLog"
import { Paper, TextField, Input } from "@mui/material"

export function Canvas(){
    return(
        <>
            <Paper sx={{height:window.innerHeight - 170}}>
                <TextField
                    fullWidth 
                    multiline
                    maxRows={10000}
                    rows={(window.innerHeight - 170)/24}
                />
            </Paper>
            <SearchBar />
        </>
    )
}