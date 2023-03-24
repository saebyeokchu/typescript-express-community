import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, CircularProgress, Chip} from '@mui/material'

import { List, Length, Color, Write } from '../data';
import { useHygallContext } from '../context/HygallContext';


interface TablePaginationActionsProps {
  count : number
  page : number
  rowsPerPage : number
  onPageChange : (
    event : React.MouseEvent<HTMLButtonElement>,
    newPage : number
  ) => void
}

function TablePaginationActions(props : TablePaginationActionsProps){
  const { count, page, rowsPerPage, onPageChange } = props
  const totalPage = Math.floor( (count % rowsPerPage) && (count % rowsPerPage)  ? count / rowsPerPage + 1 : count / rowsPerPage)

  const handleFirstPageButtonClick = (
    event : React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event : React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page-1)
  }

  const handleNextButtonClick = (event : React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event,page + 1)
  }

  const handleLastPageButtonClick = (event : React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count/rowsPerPage) - 1))
  }

  const handlePaginationClick = (
    event : React.ChangeEvent<HTMLButtonElement>,
    value : number
  ) => { 
    onPageChange(event,value-1)
  }


  return (
    <Box sx={{justifyContent:'center', display:'flex', p:2}}>
      <Pagination onChange={handlePaginationClick} count={totalPage}  siblingCount={2} boundaryCount={0}/>
    </Box>
  )
 
}


export function ContentsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { filteredMainList, searchTargetData, appendSearchTargetData } = useHygallContext()

  if(filteredMainList === undefined) {
    return <span />
  }

  useEffect(() => {
    //search용 데이터 묶음 만들기
    //새로고침하면 새로 생겨야 하니까 state생성
    filteredMainList.map(e => {
      //여러번 반복을 안할 수 있는 방법은 없을까?
      if(searchTargetData.find(e2 => e2.contentId === e.contentId) === undefined){
        appendSearchTargetData({contentId : e.contentId, title : e.title})
      }
    })},[filteredMainList])
  

  //temporaly generated
  const emptyRows = page > 0? Math.max(0, (1+page) *rowsPerPage-filteredMainList.length) : 0;

  const handleChangePage = ( 
    event : React.ChangeEvent<unknown>,
    newPage : number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  // console.log("ContentsList : ", filteredMainList, searchTargetData)

  return (
    <>
    <TableContainer sx={{ backgroundColor : "#FFF" }}>
      <Table aria-label="main-table">
        <TableBody>
          {(
              rowsPerPage > 0 ?
              filteredMainList.slice(page * rowsPerPage, page*rowsPerPage+rowsPerPage) : filteredMainList
            ).map((row, index) => (
                <TableRow
                  key={`main-write-${page * rowsPerPage + index + 1}`}
                  sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                  className="to-cursor-pointer"
                >
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + index + 1 }
                  </TableCell>
                  <TableCell align="center">
                    {row.title}
                    <Chip sx={{ml:1}} label={row.commentCount} size="small"  color="primary"/>
                  </TableCell>
                  <TableCell align="center">{row.viewCount}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                </TableRow>
            ))}
          {
            emptyRows > 0 && (
              <TableRow style={{ height : 53 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>
            )
          }

        </TableBody>

      </Table>
      {filteredMainList.length > 0 ?
        <TablePaginationActions 
          count={filteredMainList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        /> : <span />
      } 
    </TableContainer>


</>
  );
}
