/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Grid, CircularProgress } from '@mui/material';

import CompareStoreCard from './store-card';

const CompareStoresDisplay = ({ compareStoresData, isLoading }) => (
  <Grid container spacing={2.5} pt={1}>
    {isLoading ? (
      <Box display="flex" justifyContent="center" width={1} py={4}>
        <CircularProgress />
      </Box>
    ) : (
      <>
        <Grid item xs={12} md={6}>
          <CompareStoreCard data={compareStoresData?.store1} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CompareStoreCard data={compareStoresData?.store2} />
        </Grid>
      </>
    )}
  </Grid>
);

export default CompareStoresDisplay;
