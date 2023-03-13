import { useEffect } from 'react'

import {Box} from '@mui/material'
import { SearchBar, ContentsList } from '../component'
import { useHygallContext } from '../context/HygallContext'

export function Main(){
    const { listBreakPoint, getMainList, mainList } = useHygallContext()

    useEffect(() => {
        getMainList()
    },[listBreakPoint])

    return (
        <>
            <ContentsList />
            <SearchBar />
        </>
    )
}