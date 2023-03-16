import { useEffect, useRef } from 'react'

import {Box, CircularProgress, Paper} from '@mui/material'
import { SearchBar, ContentsList } from '../component'
import { useHygallContext } from '../context/HygallContext'
import { Length } from '../data'
import React from 'react'

export function Main(){
    const { listBreakPoint, getMainList, filteredMainList } = useHygallContext()

    useEffect(() => { 
        getMainList()
    },[])

    return (
        <>  
            {filteredMainList === undefined ? 
            <Paper className="center-box" sx={{height:Length.MiddlePaperSize}}>
                <CircularProgress />
            </Paper> 
            :
            <>
                <ContentsList />
                <SearchBar/>
            </>
            }
        </>
    )
}