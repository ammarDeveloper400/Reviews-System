/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

import { Box, Stack, Typography, CircularProgress } from '@mui/material';

import {
  useGetStoreChartDataQuery,
  useLazyGetStoreFilteredChartDataQuery,
} from 'src/services/store-performance';

import ChartDisplayCard from './chart-display-card';

const ChartDisplay = ({ rangeValue }) => {
  const { data, isLoading } = useGetStoreChartDataQuery();
  const [getFilteredData] = useLazyGetStoreFilteredChartDataQuery();
  const [storesList, setStoresList] = React.useState([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  React.useEffect(() => {
    let formattedRangeValue = rangeValue;

    if (Array.isArray(rangeValue) && rangeValue.length === 2) {
      // When rangeValue is an array with exactly 2 elements, it's for a custom date range
      formattedRangeValue = 'Custom';
    } else if (typeof rangeValue === 'string') {
      // If rangeValue is a string, format it accordingly
      formattedRangeValue = rangeValue.replace(/\s+/g, '').replace(/,/g, ', ');
    } else {
      // Handle any other unexpected type for rangeValue
      formattedRangeValue = '';
    }

    if (!rangeValue) {
      setStoresList(data?.storeRatings);
      setIsDataLoaded(true);
    } else {
      getFilteredData({ filterType: formattedRangeValue, rangeValue })
        .unwrap()
        .then((res) => {
          setStoresList(res?.filteredStoresRatings);
          setIsDataLoaded(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, rangeValue]);
  return (
    <Stack gap={2} mt={2}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
          <CircularProgress />
        </Box>
      ) : isDataLoaded && storesList?.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
          <Typography textAlign="center" fontSize={16} fontWeight={500}>
            No store found.
          </Typography>
        </Box>
      ) : (
        storesList?.map((item, index) => (
          <Fragment key={index}>
            <ChartDisplayCard store={item} index={index} />
          </Fragment>
        ))
      )}
    </Stack>
  );
};

export default ChartDisplay;
