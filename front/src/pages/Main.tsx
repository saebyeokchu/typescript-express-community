import { useEffect } from 'react'

import { Box, Button, CircularProgress, Paper} from '@mui/material'
import { SearchBar, PostList, Loading, Notice } from '../component'
import { useHygallContext } from '../context/HygallContext'
import { Constant, Messages } from '../data'

export function Main(){
    const { getPostList, filteredMainList, cleanPost, cleanPostList } = useHygallContext()

    useEffect(() => { 
        cleanPostList()
        getPostList()
        cleanPost()
    },[]) 

    return (
        <>  
            {/* Important notice */}
            <Box sx={{display:'flex', justifyContent:'space-between', p:2, backgroundColor : '#eeeeee'}}>
                <div>HYGDP는 해외연예갤러리의 대피소입니다.</div>
                <div><a href="/detail/0">공지 확인하기</a></div>
            </Box>
            {
                filteredMainList === undefined || filteredMainList.length === 0 ? 
                <Notice errorCode={Messages.ErrorCode.NoContent} reactElement={undefined} variant={undefined} />  : <PostList />
            }
            <SearchBar/>
        </>
    )
}