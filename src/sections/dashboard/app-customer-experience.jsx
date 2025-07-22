/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
// import { fShortenNumber } from 'src/utils/format-number';
import {
  Table,
  Avatar,
  Button,
  TableRow,
  Skeleton,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { useGetDashboardCustomerExperienceQuery } from 'src/services/dashboard-stats';

// ----------------------------------------------------------------------

export default function AppCustomerExperience({ storeId }) {
  const { data, isLoading } = useGetDashboardCustomerExperienceQuery({
    storeId,
  });
  return (
    <Card
      sx={{
        p: '20px',
        borderRadius: '10px',
        color: '#000',
        height: 1,
        minHeight: 300,
      }}
    >
      <Box display="flex" alignItems="center" gap={1.4} flexWrap="wrap" mb={0.5}>
        <Typography fontWeight={500} fontSize={16}>
          Customer Experience
        </Typography>
        <Typography fontWeight={500} fontSize={10}>
          {dayjs().day() === 0 // If it's Sunday, go back to the previous Monday
            ? dayjs().subtract(6, 'day').format('dddd DD MMM')
            : dayjs().day(1).format('dddd DD MMM')}
        </Typography>
      </Box>
      {/* <Box display="flex" justifyContent="space-between" gap={1} mb={1.4}>
        <Box minWidth={{ xs: 150, sm: 150 }} />
        <Typography fontSize={10} fontWeight={500}>
          Score this week
        </Typography>
        <Typography fontSize={10} fontWeight={500}>
          Rating this week
        </Typography>
      </Box>
      <Stack
        gap={1.5}
        maxHeight={195}
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
            <Avatar
              src="/assets/images/sitting.png"
              alt="Alexander Miller"
              sx={{
                width: '46px !important',
                height: '46px !important',
              }}
            >
              {'Alexander Miller'.charAt(0).toUpperCase()}
            </Avatar>
            <Typography fontSize={{ xs: 10, sm: 13 }}>Sitting</Typography>
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
          maxHeight: 260,
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
                  Score this week
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ bgcolor: '#fff', whiteSpace: 'nowrap', borderBottom: 0, py: 0, pr: 0 }}
              >
                <Typography fontSize={10} color="#000" fontWeight={500}>
                  Rating this week
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: data?.data?.length > 3 ? '195px' : 'auto' }}>
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
            ) : data?.data?.length > 0 ? (
              data?.data?.map((row, index) => (
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
                      <Avatar
                        src={row?.image}
                        alt={row?.name}
                        sx={{
                          width: '46px !important',
                          height: '46px !important',
                        }}
                      >
                        {row?.staff?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography fontSize={{ xs: 10, sm: 13 }}>{row?.name}</Typography>
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
                    width={190}
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
          {/* <TableBody sx={{ maxHeight: '195px' }}>
            <TableRow sx={{ bgcolor: '#EFF7F9' }}>
              <TableCell sx={{ p: '7px 10px', borderRadius: '10px 0 0 10px', borderBottom: 0 }}>
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
                  <Avatar
                    src="/assets/images/sitting.png"
                    alt="Alexander Miller"
                    sx={{
                      width: '46px !important',
                      height: '46px !important',
                    }}
                  >
                    {'Alexander Miller'.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography fontSize={{ xs: 10, sm: 13 }}>Sitting</Typography>
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
                  <Typography fontSize={16}>4.8</Typography>
                </Box>
              </TableCell>
              <TableCell
                align="right"
                width={190}
                sx={{ p: '7px 10px', pr: 4, borderRadius: '0 10px 10px 0' }}
              >
                <Typography fontSize={14}>16</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#EFF7F9' }}>
              <TableCell sx={{ p: '7px 10px', borderRadius: '10px 0 0 10px', borderBottom: 0 }}>
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
                  <Avatar
                    src="/assets/images/sitting.png"
                    alt="Alexander Miller"
                    sx={{
                      width: '46px !important',
                      height: '46px !important',
                    }}
                  >
                    {'Alexander Miller'.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography fontSize={{ xs: 10, sm: 13 }}>Sitting</Typography>
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
                  <Typography fontSize={16}>4.8</Typography>
                </Box>
              </TableCell>
              <TableCell
                align="right"
                width={190}
                sx={{ p: '7px 10px', pr: 4, borderRadius: '0 10px 10px 0' }}
              >
                <Typography fontSize={14}>16</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#EFF7F9' }}>
              <TableCell sx={{ p: '7px 10px', borderRadius: '10px 0 0 10px', borderBottom: 0 }}>
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.4 }} flexWrap="wrap">
                  <Avatar
                    src="/assets/images/sitting.png"
                    alt="Alexander Miller"
                    sx={{
                      width: '46px !important',
                      height: '46px !important',
                    }}
                  >
                    {'Alexander Miller'.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography fontSize={{ xs: 10, sm: 13 }}>Sitting</Typography>
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
                  <Typography fontSize={16}>4.8</Typography>
                </Box>
              </TableCell>
              <TableCell
                align="right"
                width={190}
                sx={{ p: '7px 10px', pr: 4, borderRadius: '0 10px 10px 0' }}
              >
                <Typography fontSize={14}>16</Typography>
              </TableCell>
            </TableRow>
          </TableBody> */}
        </Table>
      </TableContainer>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
        mt={2.5}
      >
        <Button
          component={Link}
          to="/customers-feedback?display_type=customer-experience&value=non-store-ratings"
          sx={{ fontSize: 12, width: '118px', borderRadius: '40px' }}
          variant="contained"
          color="primary"
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
