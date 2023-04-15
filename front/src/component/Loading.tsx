import { CircularProgress, Paper } from "@mui/material"
import { Constant } from "../data"

export const Loading = () => {
    return (
        <Paper className="center-box" sx={{height:Constant.MiddlePaperSize}}>
            <CircularProgress />
        </Paper>     
    )
}