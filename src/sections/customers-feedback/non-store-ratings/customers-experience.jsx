/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';

import { Box, Rating, IconButton, Typography } from '@mui/material';

import { useGetNonStoreCustomerExperienceQuery } from 'src/services/customer-feedback';

import Iconify from 'src/components/iconify';
import GlobalTable from 'src/components/custom-table/table';

const CustomersExperience = ({ rangeValue, storeId }) => {
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

  const { data, isLoading } = useGetNonStoreCustomerExperienceQuery({
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
      id: 'Email',
      header: 'Email/Phone number',
      render: ({ email, phone }) => (
        <Box>
          <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box display="flex" alignItems="center">
              <Typography minWidth={200} fontSize={12}>
                {email ?? '--'}
              </Typography>
              <IconButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M11.667 2.33325H2.33366C1.69199 2.33325 1.17283 2.85825 1.17283 3.49992L1.16699 10.4999C1.16699 11.1416 1.69199 11.6666 2.33366 11.6666H11.667C12.3087 11.6666 12.8337 11.1416 12.8337 10.4999V3.49992C12.8337 2.85825 12.3087 2.33325 11.667 2.33325ZM11.4337 4.81242L7.30949 7.39075C7.12283 7.50742 6.87783 7.50742 6.69116 7.39075L2.56699 4.81242C2.5085 4.77958 2.45728 4.73522 2.41643 4.68202C2.37558 4.62881 2.34595 4.56787 2.32933 4.50288C2.31271 4.4379 2.30945 4.37021 2.31975 4.30393C2.33005 4.23765 2.35369 4.17414 2.38924 4.11726C2.42479 4.06038 2.47151 4.0113 2.52658 3.973C2.58165 3.9347 2.64392 3.90797 2.70961 3.89443C2.77531 3.88089 2.84307 3.88082 2.9088 3.89422C2.97452 3.90763 3.03685 3.93423 3.09199 3.97242L7.00033 6.41658L10.9087 3.97242C10.9638 3.93423 11.0261 3.90763 11.0919 3.89422C11.1576 3.88082 11.2253 3.88089 11.291 3.89443C11.3567 3.90797 11.419 3.9347 11.4741 3.973C11.5291 4.0113 11.5759 4.06038 11.6114 4.11726C11.647 4.17414 11.6706 4.23765 11.6809 4.30393C11.6912 4.37021 11.6879 4.4379 11.6713 4.50288C11.6547 4.56787 11.6251 4.62881 11.5842 4.68202C11.5434 4.73522 11.4922 4.77958 11.4337 4.81242Z"
                    fill="#01565A"
                  />
                </svg>
              </IconButton>
            </Box>
          </a>
          <a href={`tel:${phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box display="flex" alignItems="center">
              <Typography minWidth={200} fontSize={12}>
                {phone ?? '--'}
              </Typography>
              <IconButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3.84961 6.64832C3.84961 5.05815 3.84961 4.26307 4.34136 3.76899C4.83369 3.2749 5.62528 3.2749 7.20961 3.2749H8.88961C10.4734 3.2749 11.2655 3.2749 11.7573 3.76899C12.2496 4.26307 12.2496 5.05815 12.2496 6.64832V9.45999C12.2496 11.0502 12.2496 11.8452 11.7573 12.3393C11.2655 12.8334 10.4734 12.8334 8.88961 12.8334H7.20961C5.62528 12.8334 4.83369 12.8334 4.34136 12.3393C3.84903 11.8452 3.84961 11.0502 3.84961 9.45999V6.64832Z"
                    fill="#01565A"
                  />
                  <path
                    opacity="0.5"
                    d="M2.43367 1.85041C1.75 2.5335 1.75 3.63366 1.75 5.83342V7.00008C1.75 9.19983 1.75 10.3 2.43367 10.9831C2.79358 11.3436 3.26958 11.5139 3.962 11.5944C3.85 11.1044 3.85 10.4301 3.85 9.45942V6.64833C3.85 5.05817 3.85 4.26308 4.34175 3.769C4.83408 3.27491 5.62567 3.27491 7.21 3.27491H8.89C9.85367 3.27491 10.5233 3.27491 11.0122 3.38575C10.9317 2.68983 10.7613 2.21208 10.3997 1.85041C9.71658 1.16675 8.61642 1.16675 6.41667 1.16675C4.21692 1.16675 3.11675 1.16675 2.43367 1.85041Z"
                    fill="#01565A"
                  />
                </svg>
              </IconButton>
            </Box>
          </a>
        </Box>
      ),
    },
    {
      id: 'comment',
      header: 'Written Feedback',
      render: ({ comments }) => (
        <Typography minWidth={200} fontSize={12}>
          {comments}
        </Typography>
      ),
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

export default CustomersExperience;
