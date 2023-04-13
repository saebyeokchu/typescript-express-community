import React, { forwardRef, useRef, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, inputAdornmentClasses, Slide, TextField } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { useNavigate } from "react-router-dom"

type CommentDeleteDialogProps = {
    show : boolean
    handleClose : any
    deleteComment : Function
    commentId : number
}

const Transition = forwardRef(function Transition(props : TransitionProps &
    {
        children : React.ReactElement<any, any>
    }, ref : React.Ref<unknown>){
        return <Slide direction="up" ref={ref} {...props} />
})

export function CommentDeleteDialog({show, handleClose, deleteComment, commentId} : CommentDeleteDialogProps){
    const navigate = useNavigate()
    const pwRef = useRef<any>()
    
    const [requiredError, setRequiredError] = useState<boolean>(false)

    const onDeleteConfirmClicked = async () => {
        if(pwRef.current.value === ""){
            setRequiredError(true)
            return;
        }

        if(await deleteComment(pwRef.current.value)){
            pwRef.current.value = null
        }
    }

    return (
        <Dialog
            fullWidth
            keepMounted
            open={show}
            onClose={handleClose}
            TransitionComponent={Transition}
            maxWidth="sm"
            // onClose={}
        >
            <DialogContent>
                <TextField 
                    required
                    fullWidth
                    error={requiredError}
                    placeholder="삭제하시려면 비밀번호를 입력해주세요(4~6자리)"
                    inputRef={pwRef}
                    onChange={()=>setRequiredError(false)}
                    inputProps={{ maxLength : 6}}
                    type="password"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteConfirmClicked}>삭제</Button>
            </DialogActions>
        </Dialog>
    )
}