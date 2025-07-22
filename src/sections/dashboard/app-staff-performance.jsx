/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { fShortenNumber } from 'src/utils/format-number';
import {
  Chip,
  Table,
  Select,
  Avatar,
  Button,
  MenuItem,
  TableRow,
  Skeleton,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material';

import { getOrdinalSuffix } from 'src/utils/functions';

import { useGetDashboardStaffPerformanceQuery } from 'src/services/dashboard-stats';

import SelectCustomIcon from 'src/components/select-custom-icon/icon';

// ----------------------------------------------------------------------

const MenuProps = {
  PaperProps: {
    style: {
      background: '#E1F296',
      color: '#000',
      boxShadow: 'none',
      borderRadius: '10px',
      fontSize: '10px',
    },
  },
};

export default function AppStaffPerformance({ storeId }) {
  const [filterValue, setFilterValue] = useState('weekly');

  const { data, isLoading } = useGetDashboardStaffPerformanceQuery({
    storeId,
    filterType: filterValue,
  });

  return (
    <Card
      sx={{
        p: '20px',
        borderRadius: '10px',
        color: '#000',
        height: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1.4}
        flexWrap="wrap"
        justifyContent="space-between"
        mb={0.5}
      >
        <Typography fontWeight={500} fontSize={16}>
        League Table Snapshot
        </Typography>
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <Typography fontWeight={500} fontSize={10}>
            {/* Calculate current week's Monday or last week's Monday */}
            {filterValue === 'weekly'
              ? dayjs().day() === 0 // If it's Sunday, go back to the previous Monday
                ? dayjs().subtract(6, 'day').format('dddd DD MMM')
                : dayjs().day(1).format('dddd DD MMM') // Otherwise, go to the current Monday
              : dayjs().subtract(1, 'week').day(1).format('dddd DD MMM')}{' '}
            {/* Last week's Monday */}
          </Typography>
          <Select
            id="sorting"
            type="text"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            name="sorting"
            MenuProps={MenuProps}
            IconComponent={SelectCustomIcon}
            sx={{
              color: '#000',
              height: '30px',
              fontSize: '10px',
              borderRadius: '30px',
              background: '#E1F296',
              '& .MuiSelect-icon': {
                top: '8px',
                right: '8px',
              },
              '& fieldset': {
                borderWidth: 0,
              },
            }}
          >
            <MenuItem sx={{ fontSize: '10px' }} value="weekly">
              This week
            </MenuItem>
            <MenuItem sx={{ fontSize: '10px' }} value="lastWeek">
              Last Week
            </MenuItem>
          </Select>
        </Box>
      </Box>
      {/* <Box display="flex" justifyContent="space-between" gap={1} mb={1.4}>
        <Box minWidth={{ xs: 180, sm: 260 }} />
        <Typography fontSize={10} fontWeight={500}>
          Score this week
        </Typography>
        <Typography fontSize={10} fontWeight={500}>
          Rating this week
        </Typography>
      </Box>
      <Stack
        gap={1.5}
        maxHeight={220}
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1.5}
          bgcolor="#EFF7F9"
          borderRadius="10px"
          p="8px 32px 8px 12px"
        >
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
            <Typography fontSize={{ xs: 10, sm: 14 }} mr={1} minWidth={{ xs: 'auto', sm: 28 }}>
              1st
            </Typography>
            <Avatar
              src="/assets/images/avatars/avatar_25.jpg"
              alt="Alexander Miller"
              sx={{
                width: '46px !important',
                height: '46px !important',
              }}
            >
              {'Alexander Miller'.charAt(0).toUpperCase()}
            </Avatar>
            <Typography fontSize={{ xs: 10, sm: 13 }}>Alexander Miller</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: '#fff', borderRadius: '6px' }}>
            <Typography fontSize={16}>4.8</Typography>
          </Box>
          <Typography fontSize={14}>15</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1.5}
          bgcolor="#EFF7F9"
          borderRadius="10px"
          p="8px 32px 8px 12px"
        >
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
            <Typography fontSize={{ xs: 10, sm: 14 }} mr={1} minWidth={{ xs: 'auto', sm: 28 }}>
              2nd
            </Typography>
            <Avatar
              src="/assets/images/avatars/avatar_25.jpg"
              alt="Alexander Miller"
              sx={{
                width: '46px !important',
                height: '46px !important',
              }}
            >
              {'Alexander Miller'.charAt(0).toUpperCase()}
            </Avatar>
            <Typography fontSize={{ xs: 10, sm: 13 }}>Alexander Miller</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: '#fff', borderRadius: '6px' }}>
            <Typography fontSize={16}>4.8</Typography>
          </Box>
          <Typography fontSize={14}>15</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1.5}
          bgcolor="#EFF7F9"
          borderRadius="10px"
          p="8px 32px 8px 12px"
        >
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
            <Typography fontSize={{ xs: 10, sm: 14 }} mr={1} minWidth={{ xs: 'auto', sm: 28 }}>
              1st
            </Typography>
            <Avatar
              src="/assets/images/avatars/avatar_25.jpg"
              alt="Alexander Miller"
              sx={{
                width: '46px !important',
                height: '46px !important',
              }}
            >
              {'Alexander Miller'.charAt(0).toUpperCase()}
            </Avatar>
            <Typography fontSize={{ xs: 10, sm: 13 }}>Alexander Miller</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: '#fff', borderRadius: '6px' }}>
            <Typography fontSize={16}>4.8</Typography>
          </Box>
          <Typography fontSize={14}>15</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1.5}
          bgcolor="#EFF7F9"
          borderRadius="10px"
          p="8px 32px 8px 12px"
        >
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
            <Typography fontSize={{ xs: 10, sm: 14 }} mr={1} minWidth={{ xs: 'auto', sm: 28 }}>
              3rd
            </Typography>
            <Avatar
              src="/assets/images/avatars/avatar_25.jpg"
              alt="Alexander Miller"
              sx={{
                width: '46px !important',
                height: '46px !important',
              }}
            >
              {'Alexander Miller'.charAt(0).toUpperCase()}
            </Avatar>
            <Typography fontSize={{ xs: 10, sm: 13 }}>Alexander Miller</Typography>
          </Box>
          <Box sx={{ p: 1, bgcolor: '#fff', borderRadius: '6px' }}>
            <Typography fontSize={16}>4.8</Typography>
          </Box>
          <Typography fontSize={14}>15</Typography>
        </Box>
      </Stack> */}
      <TableContainer
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          maxHeight: 240,
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
        }}
      >
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow sx={{ position: 'sticky', top: 0, minHeight: 30 }}>
              <TableCell
                sx={{
                  minWidth: 150,
                  bgcolor: '#fff',
                  whiteSpace: 'nowrap',
                  borderBottom: 0,
                  py: 0,
                }}
              />
              <TableCell
                align="center"
                sx={{ bgcolor: '#fff', whiteSpace: 'nowrap', borderBottom: 0, py: 0 }}
              >
                <Typography fontSize={10} color="#000" fontWeight={500}>
                  Score
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ bgcolor: '#fff', whiteSpace: 'nowrap', borderBottom: 0, py: 0, pr: 0 }}
              >
                <Typography fontSize={10} color="#000" fontWeight={500}>
                Number of Ratings
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: data?.staffPerformance?.length > 3 ? '195px' : 'auto' }}>
            {isLoading ? (
              <>
                {[1, 2, 3].map((item) => (
                  <TableRow key={item}>
                    <TableCell colSpan={12} sx={{ borderBottom: 0, p: 0 }}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        sx={{ borderRadius: 1 }}
                        height={60}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : data?.staffPerformance?.length > 0 ? (
              data?.staffPerformance?.map((row, index) => (
                <TableRow key={index} sx={{ bgcolor: '#EFF7F9' }}>
                  <TableCell
                    sx={{
                      p: '7px 10px',
                      borderRadius: '10px 0 0 10px',
                      borderBottom: 0,
                      height: 60,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }}>
                      <Typography
                        fontSize={{ xs: 10, sm: 14 }}
                        mr={1}
                        minWidth={{ xs: 'auto', sm: 28 }}
                      >
                        {getOrdinalSuffix(index + 1)}
                      </Typography>
                      <Avatar
                        src={row?.staff?.image}
                        alt={row?.staff?.name}
                        sx={{
                          width: '46px !important',
                          height: '46px !important',
                        }}
                      >
                        {row?.staff?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography fontSize={{ xs: 10, sm: 13 }}>{row?.staff?.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center" width={190} sx={{ p: '7px 10px' }}>
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: '#fff',
                        width: 42,
                        borderRadius: '6px',
                        mx: 'auto',
                        borderBottom: 0,
                      }}
                    >
                      <Typography fontSize={16}>{row?.averageRating?.toFixed(1)}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    width={90}
                    sx={{ p: '7px 10px', pr: 4, borderRadius: '0 10px 10px 0' }}
                  >
                    <Typography fontSize={14}>{row?.totalRatings}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ minHeight: 195 }}>
                <TableCell
                  colSpan={12}
                  sx={{ borderBottom: 0, p: 0, textAlign: 'center', height: 190 }}
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        flexWrap="wrap"
        mt={2}
        gap={{ xs: 1, md: 5 }}
        position="absolute"
        right={20}
        bottom={20}
      >
        <Chip
          sx={{ bgcolor: '#E1F296', height: '31px', '& .MuiChip-label': { pr: 0.5 } }}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={10}>Average Score </Typography>
              <Box
                fontSize={10}
                bgcolor="#fff"
                textAlign="center"
                borderRadius={20}
                width={22}
                height={22}
                p={0.5}
              >
                {data?.OverallAvgRating ? Number(data?.OverallAvgRating)?.toFixed(1) : '-'}
              </Box>
            </Box>
          }
        />
        <Chip
          sx={{ bgcolor: '#E1F296', height: '31px', '& .MuiChip-label': { pr: 0.5 } }}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={10}>Total Ratings</Typography>
              <Box
                fontSize={10}
                bgcolor="#fff"
                textAlign="center"
                borderRadius={20}
                width={22}
                height={22}
                p={0.5}
              >
                {data?.TotalRatings ?? '-'}
              </Box>
            </Box>
          }
        />
      </Box>
      <Box
        position={{ md: 'absolute', xs: 'relative' }}
        mt={3}
        mb={{ xs: 2, md: 0 }}
        left={{ md: 20, xs: 0 }}
        bottom={20}
      >
        <Button
          component={Link}
          to="/customers-feedback"
          sx={{ fontSize: 12, width: { xs: '80px', md: '118px' }, borderRadius: '40px' }}
          variant="contained"
          color="primary"
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

AppStaffPerformance.propTypes = {
  storeId: PropTypes.string,
};
