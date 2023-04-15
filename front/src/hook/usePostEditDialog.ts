import { useState, useCallback  } from "react";

export function usePostEditDialog(){
    const [showPostEditDialog, setShowPostEditDialog] = useState<boolean>(false)

    const setShowEditDialog = useCallback(() => {
        console.log("useEditDialog onOpenEditDialogChange")
    }, [])

    return [showPostEditDialog, setShowPostEditDialog]
 
}