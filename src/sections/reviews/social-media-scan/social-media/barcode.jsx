/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
// import { BarcodeReader } from 'react-scanner';
// import QrReader from 'react-qr-barcode-scanner';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import CountdownTimer from 'src/components/countdown-timer';

const BarcodeTwo = ({ interfaceDetails }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTime = interfaceDetails && interfaceDetails?.timer; // Initial time in seconds
  const [countDownTime, setCountDownTime] = useState(initialTime);
  const [timerKey, setTimerKey] = useState(0); // Key to reset timer

  const resetTimer = () => {
    setCountDownTime(initialTime);
    setTimerKey((prevKey) => prevKey + 1); // Increment key to reset timer
  };

  useEffect(() => {
    if (interfaceDetails) {
      setCountDownTime(interfaceDetails?.timer);
    }
  }, [interfaceDetails]);

  return (
    <Box
      display="flex"
      flexWrap="wrap-reverse"
      justifyContent="center"
      gap={4}
      alignItems="center"
      mt="72px"
    >
      <Button
        startIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="responsive-svg"
          >
            <path
              d="M33.448 10.1063C33.9741 10.4646 34.3363 11.0173 34.4549 11.6427C34.5735 12.2681 34.4388 12.915 34.0804 13.4411C33.7221 13.9672 33.1694 14.3293 32.544 14.4479C31.9186 14.5665 31.2717 14.4318 30.7456 14.0735C28.5299 12.5672 25.8738 11.8458 23.2005 12.0241C20.5272 12.2024 17.9905 13.2703 15.9944 15.0575C13.9984 16.8447 12.6579 19.2486 12.1865 21.886C11.715 24.5235 12.1398 27.2428 13.3931 29.6108C14.6464 31.9789 16.6561 33.8594 19.1021 34.9528C21.5481 36.0462 24.2896 36.2895 26.89 35.6441C29.4903 34.9987 31.7999 33.5016 33.4507 31.3914C35.1016 29.2811 35.9987 26.6791 35.9992 23.9999C35.9992 23.3633 36.2521 22.7529 36.7022 22.3028C37.1523 21.8527 37.7627 21.5999 38.3992 21.5999C39.0358 21.5999 39.6462 21.8527 40.0963 22.3028C40.5464 22.7529 40.7992 23.3633 40.7992 23.9999C40.7987 27.751 39.5427 31.3941 37.2314 34.3486C34.9201 37.3032 31.6865 39.3992 28.0457 40.3027C24.405 41.2062 20.5666 40.8652 17.1421 39.3342C13.7176 37.8031 10.9041 35.1699 9.14973 31.8543C7.39539 28.5386 6.8012 24.7312 7.46182 21.0386C8.12244 17.3461 9.99986 13.9809 12.795 11.4791C15.5901 8.97738 19.1421 7.48307 22.885 7.23427C26.6279 6.98547 30.3464 7.9965 33.448 10.1063Z"
              fill="white"
            />
            <path
              d="M32.4948 30.0146C32.2292 30.1845 31.9328 30.3004 31.6225 30.3557C31.3122 30.4111 30.994 30.4047 30.6861 30.3371C30.3782 30.2695 30.0867 30.1418 29.8281 29.9615C29.5696 29.7812 29.3491 29.5517 29.1792 29.2862C29.0093 29.0207 28.8934 28.7243 28.838 28.414C28.7827 28.1036 28.7891 27.7854 28.8567 27.4776C28.9243 27.1697 29.0519 26.8781 29.2323 26.6196C29.4126 26.361 29.642 26.1405 29.9076 25.9706L38.2644 20.6258C38.8005 20.294 39.4456 20.1865 40.0604 20.3265C40.6751 20.4666 41.21 20.8428 41.5496 21.3741C41.8891 21.9053 42.006 22.5488 41.8749 23.1655C41.7439 23.7822 41.3754 24.3226 40.8492 24.6698L32.4948 30.0146Z"
              fill="white"
            />
            <path
              d="M45.3661 29.7835C45.611 30.3622 45.6192 31.014 45.3889 31.5987C45.1585 32.1834 44.708 32.6545 44.1341 32.9106C43.5602 33.1668 42.9087 33.1876 42.3196 32.9686C41.7305 32.7496 41.2509 32.3083 40.9837 31.7395L37.3645 23.6275C37.2288 23.3387 37.1521 23.0257 37.1388 22.7069C37.1255 22.3881 37.176 22.0698 37.2871 21.7707C37.3983 21.4717 37.568 21.1978 37.7863 20.965C38.0046 20.7323 38.2672 20.5455 38.5585 20.4154C38.8499 20.2854 39.1643 20.2147 39.4833 20.2076C39.8023 20.2005 40.1195 20.2571 40.4164 20.3741C40.7133 20.491 40.9838 20.666 41.2123 20.8888C41.4407 21.1115 41.6225 21.3776 41.7469 21.6715L45.3661 29.7835Z"
              fill="white"
            />
          </svg>
        }
        variant="contained"
        onClick={resetTimer}
        sx={{
          background: '#FFC500',
          color: '#fff',
          fontSize: { md: '30px', xs: '20px' },
          fontWeight: 600,
          px: '30px',
          ':hover': { background: '#FFC500' },
          '& .responsive-svg': {
            width: { xs: '30px', sm: '36px', md: '48px' },
            height: { xs: '30px', sm: '36px', md: '48px' },
          },
        }}
      >
        Allow More Time
      </Button>

      <Box
        display={{ md: 'flex', xs: 'block', sm: 'flex' }}
        gap={{ md: '30px', sm: '15px' }}
        alignItems="center"
      >
        <CountdownTimer
          key={timerKey}
          duration={countDownTime}
          onComplete={() => navigate(`/rate-staff?store=${searchParams.get('store')}`)}
        />

        <Typography
          fontSize={{ md: '50px', sm: '40px', xs: '30px' }}
          color="#FFC500"
          textAlign="center"
          // ml={2}
        >
          Timer
        </Typography>
      </Box>
    </Box>
  );
};

export default BarcodeTwo;
