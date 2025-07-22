/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Card, Stack, Rating, Divider, Typography, LinearProgress } from '@mui/material';

import Iconify from 'src/components/iconify';

const CompareStoreCard = ({ data }) => {
  const ratingBreakdown = data?.ratingBreakdown;
  const totalRatings = ratingBreakdown && Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);

  const getProgressValue = (rating) => (totalRatings ? (rating / totalRatings) * 100 : 0);
  return (
    <Card sx={{ borderRadius: '15px', p: '20px 30px', color: '#000' }}>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
          <Typography variant="h4">{data?.store?.name}</Typography>
        </Box>
        <Stack gap={2} pb={2}>
          <Card sx={{ bgcolor: '#EFF7F9', p: '24px 15px', color: '#000' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography fontSize={14}>Number of Ratings</Typography>
              <Typography fontFamily={16} fontWeight={600}>
                {data?.totalRating} reviews
              </Typography>
            </Box>
          </Card>
          <Card sx={{ bgcolor: '#EFF7F9', p: '24px 15px', color: '#000' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography fontSize={14} mb={0.5}>
                  Average Score
                </Typography>
                <Rating
                  readOnly
                  size="small"
                  name="half-rating"
                  value={data?.averageRating}
                  precision={0.25}
                  emptyIcon={
                    <Iconify
                      sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                      icon="material-symbols:star"
                    />
                  }
                />
              </Box>
              <Typography fontSize={30} fontWeight={700}>
                {data?.averageRating?.toFixed(1)}
              </Typography>
            </Box>
          </Card>
        </Stack>
        <Divider />
        <Box display="flex" justifyContent="center" gap={2} pb={1} pt={1}>
          <Typography variant="h4">Graph</Typography>
        </Box>
        <Card sx={{ bgcolor: '#EFF7F9', p: '24px', color: '#000', overflowX: 'auto' }}>
          <Stack px={{ xs: 2, md: 3.5 }} gap={4}>
            {[
              { label: 'One Star', value: data?.ratingBreakdown?.oneStar },
              { label: 'Two Stars', value: data?.ratingBreakdown?.twoStar },
              { label: 'Three Stars', value: data?.ratingBreakdown?.threeStar },
              { label: 'Four Stars', value: data?.ratingBreakdown?.fourStar },
              { label: 'Five Stars', value: data?.ratingBreakdown?.fiveStar },
            ].map(({ label, value }, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  display="flex"
                  minWidth={50}
                  justifyContent="end"
                  alignItems="center"
                  gap="5px"
                >
                  <Typography fontSize={14} whiteSpace="nowrap">
                    {label}
                  </Typography>
                </Box>
                <Box sx={{ width: 1, minWidth: 50 }}>
                  <LinearProgress
                    sx={{
                      height: 15,
                      borderRadius: '5px',
                      bgcolor: '#EFF7F9',
                      '& .MuiLinearProgress-bar': { bgcolor: '#01565A', borderRadius: '2px' },
                    }}
                    variant="determinate"
                    value={getProgressValue(value)}
                  />
                </Box>
                <Box sx={{ minWidth: 40 }}>
                  <Typography fontSize={12} whiteSpace="nowrap">
                    {value} reviews
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          {/* <Stack px={{ xs: 2, md: 3.5 }} gap={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box display="flex" minWidth={50} justifyContent="end" alignItems="center" gap="5px">
              <Typography fontSize={14} whiteSpace="nowrap">
                One Star
              </Typography>
            </Box>
            <Box sx={{ width: 1, minWidth: 50, mr: 1 }}>
              <LinearProgress
                sx={{
                  height: 16,
                  borderRadius: '5px',
                  bgcolor: '#EFF7F9',
                  '& .MuiLinearProgress-bar': { bgcolor: '#01565A', borderRadius: '2px' },
                }}
                variant="determinate"
                value={30}
              />
            </Box>
            <Box sx={{ minWidth: 40 }}>
              <Typography fontSize={12} whiteSpace="nowrap">
                {data?.ratingBreakdown?.oneStar} reviews
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box display="flex" minWidth={50} justifyContent="end" alignItems="center" gap="5px">
              <Typography fontSize={14} whiteSpace="nowrap">
                Two Stars
              </Typography>
            </Box>
            <Box sx={{ width: 1, minWidth: 50, mr: 1 }}>
              <LinearProgress
                sx={{
                  height: 16,
                  borderRadius: '5px',
                  bgcolor: '#EFF7F9',
                  '& .MuiLinearProgress-bar': { bgcolor: '#01565A', borderRadius: '2px' },
                }}
                variant="determinate"
                value={30}
              />
            </Box>
            <Box sx={{ minWidth: 80 }}>
              <Typography fontSize={12} whiteSpace="nowrap">
                {data?.ratingBreakdown?.twoStar} reviews
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box display="flex" minWidth={50} justifyContent="end" alignItems="center" gap="5px">
              <Typography fontSize={14} whiteSpace="nowrap">
                Three Stars
              </Typography>
            </Box>
            <Box sx={{ width: 1, minWidth: 50, mr: 1 }}>
              <LinearProgress
                sx={{
                  height: 16,
                  borderRadius: '5px',
                  bgcolor: '#EFF7F9',
                  '& .MuiLinearProgress-bar': { bgcolor: '#01565A', borderRadius: '2px' },
                }}
                variant="determinate"
                value={30}
              />
            </Box>
            <Box sx={{ minWidth: 80 }}>
              <Typography fontSize={12} whiteSpace="nowrap">
                {data?.ratingBreakdown?.threeStar} reviews
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box display="flex" minWidth={50} justifyContent="end" alignItems="center" gap="5px">
              <Typography fontSize={14} whiteSpace="nowrap">
                Four Stars
              </Typography>
            </Box>
            <Box sx={{ width: 1, minWidth: 50, mr: 1 }}>
              <LinearProgress
                sx={{
                  height: 16,
                  borderRadius: '5px',
                  bgcolor: '#EFF7F9',
                  '& .MuiLinearProgress-bar': { bgcolor: '#01565A', borderRadius: '2px' },
                }}
                variant="determinate"
                value={36}
                maxValue={50}
              />
            </Box>
            <Box sx={{ minWidth: 80 }}>
              <Typography fontSize={12} whiteSpace="nowrap">
                {data?.ratingBreakdown?.fourStar} reviews
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box display="flex" justifyContent="end" minWidth={50} alignItems="center" gap="5px">
              <Typography fontSize={14} whiteSpace="nowrap">
                Five Stars
              </Typography>
            </Box>
            <Box sx={{ width: 1, minWidth: 50, mr: 1 }}>
              <LinearProgress
                sx={{
                  height: 16,
                  borderRadius: '5px',
                  bgcolor: '#EFF7F9',
                  '& .MuiLinearProgress-bar': { bgcolor: '#01565A', borderRadius: '2px' },
                }}
                variant="determinate"
                value={30}
              />
            </Box>
            <Box sx={{ minWidth: 80 }}>
              <Typography fontSize={12} whiteSpace="nowrap">
                {data?.ratingBreakdown?.fiveStar} reviews
              </Typography>
            </Box>
          </Box>
        </Stack> */}
        </Card>
      </Stack>
    </Card>
  );
};

export default CompareStoreCard;
