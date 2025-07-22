/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Rating, Typography } from '@mui/material';

import { getOrdinalSuffix } from 'src/utils/functions';

import {
  useGetStoreTableDataQuery,
  useLazyGetStoreFilteredTableDataQuery,
} from 'src/services/store-performance';

import Iconify from 'src/components/iconify';
import GlobalTable from 'src/components/custom-table/table';

const TableDisplay = ({ rangeValue }) => {
  const { data, isLoading } = useGetStoreTableDataQuery();
  const [getFilteredData] = useLazyGetStoreFilteredTableDataQuery();
  const [storesList, setStoresList] = React.useState([]);

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
      setStoresList(data);
    } else {
      getFilteredData({ filterType: formattedRangeValue, rangeValue })
        .unwrap()
        .then((res) => {
          setStoresList(res);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, rangeValue]);

  const columns = [
    {
      id: 'position',
      header: 'Position',
      render: (_, index) => getOrdinalSuffix(index + 1),
    },
    {
      id: 'name',
      header: 'Name',
      render: ({ store }) => (
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
          <Box width={60} height={60}>
            <img
              width="100%"
              height="100%"
              style={{ objectFit: 'cover', borderRadius: '40px', marginRight: '10px' }}
              src={store?.image}
              alt={store?.name}
            />
          </Box>
          <Typography sx={{ fontSize: '14px' }}>{store?.name}</Typography>
        </Box>
      ),
    },
    {
      id: 'address',
      header: 'Address',
      render: ({ store }) => store?.address,
    },
    {
      id: 'ratingsSubmitted',
      header: (<Typography sx={{}}>Ratings Submitted</Typography>),
      render: ({ ratingCount }) => (
        <Box sx={{border:'1px solid lightgreen' , p:1, width:'fit-content', height:'fit-content', textAlign:'center', borderRadius:'30px'}}>

        {ratingCount}
        </Box>
      
      ),
    },
    {
      id: 'score',
      header: 'Score',
      render: ({ averageRating }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Rating
            sx={{ fontSize: 16 }}
            readOnly
            size="small"
            name="half-rating"
            value={averageRating}
            precision={0.25}
            emptyIcon={
              <Iconify
                sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                icon="material-symbols:star"
              />
            }
          />
          <Typography sx={{ fontSize: '14px' }}>{averageRating?.toFixed(2)}</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <GlobalTable data={storesList && storesList} columns={columns} isLoading={isLoading} />
    </Box>
  );
};

export default TableDisplay;
