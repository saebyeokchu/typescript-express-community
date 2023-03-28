import { useState, useCallback  } from "react";
import { AlertColor } from "@mui/material";

export function useAlert(){
    const [alertState, setAlertState] = useState<AlertColor>("success")//'success' | 'info' | 'warning' | 'error'
    const [alerterMessage, setAlerterMessage] = useState<string>("")
    const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false)

    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)

    const onOpenEditDialogChange = useCallback(() => {

    }, [])

    return [openEditDialog]
 
}