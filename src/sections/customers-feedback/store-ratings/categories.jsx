/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';

import { Box, Rating, Typography } from '@mui/material';

import { useGetStoreCustomerExperienceQuery } from 'src/services/customer-feedback';

import Iconify from 'src/components/iconify';
import GlobalTable from 'src/components/custom-table/table';

const CategoriesReviews = ({ rangeValue, storeId }) => {
  const getFormattedRangeValue = (value) => {
    if (Array.isArray(value) && value.length === 2) {
      // When value is an array with exactly 2 elements, it's for a custom date range
      return 'Custom';
    }
    if (typeof value === 'string') {
      // If value is a string, format it accordingly
      return value.replace(/\s+/g, '').replace(/,/g, ', ');
    }
    // Handle any other unexpected type for value
    return '';
  };

  const { data, isLoading } = useGetStoreCustomerExperienceQuery({
    filterType: getFormattedRangeValue(rangeValue),
    storeId,
    rangeValue,
  });

  const columns = [
    {
      id: 'name',
      header: 'Experience',
      render: ({ customerExperienceID }) => (
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
          <img
            width={60}
            height={60}
            style={{ objectFit: 'cover', borderRadius: '40px', marginRight: '10px' }}
            src={customerExperienceID?.image}
            alt={customerExperienceID?.name}
          />{' '}
          <Typography sx={{ fontSize: '14px' }}>{customerExperienceID?.name}</Typography>
        </Box>
      ),
    },
    {
      id: 'store_name',
      header: 'Store',
      render: ({ store }) => <Typography fontSize={14}>{store?.name}</Typography>,
    },
    {
      id: 'date',
      header: 'Date',
      render: ({ date }) => dayjs(date)?.format('h:mm a, ddd, DD MMM'),
    },
    {
      id: 'rating',
      header: 'Rating',
      render: ({ rating }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating
            sx={{ fontSize: 16 }}
            readOnly
            size="small"
            name="half-rating"
            value={rating}
            precision={0.25}
            emptyIcon={
              <Iconify
                sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                icon="material-symbols:star"
              />
            }
          />
          <Typography sx={{ fontSize: '14px' }}>{rating?.toFixed(1)}</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <GlobalTable data={data && data} isLoading={isLoading} columns={columns} />
    </Box>
  );
};

export default CategoriesReviews;
