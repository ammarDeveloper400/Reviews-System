/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import {
  Box,
  Select,
  MenuItem,
  TableRow,
  TableCell,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';

import { StyledTableRow, StyledTableCell, StyledTableHeadCell } from './styles';

const GlobalTable = ({ data, columns, isPagination, isLoading }) => {
  const MenuProps = {
    PaperProps: {
      style: {
        background: '#27282B',
        color: 'white',
        boxShadow: 'none',
        borderRadius: '4px',
      },
    },
  };
  return (
    <>
      <TableContainer sx={{ color: '#fff' }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableHeadCell key={column.id}>{column.header}</StyledTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/*  eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <TableRow>
                <TableCell sx={{ textAlign: 'center', borderBottom: 0 }} colSpan={columns?.length}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  sx={{ textAlign: 'center', borderBottom: 0, fontSize: '16px' }}
                  colSpan={columns?.length}
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row, index) => (
                <StyledTableRow key={index}>
                  {columns?.map((column) => (
                    <StyledTableCell key={column.id}>
                      {column.render ? column.render(row, index) : row[column.id]}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && (
        <Box display="flex" justifyContent="end" alignItems="center" mt={5}>
          <Pagination
            variant="outlined"
            count={6}
            // count={Math.ceil(data.length / rowsPerPage)}
            // page={page + 1}
            // onChange={handleChangePage}
            sx={{
              mr: { md: 5, xs: 2 },
              '& .MuiPaginationItem-root': {
                color: 'white',
                fontSize: '15px',
                borderColor: '#2E3033',
                borderRadius: '4px',
                '&.Mui-selected': {
                  backgroundColor: '#2E3033',
                },
              },
            }}
          />
          <Select
            size="small"
            value="10"
            MenuProps={MenuProps}
            // onChange={handleChangeRowsPerPage}
            sx={{
              color: '#929396',
              borderRadius: '4px',
              fontSize: '15px',
              border: '1px solid #2E3033;',
              paddingRight: '10px',
              height: '32px',
            }}
          >
            {[10, 20, 30].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
          <Typography ml={1.5} fontSize={15} color="#929396">
            {/* <Translate>on page</Translate> */}
          </Typography>
        </Box>
      )}
    </>
  );
};

GlobalTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  isPagination: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default GlobalTable;
