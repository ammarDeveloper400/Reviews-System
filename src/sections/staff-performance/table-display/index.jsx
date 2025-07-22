/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Rating, Typography } from '@mui/material';

import { getOrdinalSuffix } from 'src/utils/functions';

import {
  useGetStaffTableDataQuery,
  useLazyGetStaffFilteredTableDataQuery,
} from 'src/services/staff-performance';

import Iconify from 'src/components/iconify';
import GlobalTable from 'src/components/custom-table/table';

const TableDisplay = ({ rangeValue, storeId }) => {
  const { data, isLoading } = useGetStaffTableDataQuery();
  const [getFilteredData] = useLazyGetStaffFilteredTableDataQuery();
  const [staffsList, setStaffsList] = React.useState([]);

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
      setStaffsList(data);
    } else {
      getFilteredData({ filterType: formattedRangeValue, rangeValue, storeId })
        .unwrap()
        .then((res) => {
          setStaffsList(res);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, rangeValue, storeId]);

  const columns = [
    {
      id: 'position',
      header: 'Position',
      render: (_, index) => getOrdinalSuffix(index + 1),
    },
    {
      id: 'name',
      header: 'Name',
      render: ({ staff }) => (
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
          <img
            width={60}
            height={60}
            style={{ objectFit: 'cover', borderRadius: '40px', marginRight: '10px' }}
            src={staff?.image}
            alt={staff?.name}
          />{' '}
          <Typography sx={{ fontSize: '14px' }}>{staff?.name}</Typography>
        </Box>
      ),
    },
    {
      id: 'storeName',
      header: 'Store Name',
      render: ({ store }) => store?.name,
    },
    {
      id: 'ratingsSubmitted',
      header: 'Ratings Submitted',
      render: ({ totalRating }) => totalRating,
    },
    {
      id: 'score',
      header: 'Score',
      render: ({ score }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating
            sx={{ fontSize: 16 }}
            readOnly
            size="small"
            name="half-rating"
            value={score}
            precision={0.25}
            emptyIcon={
              <Iconify
                sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                icon="material-symbols:star"
              />
            }
          />
          <Typography sx={{ fontSize: '14px' }}>{score?.toFixed(2)}</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <GlobalTable data={staffsList && staffsList} columns={columns} isLoading={isLoading} />
    </Box>
  );
};

export default TableDisplay;
