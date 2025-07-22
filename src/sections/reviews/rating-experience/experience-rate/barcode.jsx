/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
// import { BarcodeReader } from 'react-scanner';
// import QrReader from 'react-qr-barcode-scanner';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { baseUrl } from 'src/utils/functions';

import QRCodeWithLogo from 'src/components/qr-code';
import CountdownTimer from 'src/components/countdown-timer';

const BarcodeTwo = ({ interfaceDetails }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [barcode] = useState('');

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent={{ md: 'space-between', sm: 'space-between', xs: 'center' }}
      gap={{ md: '30px', sm: '30px', xs: '65px' }}
      alignItems="center"
      mt={{ md: '53px', xs: '30px' }}
    >
      <Box
        display={{ md: 'flex', xs: 'block' }}
        flexWrap={{ md: 'nowrap', sm: 'nowrap', xs: 'wrap' }}
        gap={{ md: '30px', sm: '15px' }}
        alignItems="center"
      >
        <CountdownTimer
          duration={interfaceDetails?.timerInSec}
          onComplete={() => navigate(`/rate-staff?store=${searchParams.get('store')}`)}
        />

        <Typography
          fontSize={{ md: '50px', sm: '34px', xs: '34px' }}
          color="#FFC500"
          textAlign="center"
          // ml={2}
          display=""
        >
          Timer
        </Typography>
      </Box>
      <Box
        display={{ md: 'flex', sm: 'flex', xs: 'block' }}
        gap={{ md: '40px', sm: '15px' }}
        alignItems="center"
        mt="10px"
      >
        <Typography
          sx={{
            fontSize: { md: '50px', sm: '30px', xs: '30px' },
            color: '#FFC500',
            textAlign: 'center',
          }}
        >
          Or Review
          <br /> Me Later
        </Typography>
        <Link to={`/after-scan-experience?store=${searchParams.get('store')}`}>
          <Box sx={{ border: '10px solid black', p: 1, borderRadius: '10px' }}>
            {barcode && <Typography sx={{ fontSize: '' }} />}
            <QRCodeWithLogo
              value={`${baseUrl}/after-scan?store=${searchParams.get('store')}`}
              size={200}
              logoWidth={60}
              logoHeight={60}
            />
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default BarcodeTwo;
