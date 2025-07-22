/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';

import { Box, Stack, Typography, CircularProgress } from '@mui/material';

import {
  useGetStaffChartDataQuery,
  useLazyGetStaffFilteredChartDataQuery,
} from 'src/services/staff-performance';

import ChartDisplayCard from './chart-display-card';

const ChartDisplay = ({ rangeValue, storeId }) => {
  const { data, isLoading } = useGetStaffChartDataQuery();
  const [getFilteredData] = useLazyGetStaffFilteredChartDataQuery();
  const [staffsList, setStaffsList] = React.useState([]);
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

    if (!rangeValue && storeId === ' ') {
      setStaffsList(data?.staffRatings);
      setIsDataLoaded(true);
    } else {
      getFilteredData({ filterType: formattedRangeValue, rangeValue, storeId })
        .unwrap()
        .then((res) => {
          setStaffsList(res?.staffRatings);
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
      ) : isDataLoaded && staffsList?.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
          <Typography textAlign="center" fontSize={16} fontWeight={500}>
            No staff found.
          </Typography>
        </Box>
      ) : (
        staffsList?.map((item, index) => (
          <Fragment key={index}>
            <ChartDisplayCard staff={item} index={index} />
          </Fragment>
        ))
      )}
    </Stack>
  );
};

export default ChartDisplay;
