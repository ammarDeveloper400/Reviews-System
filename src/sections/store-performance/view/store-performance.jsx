/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Chip, Button } from '@mui/material';

import {
  useLazyCompareStoresQuery,
  useLazyGetOverallRatingsAndAverageQuery,
} from 'src/services/store-performance';

// import CustomSelect from 'src/components/custom-select/select';
import SelectStaffModal from 'src/components/select-staff-modal';
import RangeFilters from 'src/components/global-filters/range-filters';

import ChartDisplay from '../chart-display';
import TableDisplay from '../table-display';
import CompareStoresDisplay from '../compare-stores';
import CompareModal from '../compare-stores/compare-modal';

// import StaffCard from '../staff-card';

// ----------------------------------------------------------------------

export default function StorePerformance() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [getOverallRatingsData] = useLazyGetOverallRatingsAndAverageQuery();
  const [overallRatings, setOverallRatings] = useState(null);

  const [compareStores, { isLoading: compareStoresLoading }] = useLazyCompareStoresQuery();
  const [compareStoresData, setCompareStoresData] = useState({});

  const [rangeValue, setRangeValue] = useState(null);
  const [displayType, setDisplayType] = useState(searchParams.get('display_type') || 'table');

  const [openCompareModal, setOpenCompareModal] = useState(false);
  const [openStaffModal, setOpenStaffModal] = useState(false);

  const [selectedStores, setSelectedStores] = useState({ store1: ' ', store2: ' ' });

  // const selectStoreOptions = [
  //   { value: 'store-1', label: 'Store 1' },
  //   { value: 'store-2', label: 'Store 2' },
  //   { value: 'store-3', label: 'Store 3' },
  // ];
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const handleSelect = (val) => {
    setRangeValue(val);

    let startDate;
    let endDate;

    if (val === 'Today') {
      startDate = dayjs();
      endDate = dayjs();
    } else if (val === 'Last Week') {
      startDate = dayjs().subtract(7, 'days').startOf('day');
      endDate = dayjs().endOf('day');
    } else if (val === 'This Month') {
      startDate = dayjs().startOf('month');
      endDate = dayjs().endOf('month');
    } else if (Array.isArray(val)) {
      // Assuming the format of the dates in val is MM/DD/YYYY
      startDate = dayjs(val[0], 'M/D/YYYY');
      endDate = val[1] && dayjs(val[1], 'M/D/YYYY');
    }

    setDateRange({ start: startDate, end: endDate });
  };

  const handleCompareStores = async () => {
    setDisplayType('compare-stores');
    setOpenCompareModal(false);
    try {
      await compareStores({ store1: selectedStores.store1, store2: selectedStores.store2 }).then(
        (data) => setCompareStoresData(data?.data)
      );
    } catch (error) {
      toast.error(error?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    const displayTypeParam = searchParams.get('display_type');
    if (displayTypeParam) {
      setDisplayType(displayTypeParam);
    }
  }, [searchParams]);

  useEffect(() => {
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

    getOverallRatingsData({ filterType: formattedRangeValue, rangeValue })
      .unwrap()
      .then((res) => {
        setOverallRatings(res?.overview);
      });
  }, [rangeValue]);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          display={{ md: 'flex', sm: 'flex', xs: 'block' }}
          alignItems="center"
          flexWrap="wrap"
          gap={1}
          justifyContent="space-between"
          mb={{ md: 2.5, xs: 1 }}
        >
          <Typography variant="h4" fontWeight={600}>
            Store League Table
          </Typography>
          <Box display="flex" mt={{ md: '0px', sm: '0px', xs: '10px' }} gap={0.8} flexWrap="wrap">
            {displayType !== 'table' && (
              <Button
                onClick={() => setOpenCompareModal(true)}
                variant="contained"
                sx={{ fontSize: 14, fontWeight: 300, height: 36, px: 4, borderRadius: '10px' }}
              >
                Compare Stores
              </Button>
            )}
            <Button
              variant="contained"
              LinkComponent={Link}
              to="/settings-and-notifications"
              // onClick={() => setOpenStaffModal(true)}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.667 3.33331H3.33366C2.41699 3.33331 1.66699 4.08331 1.66699 4.99998V15C1.66699 15.9166 2.41699 16.6666 3.33366 16.6666H16.667C17.5837 16.6666 18.3337 15.9166 18.3337 15V4.99998C18.3337 4.08331 17.5837 3.33331 16.667 3.33331ZM16.3337 6.87498L10.8837 10.2833C10.342 10.625 9.65866 10.625 9.11699 10.2833L3.66699 6.87498C3.58343 6.82807 3.51026 6.7647 3.4519 6.68869C3.39354 6.61269 3.35121 6.52563 3.32747 6.43279C3.30373 6.33995 3.29908 6.24326 3.31379 6.14857C3.3285 6.05388 3.36227 5.96316 3.41306 5.8819C3.46385 5.80064 3.5306 5.73053 3.60926 5.67581C3.68793 5.62109 3.77688 5.58291 3.87074 5.56356C3.96459 5.54422 4.06139 5.54412 4.15529 5.56327C4.24918 5.58242 4.33821 5.62042 4.41699 5.67498L10.0003 9.16665L15.5837 5.67498C15.6624 5.62042 15.7515 5.58242 15.8454 5.56327C15.9393 5.54412 16.0361 5.54422 16.1299 5.56356C16.2238 5.58291 16.3127 5.62109 16.3914 5.67581C16.4701 5.73053 16.5368 5.80064 16.5876 5.8819C16.6384 5.96316 16.6722 6.05388 16.6869 6.14857C16.7016 6.24326 16.6969 6.33995 16.6732 6.43279C16.6494 6.52563 16.6071 6.61269 16.5488 6.68869C16.4904 6.7647 16.4172 6.82807 16.3337 6.87498Z"
                    fill="white"
                  />
                </svg>
              }
              sx={{ fontSize: 14, fontWeight: 300, height: 36, px: 4, borderRadius: '10px' }}
            >
              Send to mail
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
          mb={2.5}
          justifyContent="space-between"
        >
          <Box display="flex" gap={1.5} flexWrap="wrap">
            <Button
              variant={displayType === 'table' ? 'contained' : 'outlined'}
              sx={{ fontSize: 14, fontWeight: 400, height: 36, px: 4, borderRadius: '10px' }}
              onClick={() => setSearchParams({ display_type: 'table' })}
            >
              League Table
            </Button>
            <Button
              variant={
                displayType === 'chart' || displayType === 'compare-stores'
                  ? 'contained'
                  : 'outlined'
              }
              sx={{ fontSize: 14, fontWeight: 400, height: 36, px: 4, borderRadius: '10px' }}
              onClick={() => setSearchParams({ display_type: 'chart' })}
            >
              League Table Analysed
            </Button>
          </Box>
          {/* <Box display="flex" gap={1.5} flexWrap="wrap">
            <CustomSelect
              width={260}
              name="select-store"
              label="All Stores"
              options={selectStoreOptions}
            />
          </Box> */}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
          mb={1}
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={1.5} mb={1}>
            <Typography bgcolor="#fff" p={{ md: '5px 30px', xs: '5px 14px' }} borderRadius="5px">
              {dateRange.start
                ? rangeValue === 'Today'
                  ? `12:01 AM ${dateRange.start.format('ddd D MMM')}`
                  : dateRange.start.format('ddd D MMM ')
                : '-'}
            </Typography>
            <Typography>to</Typography>
            <Typography bgcolor="#fff" p={{ md: '5px 30px', xs: '5px 14px' }} borderRadius="5px">
              {dateRange.end
                ? rangeValue === 'Today'
                  ? `11:59 PM ${dateRange.end.format('ddd D MMM ')}`
                  : dateRange.end.format('ddd D MMM')
                : '-'}
            </Typography>
          </Box>
          {/* Date Range Filter */}

          <RangeFilters
            options={['Today', 'Last Week', 'This Month', 'Custom']}
            onSelect={handleSelect}
          />
        </Box>
        {displayType === 'table' && <TableDisplay dateRange={dateRange} rangeValue={rangeValue} />}
        {displayType === 'chart' && <ChartDisplay dateRange={dateRange} rangeValue={rangeValue} />}
        {displayType === 'compare-stores' && (
          <CompareStoresDisplay
            compareStoresData={compareStoresData}
            isLoading={compareStoresLoading}
          />
        )}
        {displayType !== 'compare-stores' && (
          <Box
            position="fixed"
            bottom={12}
            right={{ md: 40, xs: '10px' }}
            display="flex"
            alignItems="center"
            justifyContent="end"
            mt={3}
            flexWrap="wrap"
            gap={{ xs: 1, md: 2 }}
          >
            <Chip
              sx={{
                bgcolor: '#01565A',
                height: '48px',
                borderRadius: '40px',
                '& .MuiChip-label': { pr: 1, pl: 2 },
              }}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontSize={14} color="#fff">
                    Total Ratings Submitted
                  </Typography>
                  <Box
                    width={32}
                    height={32}
                    fontSize={14}
                    bgcolor="#fff"
                    borderRadius={30}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {overallRatings?.totalRatingCount}
                  </Box>
                </Box>
              }
            />
            <Chip
              sx={{
                bgcolor: '#01565A',
                height: '48px',
                borderRadius: '40px',
                '& .MuiChip-label': { pr: 1, pl: 2 },
              }}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontSize={14} color="#fff">
                    Average score
                  </Typography>
                  <Box
                    width={32}
                    height={32}
                    fontSize={14}
                    bgcolor="#fff"
                    borderRadius={30}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {Number(overallRatings?.overallAverageRating)?.toFixed(1)}
                  </Box>
                </Box>
              }
            />
          </Box>
        )}
      </Container>
      {openCompareModal && (
        <CompareModal
          open={openCompareModal}
          setOpen={setOpenCompareModal}
          selectedStores={selectedStores}
          setSelectedStores={setSelectedStores}
          handleConfirm={handleCompareStores}
        />
      )}
      {openStaffModal && (
        <SelectStaffModal open={openStaffModal} setOpen={setOpenStaffModal} showAutomateSettings />
      )}
    </>
  );
}
