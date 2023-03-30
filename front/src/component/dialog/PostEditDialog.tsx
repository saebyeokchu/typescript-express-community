import React, { Ref, useRef, useState } from "react"
import { TransitionProps } from '@mui/material/transitions'
import { Button, Dialog, DialogActions, DialogContent, InputBase, Paper, Slide, TextField } from "@mui/material";
import { ConstructionOutlined, Label } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type PostEditDialogProps = {
    show : boolean,
    handleClose : any,
    checkUnlockCode : Function,
    contentId : number
}

const Transition = React.forwardRef(function Transition(
    props : TransitionProps & {
        children : React.ReactElement<any, any>;
    },
    ref : React.Ref<unknown>
){
    return <Slide direction="up" ref={ref} {...props} />
})

export function PostEditDialog({show, handleClose, checkUnlockCode, contentId} : PostEditDialogProps){
    const unlockCodeInputRef = useRef<any>()
    const navigate = useNavigate()

    const onEditConfirmClicked = async() => {
        if(!unlockCodeInputRef.current) return;

        const inputVal = unlockCodeInputRef.current.value;
        const unlockedPassed = await checkUnlockCode(inputVal)

        if(unlockedPassed) navigate(`/edit/${contentId}`)

        unlockCodeInputRef.current.value = null
    }
    
    return (
        <Dialog
            open={show}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogContent>
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="수정 / 삭제용 비밀번호(4~6자리)"
                    type="password"
                    inputRef={unlockCodeInputRef}
                    inputProps={{ maxLength : 6}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onEditConfirmClicked}>확인</Button>
                <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    )


}