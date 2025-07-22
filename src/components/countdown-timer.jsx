/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Box, Stack, Typography } from '@mui/material';

const CountdownTimer = ({ duration, onComplete }) => {
  const renderTime = ({ remainingTime }) => (
    // if (remainingTime === 0) {
    //   return <div className="timer">Too lale...</div>;
    // }

    <Stack textAlign="center" color="#000">
      <Typography fontSize={28} lineHeight={1}>
        {remainingTime} Sec
      </Typography>
    </Stack>
  );
  return (
    <Box width={160} height={160}>
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={['#FFC500']}
        colorsTime={[0]}
        trailColor="#303131"
        onComplete={() => onComplete()}
        size={160}
        strokeWidth={10}
        trailStrokeWidth={9}
      >
        {renderTime}
      </CountdownCircleTimer>
    </Box>
  );
};

export default CountdownTimer;
