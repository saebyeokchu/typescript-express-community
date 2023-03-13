import {Box, Button, Paper, InputBase} from '@mui/material'
import { Link } from 'react-router-dom'
import { Color } from '../data'

export function SearchBar(){
    return(
        <Box sx={{display:'flex',p:"0.5rem",gap :"10px", justifyContent:'flex-end',flexDirection:'row',backgroundColor:Color.Code.darkBlue}}>
            <Paper component="form"  sx={{ p: '2px 4px', display: 'flex', width: 250 }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="검색"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Paper>
            <Button variant="contained">검색</Button>
            <Link to="/new" className="no-underline">
                <Button variant="contained">글쓰기</Button>
            </Link>
        </Box>
    )
}