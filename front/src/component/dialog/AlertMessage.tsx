import { Box, Alert, AlertColor, Snackbar } from "@mui/material"

type AlertMessageProps = {
    show :  boolean
    alertState : AlertColor
    alertMessage : string
}

export const AlertMessage = ({show, alertState, alertMessage} : AlertMessageProps) => {
    return (
        <Snackbar 
            open={show} 
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
        >
            <Alert severity={alertState}>{alertMessage}</Alert>
        </Snackbar>
    )
}