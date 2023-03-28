import React, { useState } from "react"
import { TransitionProps } from '@mui/material/transitions'
import { Button, Dialog, DialogActions, DialogContent, InputBase, Paper, Slide, TextField } from "@mui/material";
import { Label } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
    props : TransitionProps & {
        children : React.ReactElement<any, any>;
    },
    ref : React.Ref<unknown>
){
    return <Slide direction="up" ref={ref} {...props} />
})

export function PostEditDialog(){
    const [open, setOpen] = useState<boolean>(true)
    
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describeby="alert-dialog-slid-description"
            fullWidth
            maxWidth="sm"
        >
            <DialogContent>
                <TextField
                    required
                    id="outlined-required"
                    label="수정 / 삭제용 비밀번호(4~6자리)"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button >확인</Button>
                <Button>닫기</Button>
            </DialogActions>
        </Dialog>
    )


}