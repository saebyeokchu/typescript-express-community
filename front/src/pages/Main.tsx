import { useEffect } from 'react'

import { Box, CircularProgress, Paper} from '@mui/material'
import { SearchBar, PostList, Loading } from '../component'
import { useHygallContext } from '../context/HygallContext'
import { Constant } from '../data'

export function Main(){
    const { getPostList, filteredMainList, cleanPost } = useHygallContext()

    useEffect(() => { 
        getPostList()
        cleanPost()

        
    },[])

    if(filteredMainList === undefined){
        <Loading /> 
    }

    return (
        <>  
            {/* Important notice */}
            <Box sx={{display:'flex', justifyContent:'space-between', p:2, backgroundColor : '#eeeeee'}}>
                <div>HYGDP는 해외연예갤러리의 대피소입니다.</div>
                <div><a href="#">공지 확인하기</a></div>
            </Box>
                {filteredMainList.length == 0 ? <Loading />  : <PostList />}
            <SearchBar/>
        </>
    )
}