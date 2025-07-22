/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Card, Grid, Stack, Rating, Typography, LinearProgress } from '@mui/material';

import { getOrdinalSuffix } from 'src/utils/functions';

import Iconify from 'src/components/iconify';

const ChartDisplayCard = ({ staff, index }) => {
  const ratingBreakdown = staff?.ratingBreakdown;
  const totalRatings = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);

  const getProgressValue = (rating) => (totalRatings ? (rating / totalRatings) * 100 : 0);

  const renderStars = (count) =>
    [...Array(count)].map((_, starIndex) => (
      <svg
        key={starIndex}
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M5.76932 9.80507C5.60347 9.69985 5.3955 9.69986 5.22965 9.8051L2.68603 11.4192C2.29177 11.6694 1.80438 11.2992 1.90915 10.8292L2.5835 7.80354C2.62731 7.60699 2.56379 7.40117 2.4184 7.26862L0.179445 5.22727C-0.167367 4.91107 0.0190734 4.31382 0.47731 4.27308L3.42793 4.01075C3.62007 3.99367 3.78746 3.8668 3.86295 3.68103L5.02092 0.831676C5.20065 0.389441 5.79935 0.389441 5.97908 0.831677L7.13705 3.68103C7.21254 3.8668 7.37993 3.99367 7.57207 4.01075L10.5227 4.27308C10.9809 4.31382 11.1674 4.91107 10.8206 5.22727L8.5816 7.26862C8.43621 7.40117 8.37269 7.60699 8.4165 7.80354L9.0909 10.8294C9.19565 11.2994 8.70833 11.6696 8.31407 11.4194L5.76932 9.80507Z"
          fill="#FFC500"
        />
      </svg>
    ));
  return (
    <Card sx={{ borderRadius: '15px', p: '14px', color: '#000' }}>
      <Grid container spacing={4}>
        <Grid item md={5.5} xs={12}>
          <Stack>
            <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
              <Typography variant="h4">{getOrdinalSuffix(index + 1)}</Typography>
              <Typography variant="h4">{staff?.staff?.name}</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Box
                  width={1}
                  height={1}
                  borderRadius="10px"
                  // bgcolor="#fff959"
                  // display="flex"
                  // alignItems="center"
                  // justifyContent="center"
                  maxHeight={{ lg: 200, xs: 400 }}
                >
                  <img
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '10px', objectFit: 'cover' }}
                    src={staff?.staff?.image}
                    alt=""
                  />
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack gap={2}>
                  <Card sx={{ bgcolor: '#EFF7F9', p: '24px 15px', color: '#000' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography fontSize={14}>Number of Ratings</Typography>
                      <Typography
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="#01565A"
                        color="#fff"
                        minWidth={38}
                        minHeight={38}
                        borderRadius={3}
                      >
                        {staff?.totalRating}
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
                          value={staff?.averageRating}
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
                        {staff?.averageRating?.toFixed(2)}
                      </Typography>
                    </Box>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item md={6.5} xs={12}>
          <Card sx={{ bgcolor: '#EFF7F9', p: { md: 3, xs: 2 }, color: '#000', overflowX: 'auto' }}>
            <Stack px={{ xs: 0, md: 3.5 }} gap={4}>
              {[
                { label: 'One Star', value: ratingBreakdown?.oneStar },
                { label: 'Two Stars', value: ratingBreakdown?.twoStar },
                { label: 'Three Stars', value: ratingBreakdown?.threeStar },
                { label: 'Four Stars', value: ratingBreakdown?.fourStar },
                { label: 'Five Stars', value: ratingBreakdown?.fiveStar },
              ].map(({ label, value }, ratingIndex) => (
                <Box
                  key={ratingIndex}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}
                >
                  <Box display="flex" width={1} gap={2}>
                    <Box
                      display="flex"
                      minWidth={150}
                      justifyContent="end"
                      alignItems="center"
                      gap="5px"
                    >
                      {renderStars(ratingIndex + 1)}
                      <Typography fontSize={12} whiteSpace="nowrap">
                        {label}
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
                        value={getProgressValue(value)}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ minWidth: 80 }}>
                    <Typography fontSize={12} whiteSpace="nowrap">
                      {value} Ratings
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
            {/* <Stack px={{ xs: 0, md: 3.5 }} gap={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
                <Box display="flex" width={1} gap={2}>
                  <Box
                    display="flex"
                    minWidth={150}
                    justifyContent="end"
                    alignItems="center"
                    gap="5px"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M5.76932 9.80507C5.60347 9.69985 5.3955 9.69986 5.22965 9.8051L2.68603 11.4192C2.29177 11.6694 1.80438 11.2992 1.90915 10.8292L2.5835 7.80354C2.62731 7.60699 2.56379 7.40117 2.4184 7.26862L0.179445 5.22727C-0.167367 4.91107 0.0190734 4.31382 0.47731 4.27308L3.42793 4.01075C3.62007 3.99367 3.78746 3.8668 3.86295 3.68103L5.02092 0.831676C5.20065 0.389441 5.79935 0.389441 5.97908 0.831677L7.13705 3.68103C7.21254 3.8668 7.37993 3.99367 7.57207 4.01075L10.5227 4.27308C10.9809 4.31382 11.1674 4.91107 10.8206 5.22727L8.5816 7.26862C8.43621 7.40117 8.37269 7.60699 8.4165 7.80354L9.0909 10.8294C9.19565 11.2994 8.70833 11.6696 8.31407 11.4194L5.76932 9.80507Z"
                        fill="#FFC500"
                      />
                    </svg>
                    <Typography fontSize={12} whiteSpace="nowrap">
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
                </Box>
                <Box sx={{ minWidth: 80 }}>
                  <Typography fontSize={12} whiteSpace="nowrap">
                    {store?.ratingBreakdown?.oneStar} Ratings
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
                <Box display="flex" width={1} gap={2}>
                  <Box
                    display="flex"
                    minWidth={150}
                    justifyContent="end"
                    alignItems="center"
                    gap="5px"
                  >
                    {[1, 2].map((item) => (
                      <svg
                        key={item}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.76932 9.80507C5.60347 9.69985 5.3955 9.69986 5.22965 9.8051L2.68603 11.4192C2.29177 11.6694 1.80438 11.2992 1.90915 10.8292L2.5835 7.80354C2.62731 7.60699 2.56379 7.40117 2.4184 7.26862L0.179445 5.22727C-0.167367 4.91107 0.0190734 4.31382 0.47731 4.27308L3.42793 4.01075C3.62007 3.99367 3.78746 3.8668 3.86295 3.68103L5.02092 0.831676C5.20065 0.389441 5.79935 0.389441 5.97908 0.831677L7.13705 3.68103C7.21254 3.8668 7.37993 3.99367 7.57207 4.01075L10.5227 4.27308C10.9809 4.31382 11.1674 4.91107 10.8206 5.22727L8.5816 7.26862C8.43621 7.40117 8.37269 7.60699 8.4165 7.80354L9.0909 10.8294C9.19565 11.2994 8.70833 11.6696 8.31407 11.4194L5.76932 9.80507Z"
                          fill="#FFC500"
                        />
                      </svg>
                    ))}

                    <Typography fontSize={12} whiteSpace="nowrap">
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
                </Box>
                <Box sx={{ minWidth: 80 }}>
                  <Typography fontSize={12} whiteSpace="nowrap">
                    {store?.ratingBreakdown?.twoStar} Ratings
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
                <Box display="flex" width={1} gap={2}>
                  <Box
                    display="flex"
                    minWidth={150}
                    justifyContent="end"
                    alignItems="center"
                    gap="5px"
                  >
                    {[1, 2, 3].map((item) => (
                      <svg
                        key={item}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.76932 9.80507C5.60347 9.69985 5.3955 9.69986 5.22965 9.8051L2.68603 11.4192C2.29177 11.6694 1.80438 11.2992 1.90915 10.8292L2.5835 7.80354C2.62731 7.60699 2.56379 7.40117 2.4184 7.26862L0.179445 5.22727C-0.167367 4.91107 0.0190734 4.31382 0.47731 4.27308L3.42793 4.01075C3.62007 3.99367 3.78746 3.8668 3.86295 3.68103L5.02092 0.831676C5.20065 0.389441 5.79935 0.389441 5.97908 0.831677L7.13705 3.68103C7.21254 3.8668 7.37993 3.99367 7.57207 4.01075L10.5227 4.27308C10.9809 4.31382 11.1674 4.91107 10.8206 5.22727L8.5816 7.26862C8.43621 7.40117 8.37269 7.60699 8.4165 7.80354L9.0909 10.8294C9.19565 11.2994 8.70833 11.6696 8.31407 11.4194L5.76932 9.80507Z"
                          fill="#FFC500"
                        />
                      </svg>
                    ))}

                    <Typography fontSize={12} whiteSpace="nowrap">
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
                </Box>
                <Box sx={{ minWidth: 80 }}>
                  <Typography fontSize={12} whiteSpace="nowrap">
                    {store?.ratingBreakdown?.threeStar} Ratings
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
                <Box display="flex" width={1} gap={2}>
                  <Box
                    display="flex"
                    minWidth={150}
                    justifyContent="end"
                    alignItems="center"
                    gap="5px"
                  >
                    {[1, 2, 3, 4].map((item) => (
                      <svg
                        key={item}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.76932 9.80507C5.60347 9.69985 5.3955 9.69986 5.22965 9.8051L2.68603 11.4192C2.29177 11.6694 1.80438 11.2992 1.90915 10.8292L2.5835 7.80354C2.62731 7.60699 2.56379 7.40117 2.4184 7.26862L0.179445 5.22727C-0.167367 4.91107 0.0190734 4.31382 0.47731 4.27308L3.42793 4.01075C3.62007 3.99367 3.78746 3.8668 3.86295 3.68103L5.02092 0.831676C5.20065 0.389441 5.79935 0.389441 5.97908 0.831677L7.13705 3.68103C7.21254 3.8668 7.37993 3.99367 7.57207 4.01075L10.5227 4.27308C10.9809 4.31382 11.1674 4.91107 10.8206 5.22727L8.5816 7.26862C8.43621 7.40117 8.37269 7.60699 8.4165 7.80354L9.0909 10.8294C9.19565 11.2994 8.70833 11.6696 8.31407 11.4194L5.76932 9.80507Z"
                          fill="#FFC500"
                        />
                      </svg>
                    ))}

                    <Typography fontSize={12} whiteSpace="nowrap">
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
                </Box>
                <Box sx={{ minWidth: 80 }}>
                  <Typography fontSize={12} whiteSpace="nowrap">
                    {store?.ratingBreakdown?.fourStar} Ratings
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 1 }}>
                <Box display="flex" width={1} gap={2}>
                  <Box display="flex" minWidth={150} alignItems="center" gap="5px">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <svg
                        key={item}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.76932 9.80507C5.60347 9.69985 5.3955 9.69986 5.22965 9.8051L2.68603 11.4192C2.29177 11.6694 1.80438 11.2992 1.90915 10.8292L2.5835 7.80354C2.62731 7.60699 2.56379 7.40117 2.4184 7.26862L0.179445 5.22727C-0.167367 4.91107 0.0190734 4.31382 0.47731 4.27308L3.42793 4.01075C3.62007 3.99367 3.78746 3.8668 3.86295 3.68103L5.02092 0.831676C5.20065 0.389441 5.79935 0.389441 5.97908 0.831677L7.13705 3.68103C7.21254 3.8668 7.37993 3.99367 7.57207 4.01075L10.5227 4.27308C10.9809 4.31382 11.1674 4.91107 10.8206 5.22727L8.5816 7.26862C8.43621 7.40117 8.37269 7.60699 8.4165 7.80354L9.0909 10.8294C9.19565 11.2994 8.70833 11.6696 8.31407 11.4194L5.76932 9.80507Z"
                          fill="#FFC500"
                        />
                      </svg>
                    ))}

                    <Typography fontSize={12} whiteSpace="nowrap">
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
                </Box>
                <Box sx={{ minWidth: 80 }}>
                  <Typography fontSize={12} whiteSpace="nowrap">
                    {store?.ratingBreakdown?.fiveStar} Ratings
                  </Typography>
                </Box>
              </Box>
            </Stack> */}
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ChartDisplayCard;
