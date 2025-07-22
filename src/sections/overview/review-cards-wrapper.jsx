/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';

import ReviewsCard from './reviews-card';

export default function ReviewCardsWrapper({ isLoading, data }) {
  const [selectedReviews, setSelectedReviews] = useState('staff-reviews');
  const [reviews, setReviews] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Update reviews data when selectedReviews changes
  useEffect(() => {
    if (data) {
      if (selectedReviews === 'staff-reviews') {
        setReviews(data?.staffReviews || []);
      } else {
        setReviews(data?.customerExperienceRatings || []);
      }
      setIsDataLoaded(true);
    }
  }, [selectedReviews, data]);

  // Function to divide the reviews array into chunks of 3
  const chunkReviews = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const reviewChunks = chunkReviews(reviews, 3);

  return (
    <Card
      sx={{
        p: '20px',
        borderRadius: '10px',
        color: '#000',
        height: '100%',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        flexWrap="wrap"
        mb={2}
      >
        <Typography fontSize={16} fontWeight={500}>
          {/* Reviews */}
          Quick Glance
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            disableRipple
            onClick={() => setSelectedReviews('staff-reviews')}
            variant={selectedReviews === 'staff-reviews' ? 'contained' : 'outlined'}
            sx={{
              bgcolor: selectedReviews === 'staff-reviews' ? '#daeb8c' : '#fff',
              border: '2px solid #daeb8c',
              boxShadow: 'none',
              fontSize: '14px',
              fontWeight: 400,
              color: 'black',
              p: { md: '8px 35px', xs: '8px 10px' },
              borderRadius: '15px',
              height: '40px',
              ':hover': {
                bgcolor: selectedReviews === 'staff-reviews' ? '#daeb8c' : '#e1f2967d',
                border: '2px solid #daeb8c',
              },
            }}
          >
            Staff
          </Button>
          <Button
            disableRipple
            onClick={() => setSelectedReviews('customer-experience')}
            variant={selectedReviews === 'customer-experience' ? 'contained' : 'outlined'}
            sx={{
              bgcolor: selectedReviews === 'customer-experience' ? '#daeb8c' : '#fff',
              border: '2px solid #daeb8c',
              boxShadow: 'none',
              fontSize: '14px',
              fontWeight: 400,
              color: 'black',
              p: { md: '8px 35px', xs: '8px 10px' },
              borderRadius: '15px',
              height: '40px',
              ':hover': {
                bgcolor: selectedReviews === 'customer-experience' ? '#daeb8c' : '#e1f2967d',
                border: '2px solid #daeb8c',
              },
            }}
          >
            Customer Experience
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        gap={2}
        sx={{
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, py: 4 }}>
            <CircularProgress />
          </Box>
        ) : isDataLoaded && reviews?.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, width: 1 }}>
            <Typography textAlign="center" fontSize={16} fontWeight={500}>
              No reviews available.
            </Typography>
          </Box>
        ) : (
          reviewChunks?.map((chunk, index) => (
            <Stack gap="20px" key={index}>
              {chunk?.map((review, i) => (
                <ReviewsCard
                  key={i}
                  review={review}
                  reviewFor={
                    selectedReviews === 'staff-reviews'
                      ? review?.staff?.name
                      : review?.customerExperience?.name
                  }
                  imgSrc={
                    selectedReviews === 'staff-reviews'
                      ? review?.staff?.image
                      : review?.customerExperience?.image
                  }
                  rating={review?.rating}
                  time={review?.time}
                  comments={
                    selectedReviews === 'customer-experience' ? review?.comments : undefined
                  }
                />
              ))}
            </Stack>
          ))
        )}
      </Box>
    </Card>
  );
}
