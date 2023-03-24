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
                {/* Important notice */}
                <Box sx={{display:'flex', justifyContent:'space-between', p:2, backgroundColor : '#eeeeee'}}>
                    <div>HYGDP는 해외연예갤러리의 대피소입니다.</div>
                    <div><a href="#">공지 확인하기</a></div>
                </Box>
                <ContentsList />
                <SearchBar/>
            </>
            }
        </>
    )
}