import { styled, TableRow, TableCell, tableCellClasses } from '@mui/material';

const commonStyles = {
  '&:first-of-type': {
    borderRadius: '15px 0 0 15px',
    paddingLeft: '20px',
  },
  '&:last-of-type': {
    borderRadius: '0 15px  15px 0',
    borderRight: 'none',
  },
};

export const BaseTableCell = styled(TableCell)(({ theme }) => ({
  ...commonStyles,
  background: '#fff',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  borderBottom: 'none',
}));

export const StyledTableHeadCell = styled(BaseTableCell)({
  fontSize: '14px',
  position: 'relative',
  padding: '10px',
  whiteSpace: 'nowrap',
  background: '#01565A',
  color: '#fff',
  fontWeight: 400,
});

export const StyledTableCell = styled(BaseTableCell)(({ theme }) => ({
  padding: '10px',
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    borderColor: 'transparent',
    fontWeight: 400,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
}));
