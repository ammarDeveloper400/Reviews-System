/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
// import { fShortenNumber } from 'src/utils/format-number';
import { Stack, Select, Rating, Button, MenuItem, CircularProgress } from '@mui/material';

import { useGetDashboardCustomerCommentsQuery } from 'src/services/dashboard-stats';

import Iconify from 'src/components/iconify';
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

export default function AppCustomerComments({ storeId }) {
  const [filterValue, setFilterValue] = useState('weekly');
  const [sortValue, setSortValue] = useState('Highest');

  const { data, isLoading } = useGetDashboardCustomerCommentsQuery({
    storeId,
    filterType: filterValue,
    sortType: sortValue,
  });

  return (
    <Card
      sx={{
        p: '20px',
        borderRadius: '10px',
        color: '#000',
      }}
    >
      <Box
        display="flex"
        alignItems="end"
        gap={1.5}
        flexWrap="wrap"
        justifyContent="space-between"
        mb={2}
      >
        <Typography fontWeight={500} fontSize={16} mb={0.5}>
        QR Code Ratings
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
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
              Last week
            </MenuItem>
          </Select>
          <Select
            id="sorting"
            type="text"
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
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
            <MenuItem sx={{ fontSize: '10px' }} value="Highest">
              Highest
            </MenuItem>
            <MenuItem sx={{ fontSize: '10px' }} value="Lowest">
              Lowest
            </MenuItem>
            <MenuItem sx={{ fontSize: '10px' }} value="Newest">
              Newest
            </MenuItem>
            <MenuItem sx={{ fontSize: '10px' }} value="Oldest">
              Oldest
            </MenuItem>
          </Select>
        </Box>
      </Box>
      <Box
        display="flex"
        gap={3}
        sx={{
          overflowX: 'auto',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
        }}
      >
        {isLoading ? (
          <Box width={1} minHeight={200} textAlign="center" py={4}>
            <CircularProgress size={30} />
          </Box>
        ) : data?.comments?.length > 0 ? (
          data?.comments?.map((comment, index) => (
            <Card
              key={index}
              sx={{
                minWidth: '215px',
                maxWidth: '215px',
                p: '20px 12px',
                bgcolor: '#E9F1F3',
                borderRadius: '8px',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box width={60} height={60}>
                  <img
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '100%', objectFit: 'cover' }}
                    src={comment?.image}
                    alt={comment?.name}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography fontSize={12} fontWeight={500} mb={0.5} color="#5C5C5C">
                    {comment?.rating?.toFixed(1)}/5
                  </Typography>
                  <Rating
                    readOnly
                    size="small"
                    name="half-rating"
                    value={comment?.rating}
                    precision={0.25}
                    emptyIcon={
                      <Iconify
                        sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                        icon="material-symbols:star"
                      />
                    }
                  />
                </Box>
              </Box>
              <Stack gap={0.6} mt={2}>
                <Typography fontSize={12} fontWeight={500}>
                  {comment?.name}
                </Typography>
                <Box height={80} sx={{ overflowY: 'auto' }}>
                  <Typography fontSize={12} fontWeight={300}>
                    {comment?.comments}
                  </Typography>
                </Box>
                <Typography fontSize={12} fontWeight={300} color="rgba(0, 0, 0, 0.7)">
                  {dayjs(comment?.date)?.format('h:mma dddd D MMM')}
                </Typography>
              </Stack>
            </Card>
          ))
        ) : (
          <Box width={1} minHeight={200} display="flex" alignItems="center" justifyContent="center">
            <Typography fontSize={14} color="#212B36">
              No data found.
            </Typography>
          </Box>
        )}
      </Box>
      <Box textAlign="center" mt={2.5}>
        <Button
          component={Link}
          to="/customers-feedback"
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
