import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { ListBreakPointButton } from '../component'
import { Color } from '../data'

export function NavBar(){
    return(
        <Box sx={{justifyContent:'flex-start', backgroundColor:Color.Code.darkBlue}}>
            <Box sx={{textAlign:'right',pt:'1rem',pr:'1rem',pb:'0.5rem'}}>
                <Link to="/" className='no-underline'>
                    <Typography variant="h5" component="h5" className="tw">
                        {/* 해연갤 대피소 */}
                        MES SCHEDUELR
                    </Typography >
                </Link>
            </Box> 
            <Box
                sx={{
                    display:'flex',
                    flexWrap : 'wrap',
                    gap : '0.5rem',
                    pl : '0.5rem',
                    pb : '0.5rem'
                }}
                className='tw'
            >
                <ListBreakPointButton label="전체글" breakPoint={-1} />
                <ListBreakPointButton label="50" breakPoint={50}/>
                <ListBreakPointButton label="100" breakPoint={100} />
                <ListBreakPointButton label="200" breakPoint={200}/>
            </Box>
        </Box>
    )
}