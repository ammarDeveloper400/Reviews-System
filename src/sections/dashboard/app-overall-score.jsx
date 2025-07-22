/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { fShortenNumber } from 'src/utils/format-number';
import { Select, MenuItem, LinearProgress } from '@mui/material';

import { useGetDashboardOverallScoreQuery } from 'src/services/dashboard-stats';

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

export default function AppOverallScore({ storeId }) {
  const [filterValue, setFilterValue] = useState('weekly');

  const { data } = useGetDashboardOverallScoreQuery({
    storeId,
    filterType: filterValue,
  });

  const ratingBreakdown = data && data?.starBreakdown;
  const totalRatings = ratingBreakdown && Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);

  const getProgressValue = (rating) => (totalRatings ? (rating / totalRatings) * 100 : 0);

  return (
    <Card
      sx={{
        p: '20px',
        borderRadius: '10px',
        color: '#000',
        height: 1,
      }}
    >
      <Box display="flex" gap={1.4} flexWrap="wrap" justifyContent="space-between" mb={3}>
        <Box>
          <Typography fontWeight={500} fontSize={16} mb={0.5}>
            Overall Score
          </Typography>
          <Typography fontWeight={500} fontSize={8} color="#00000080">
          Average Score (in-store & QR code ratings combined)
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gap={0.5} flexWrap="wrap">
          <Select
            id="sorting"
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
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
          <Typography fontSize={8}>
            {' '}
            Rating Since{' '}
            {filterValue === 'weekly'
              ? dayjs().day() === 0 // If it's Sunday, go back to the previous Monday
                ? dayjs().subtract(6, 'day').format('MMM, DD ')
                : dayjs().day(1).format('MMM, DD ') // Otherwise, go to the current Monday
              : dayjs().subtract(1, 'week').day(1).format('MMM, DD ')}{' '}
          </Typography>
        </Box>
      </Box>
      <Stack alignItems="center">
        <Typography
          component="div"
          display="flex"
          alignItems="center"
          gap={1}
          fontSize={32}
          fontWeight={600}
        >
          {data?.averageRating ? Number(data?.averageRating)?.toFixed(2) : "--"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
          >
            <path
              d="M16.259 25.8775C15.7916 25.5905 15.2055 25.5905 14.7381 25.8775L7.56971 30.2796C6.45863 30.9619 5.08508 29.9524 5.38032 28.6705L7.28078 20.4188C7.40424 19.8827 7.22522 19.3214 6.8155 18.9599L0.505708 13.3926C-0.471671 12.5302 0.0537524 10.9013 1.34515 10.7902L9.66053 10.0748C10.202 10.0282 10.6737 9.68219 10.8865 9.17554L14.1499 1.40457C14.6564 0.198475 16.3436 0.198477 16.8501 1.40457L20.1135 9.17554C20.3263 9.68219 20.798 10.0282 21.3395 10.0748L29.6549 10.7902C30.9463 10.9013 31.4717 12.5302 30.4943 13.3926L24.1845 18.9599C23.7748 19.3214 23.5958 19.8827 23.7192 20.4188L25.6198 28.6711C25.915 29.9529 24.5417 30.9624 23.4306 30.2803L16.259 25.8775Z"
              fill="#FFC500"
            />
          </svg>
        </Typography>
        <Typography fontSize={12} mb={3} mt={1}>
          Based on {data?.totalRatings ?? "--"} Ratings
        </Typography>
      </Stack>
      <Stack px={{ xs: 0, md: 3.5 }} gap={2}>
        {[
          { label: '5 Stars', value: ratingBreakdown?.fivestar },
          { label: '4 Stars', value: ratingBreakdown?.fourstar },
          { label: '3 Stars', value: ratingBreakdown?.threestar },
          { label: '2 Stars', value: ratingBreakdown?.twostar },
          { label: '1 Star', value: ratingBreakdown?.onestar },
        ].map(({ label, value }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ minWidth: 40, whiteSpace: 'nowrap' }}>
              <Typography fontSize={12}>{label}</Typography>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                sx={{
                  height: 8,
                  borderRadius: '2px',
                  bgcolor: '#EFF7F9',
                  '& .MuiLinearProgress-bar': { bgcolor: '#000', borderRadius: '2px' },
                }}
                variant="determinate"
                value={getProgressValue(value)}
              />
            </Box>
            <Box sx={{ minWidth: 20 }}>
              <Typography fontSize={12}>{value}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
      {/* <Stack px={{ xs: 0, md: 3.5 }} gap={1.5} mb={2.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ minWidth: 40, whiteSpace: 'nowrap' }}>
            <Typography fontSize={12}>5 Stars</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: '2px',
                bgcolor: '#EFF7F9',
                '& .MuiLinearProgress-bar': { bgcolor: '#000', borderRadius: '2px' },
              }}
              variant="determinate"
              value={30}
            />
          </Box>
          <Box sx={{ minWidth: 20 }}>
            <Typography fontSize={12}>36</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ minWidth: 40, whiteSpace: 'nowrap' }}>
            <Typography fontSize={12}>4 Stars</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: '2px',
                bgcolor: '#EFF7F9',
                '& .MuiLinearProgress-bar': { bgcolor: '#000', borderRadius: '2px' },
              }}
              variant="determinate"
              value={30}
            />
          </Box>
          <Box sx={{ minWidth: 20 }}>
            <Typography fontSize={12}>32</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ minWidth: 40, whiteSpace: 'nowrap' }}>
            <Typography fontSize={12}>3 Stars</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: '2px',
                bgcolor: '#EFF7F9',
                '& .MuiLinearProgress-bar': { bgcolor: '#000', borderRadius: '2px' },
              }}
              variant="determinate"
              value={30}
            />
          </Box>
          <Box sx={{ minWidth: 20 }}>
            <Typography fontSize={12}>10</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ minWidth: 40, whiteSpace: 'nowrap' }}>
            <Typography fontSize={12}>2 Stars</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: '2px',
                bgcolor: '#EFF7F9',
                '& .MuiLinearProgress-bar': { bgcolor: '#000', borderRadius: '2px' },
              }}
              variant="determinate"
              value={30}
            />
          </Box>
          <Box sx={{ minWidth: 20 }}>
            <Typography fontSize={12}>12</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ minWidth: 40, whiteSpace: 'nowrap' }}>
            <Typography fontSize={12}>1 Stars</Typography>
          </Box>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: '2px',
                bgcolor: '#EFF7F9',
                '& .MuiLinearProgress-bar': { bgcolor: '#000', borderRadius: '2px' },
              }}
              variant="determinate"
              value={30}
            />
          </Box>
          <Box sx={{ minWidth: 20 }}>
            <Typography fontSize={12}>8</Typography>
          </Box>
        </Box>
      </Stack> */}
    </Card>
  );
}

AppOverallScore.propTypes = {
  storeId: PropTypes.string,
};
