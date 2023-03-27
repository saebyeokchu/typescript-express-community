import { useEffect } from 'react'

import { Box, CircularProgress, Paper} from '@mui/material'
import { SearchBar, PostList } from '../component'
import { useHygallContext } from '../context/HygallContext'
import { Constant } from '../data'
import { Loading } from '../component/Loading'

export function Main(){
    const { getPostList, filteredMainList } = useHygallContext()

    useEffect(() => { 
        getPostList()
    },[])

    return (
        <>  
            {filteredMainList === undefined ? 
            <Loading />
            :
            <>  
                {/* Important notice */}
                {/* <Box sx={{display:'flex', justifyContent:'space-between', p:2, backgroundColor : '#eeeeee'}}>
                    <div>HYGDP는 해외연예갤러리의 대피소입니다.</div>
                    <div><a href="#">공지 확인하기</a></div>
                </Box> */}
                <PostList />
                <SearchBar/>
            </>
            }
        </>
    )
}