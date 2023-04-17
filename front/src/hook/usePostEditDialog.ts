import { useState, useCallback  } from "react";

export function usePostEditDialog(){
    const [showPostEditDialog, setShowPostEditDialog] = useState<boolean>(false)

    return [showPostEditDialog, setShowPostEditDialog]
 
}