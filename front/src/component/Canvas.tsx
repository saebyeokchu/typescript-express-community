import { Paper, TextField, InputBase, Box, Button } from "@mui/material"

import { Length, Color } from "../data"

export function Canvas(){
    return(
        <>
            <Paper sx={{height:Length.MiddlePaperSize}}>
                <InputBase 
                    fullWidth
                    sx={{ height : '3.5rem', p : 2}}
                    placeholder="제목"
                />
                <hr />
                <InputBase 
                    fullWidth
                    multiline
                    rows={Length.MiddlePaperSize/26}
                    sx={{ height : '3.5rem', p : 2 }}
                    placeholder="본문"/> 
            </Paper>
            <Box sx={{display:'flex',p:"0.5rem",gap :"10px", justifyContent:'flex-end',flexDirection:'row',backgroundColor:Color.Code.darkBlue}}>
                {/* 링크 연결 나중에 */}
                <Button variant="contained">목록으로</Button> 
                <Button variant="contained">저장</Button>
            </Box>
        </>
    )
}