import { useTheme } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Button,
  useScrollTrigger,
  TableFooter,
  TablePagination,
  Pagination,
  Paper
} from '@mui/material'
import { write } from '../data/wirte'; //리스트 모델
import React, { useState } from 'react';
import { useLog } from '../util/useLog';

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

  useLog(count)
  useLog(rowsPerPage)
  const totalPage = Math.floor(count % rowsPerPage ? count / rowsPerPage + 1 : count / rowsPerPage)

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
    <Box sx={{flexShrink:0, ml:2.5}}>
      <Pagination onChange={handlePaginationClick} count={totalPage} />
    </Box>
  )
 
}

export default function TableC() {
  const rows = [];

  for(let i = 0;i<30;i++){
    rows.push({...write, index : i+1})
  }


  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const emptyRows = page > 0? Math.max(0, (1+page) *rowsPerPage-rows.length) : 0;

  const handleChangePage = (
    event : React.MouseEvent<HTMLButtonElement> | null,
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

  const TableHeight = Math.floor((window.innerHeight - 170) / 12)

  return ( //pagination 하기
  <Paper>
    <TableContainer sx={{ backgroundColor : "#F0EDEE", height : window.innerHeight - 170 }}>
      <Table aria-label="main-table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">조회수</TableCell>
            <TableCell align="center">등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (
              rowsPerPage > 0 ?
              rows.slice(page * rowsPerPage, page*rowsPerPage+rowsPerPage) : rows
            ).map((row, index) => (
            <TableRow
              key={`main-write-${row.index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:`${TableHeight}px`}}
            >
              <TableCell component="th" scope="row">
                {row.index}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.readCount}</TableCell>
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
        <TableFooter>
          <TableRow>
          <TablePagination
            rowsPerPageOptions={[]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps : {
                'aria-label' : 'rows per page'
              },
              native : true
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    
  </Paper>
  );
}