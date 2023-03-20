import { Box, Alert, AlertColor } from "@mui/material"

type AlertMessageProps = {
    show : boolean
    alertState : AlertColor
    alertMessage : string
}

export const AlertMessage = ({show, alertState, alertMessage} : AlertMessageProps) => {
    return (
        <>
        { show &&
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Alert severity={alertState} sx={{ width: '60%', position: 'absolute', bottom: '2rem' }}>{alertMessage}</Alert>
            </Box>
        }
        </>
    )
}