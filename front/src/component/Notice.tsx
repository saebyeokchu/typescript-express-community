import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { Button, CircularProgress, Paper, Typography } from "@mui/material"
import { Constant, Messages } from "../data"

type NoticeProps = {
    errorCode : string,
    reactElement : ReactJSXElement | undefined
}

export const Notice = ({errorCode, reactElement} : NoticeProps) => {
    return (
        <Paper className="center-box" sx={{height:Constant.MiddlePaperSize}}>
            <Typography>{Messages.AlertMessages[errorCode]}</Typography>
            {reactElement}
        </Paper>     
    )
}