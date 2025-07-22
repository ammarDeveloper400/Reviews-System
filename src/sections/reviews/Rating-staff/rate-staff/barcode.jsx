/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
// import { BarcodeReader } from 'react-scanner';
// import QrReader from 'react-qr-barcode-scanner';

import { Link, useSearchParams } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';

import { baseUrl } from 'src/utils/functions';
import CountdownTimer from 'src/components/countdown-timer';
import QRCodeWithLogo from 'src/components/qr-code';

const Barcode = ({ isStaffRated, countDownTime, timerKey }) => {
  const [barcode] = useState('');

  const [searchParams] = useSearchParams();

  // const handleScan = (data) => {
  //   if (data) {
  //     setBarcode(data);
  //     // Perform any additional actions with the scanned barcode data
  //   }
  // };

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={12} md={6}>
        {isStaffRated && (
          <Box
            display={{ md: 'flex', xs: 'block' }}
            flexWrap={{ md: 'nowrap', sm: 'nowrap', xs: 'wrap' }}
            gap={{ md: '30px', sm: '15px' }}
            alignItems="center"
          >
            <CountdownTimer
              key={timerKey}
              duration={countDownTime}
              onComplete={() => window.location.reload()}
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
        )}
      </Grid>
      <Grid item xs={12}  md={6}>
        <Box
          display={{ sm: 'flex', xs: 'block' }}
          flexWrap={{ md: 'nowrap', sm: 'nowrap', xs: 'wrap' }}
          justifyContent={{ md: 'end', sm: 'end', xs: 'center' }}
          gap="40px"
          alignItems="center"
          mt="10px"
        >
          <Typography
            sx={{
              fontSize: { md: '50px', sm: '40px', xs: '30px' },
              color: '#FFC500',
              textAlign: 'center',
            }}
          >
           Review Later or Message Manager 
            <br /> (100% anonymous)
          </Typography>
          <Link to={`/after-scan?store=${searchParams.get('store')}`}>
            <Box
              mt={2}
              mx="auto"
              sx={{ width: 'max-content', border: '10px solid black', p: 1, borderRadius: '10px' }}
            >
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
      </Grid>
    </Grid>
  );
};

export default Barcode;
