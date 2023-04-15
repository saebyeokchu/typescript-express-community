import { useState } from "react";

export function useCommentDeleteDialog(){
    const [showCommentDeleteDialog, setShowCommentDeleteDialog] = useState<boolean>(false)
    const [targetCommentId, SetTargetCommentId]= useState<number>(-1)

    return { showCommentDeleteDialog, setShowCommentDeleteDialog, targetCommentId, SetTargetCommentId }
}