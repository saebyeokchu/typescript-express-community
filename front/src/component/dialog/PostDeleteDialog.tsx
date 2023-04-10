import React, { forwardRef, useRef, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, inputAdornmentClasses, Slide, TextField } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { useNavigate } from "react-router-dom"

type PostDeleteDialogProps = {
    show : boolean
    handleClose : any
    checkUnlockCode : Function
    deletePost : Function
}

const Transition = forwardRef(function Transition(props : TransitionProps &
    {
        children : React.ReactElement<any, any>
    }, ref : React.Ref<unknown>){
        return <Slide direction="up" ref={ref} {...props} />
})

export function PostDeleteDialog({show, handleClose, checkUnlockCode, deletePost} : PostDeleteDialogProps){
    const navigate = useNavigate()
    const pwRef = useRef<any>()
    
    const [requiredError, setRequiredError] = useState<boolean>(false)

    const onDeleteConfirmClicked = async () => {
        if(pwRef.current.value === ""){
            setRequiredError(true)
            return;
        }

        const unlockedPassed = await checkUnlockCode(pwRef.current.value)

        if(unlockedPassed){
            if(await deletePost()){
                console.log("successfuly deleted")
                navigate("/")
                handleClose()
            }
        }

        pwRef.current.value = null
    
        
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
                    helperText="삭제하시면 다시는 이 글을 되돌릴 수 없어요"
                />
                {/* <p className="tg no-underline">
                    <a href="#">
                        <small>대신 작별기능을 사용하시는건 어때요?</small>
                    </a>
                </p> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteConfirmClicked}>네 삭제할께요</Button>
                <Button onClick={handleClose}>그냥 간직할래요!</Button>
            </DialogActions>
        </Dialog>
    )
}