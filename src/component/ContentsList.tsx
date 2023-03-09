import { Link, useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from '@mui/material'

import { List, Length, Color } from '../data';

export function ContentsList() {
  const navigate = useNavigate();

  //temporaly generated
  const rows = [];
  for(let i = 0;i<50;i++){
    rows.push(List.Template)
  }

  return ( //pagination 하기 (개인컴퓨터에 해놓음)
    <TableContainer sx={{ backgroundColor : "#FFF", height : Length.MiddlePaperSize }}>
      <Table aria-label="main-table">
        <TableHead sx={{ backgroundColor : Color.Color.darkBlue}} >
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center" sx={{color:'white'}}>제목</TableCell>
            <TableCell align="center" sx={{color:'white'}}>조회수</TableCell>
            <TableCell align="center" sx={{color:'white'}}>등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`main-write-${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              // component={Link}
              // to={`detail`}
              className='no-underline to-cursor-pointer'
              onClick={() => navigate("detail")}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.readCount}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}