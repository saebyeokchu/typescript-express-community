import { styled, Box, Typography, Button, Chip, Paper   } from '@mui/material'
import { ChipC } from '../component/ChipC'
import { Color } from '../data/color'
import { useLog } from '../util/useLog'

export function NavBar(){
    return(
        <Box sx={{justifyContent:'flex-start', backgroundColor:Color.darkBlue}}>
            <Box sx={{textAlign:'right',pt:'1rem',pr:'1rem',pb:'0.5rem'}}>
                <Typography variant="h5" component="h5" className="tw">
                    해연갤 대피소
                </Typography >
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
                <ChipC label="전체글" breakPoint={-1} />
                <ChipC label="50" breakPoint={50}/>
                <ChipC label="100" breakPoint={100} />
                <ChipC label="200" breakPoint={200}/>
            </Box>
        </Box>
    )
}