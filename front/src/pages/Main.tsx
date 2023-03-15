import { useEffect } from 'react'

import {Box, CircularProgress, Paper} from '@mui/material'
import { SearchBar, ContentsList } from '../component'
import { useHygallContext } from '../context/HygallContext'
import { Length } from '../data'

export function Main(){
    const { listBreakPoint, getMainList, mainList } = useHygallContext()

    useEffect(() => {
        getMainList()
    },[listBreakPoint])

    return (
        <>  
            {mainList === undefined ? 
            <Paper className="center-box" sx={{height:Length.MiddlePaperSize}}>
                <CircularProgress />
            </Paper> 
            :
            <>
                <ContentsList />
                <SearchBar />
            </>
            }
        </>
    )
}