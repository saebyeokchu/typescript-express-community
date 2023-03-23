import { useState, useCallback  } from "react";
import { AlertColor } from "@mui/material";
import { Messages } from "../data";

export function useAlert(){
    const [alertState, setAlertState] = useState<AlertColor>("success")//'success' | 'info' | 'warning' | 'error'
    const [alerterMessage, setAlerterMessage] = useState<string>("")
    const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false)

    const ErrorCode = Messages.ErrorCode;

    const onAlertStateChange = useCallback((e: string) => {
        let color : AlertColor = "success"

        setShowAlertMessage(true)

        switch(e){
            case ErrorCode.Success : {
                color = "success"
                break;
            }
            case ErrorCode.NoAddContent : {
                color = "error"
                break;
            }
            case ErrorCode.ShortLockCode : {
                color = "error"
                break;
            }
            case ErrorCode.ImageUploadFail : {
                color = "error"
                break;
            }
        }

        setAlertState(color)
        setAlerterMessage(Messages.AlertMessages[e])
        window.setTimeout(() => setShowAlertMessage(false), 3000)
    }, [])

    return [ alertState, onAlertStateChange, alerterMessage, showAlertMessage] 
 
}