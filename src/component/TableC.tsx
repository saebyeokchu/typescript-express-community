import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box} from '@mui/material';
import { write } from '../data/wirte';


export default function TableC() {

  const rows = [];

  for(let i = 0;i<50;i++){
    rows.push(write)
  }

  return ( //pagination 하기
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
          {rows.map((row, index) => (
            <TableRow
              key={`main-write-${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
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