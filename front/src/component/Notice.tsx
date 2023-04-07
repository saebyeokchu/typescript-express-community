import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { Button, CircularProgress, Paper, Typography } from "@mui/material"
import { Constant, Messages } from "../data"


type NoticeProps = {  
    errorCode : string,
    reactElement : ReactJSXElement | undefined,
    variant : string | undefined
}

export const Notice = ({errorCode, reactElement, variant} : NoticeProps) => {
    return (
        <Paper className="center-box" sx={{height: variant === "sx" ? "100px" : Constant.MiddlePaperSize}}>
            <Typography>{Messages.AlertMessages[errorCode]}</Typography>
            {reactElement}
        </Paper>     
    )
}