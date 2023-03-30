import { useState } from "react";

export function usePostDeleteDialog(){
    const [showPostDeleteDialog, setShowPostDeleteDialog] = useState<boolean>(false)

    return [showPostDeleteDialog, setShowPostDeleteDialog]
}