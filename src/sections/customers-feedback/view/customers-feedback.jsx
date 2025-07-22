/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Radio, Button, RadioGroup, FormControl, FormControlLabel } from '@mui/material';

import { useGetStoresListQuery } from 'src/services/manage-stores';
import {
  useGetUserProfileQuery,
  useUpdateSelectedStoreMutation,
} from 'src/services/profile/profile-api';

import Iconify from 'src/components/iconify';
import CustomSelect from 'src/components/custom-select/select';
import RangeFilters from 'src/components/global-filters/range-filters';

import StoreStaffReviews from '../store-ratings/staff';
import CategoriesReviews from '../store-ratings/categories';
import NonStoreStaffReviews from '../non-store-ratings/staff';
import CustomersExperience from '../non-store-ratings/customers-experience';

// ----------------------------------------------------------------------

export default function CustomersFeedback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rangeValue, setRangeValue] = useState(null);

  // Initial states based on searchParams
  const [displayType, setDisplayType] = useState(searchParams.get('display_type') ?? 'staff');
  const [value, setValue] = useState(searchParams.get('value') ?? 'non-store-ratings');

  const { data: storesList } = useGetStoresListQuery();

  const storesListOptions = storesList?.stores?.map((store) => ({
    value: store?._id,
    label: store?.name,
  }));

  // const handleChange = (event) => {
  //   const newValue = event.target.value;
  //   setValue(newValue);
  //   setSearchParams((prev) => {
  //     const newParams = new URLSearchParams(prev);
  //     newParams.set('value', newValue);
  //     if (newValue === 'store-ratings') {
  //       newParams.set('display_type', 'staff');
  //     } else if (newValue === 'non-store-ratings') {
  //       if (displayType === 'customer-experience') {
  //         newParams.set('display_type', 'categories');
  //       } else {
  //         newParams.set('display_type', 'customer-experience');
  //       }
  //     }
  //     return newParams;
  //   });
  // };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (displayType === 'customer-experience') setDisplayType('categories');
    if (displayType === 'categories') setDisplayType('customer-experience');
  };

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

  // const selectStaffOptions = [
  //   { value: 'staff-1', label: 'Staff 1' },
  //   { value: 'staff-2', label: 'Staff 2' },
  //   { value: 'staff-3', label: 'Staff 3' },
  // ];
  // const selectExperienceOptions = [
  //   { value: 'lights', label: 'Lights' },
  //   { value: 'sitting', label: 'Sitting' },
  //   { value: 'food-quality', label: 'Food Quality' },
  // ];

  const { data: userProfile } = useGetUserProfileQuery();
  const [selectedStore, setSelectedStore] = useState(userProfile?.user?.selectedStore?._id || ' ');

  const [updateSelectedStore] = useUpdateSelectedStoreMutation();

  useEffect(() => {
    if (userProfile?.user?.selectedStore) {
      setSelectedStore(userProfile?.user?.selectedStore?._id);
    } else {
      setSelectedStore(' ');
    }
  }, [userProfile]);

  const handleUpdateSelectedStore = async (e) => {
    try {
      await updateSelectedStore({ id: e.target.value === ' ' ? null : e.target.value }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };
  useEffect(() => {
    const displayTypeParam = searchParams.get('display_type');
    // const valueParam = searchParams.get('value');
    if (displayTypeParam) setDisplayType(displayTypeParam);
    // if (valueParam) setValue(valueParam);
  }, [searchParams]);

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
        mb={{ md: 2, xs: 1 }}
      >
        <Typography variant="h4" fontWeight={600}>
          {displayType === 'staff' && value === 'non-store-ratings'
            ? 'CX Feedback  Timeline'
            : 'Customer’s Feedback'}{' '}
          for{' '}
          {userProfile?.user?.selectedStore ? userProfile?.user?.selectedStore?.name : 'All Stores'}
        </Typography>
      </Box>
      <FormControl sx={{ mb: 2, ml: '6px' }}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="non-store-ratings"
            control={
              <Radio
                sx={{
                  p: '5px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '30px', // Icon size set explicitly
                    width: '30px', // Fix width
                    height: '30px', // Fix height
                  },
                }}
                icon={
                  <Iconify
                    icon="material-symbols:check-circle-outline"
                    width="inherit"
                    height="inherit"
                  />
                } // Unchecked icon
                checkedIcon={
                  <Iconify icon="material-symbols:check-circle" width="20px" height="20px" />
                } // Checked icon
              />
            }
            label={<Typography fontSize={14}>Rated with QR code</Typography>}
          />
          <FormControlLabel
            value="store-ratings"
            control={
              <Radio
                sx={{
                  p: '5px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '30px', // Icon size set explicitly
                    width: '30px', // Fix width
                    height: '30px', // Fix height
                  },
                }}
                icon={
                  <Iconify
                    icon="material-symbols:check-circle-outline"
                    width="inherit"
                    height="inherit"
                  />
                }
                checkedIcon={
                  <Iconify icon="material-symbols:check-circle" width="20px" height="20px" />
                }
              />
            }
            label={<Typography fontSize={14}>Rated in-store</Typography>}
          />
        </RadioGroup>
      </FormControl>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        mb={2}
        justifyContent="space-between"
      >
        <Box display="flex" gap={1.5} flexWrap="wrap">
          <Button
            variant={displayType === 'staff' ? 'contained' : 'outlined'}
            sx={{ fontSize: 14, fontWeight: 400, height: 36, px: 4, borderRadius: '10px' }}
            onClick={() => setSearchParams({ display_type: 'staff', value })}
          >
            Staff
          </Button>
          {value === 'non-store-ratings' ? (
            <Button
              variant={displayType === 'customer-experience' ? 'contained' : 'outlined'}
              sx={{ fontSize: 14, fontWeight: 400, height: 36, px: 4, borderRadius: '10px' }}
              onClick={() => setSearchParams({ display_type: 'customer-experience', value })}
            >
              Experiences
            </Button>
          ) : (
            <Button
              variant={displayType === 'categories' ? 'contained' : 'outlined'}
              sx={{ fontSize: 14, fontWeight: 400, height: 36, px: 4, borderRadius: '10px' }}
              onClick={() => setSearchParams({ display_type: 'categories', value })}
            >
              Categories
            </Button>
          )}
        </Box>
        <Box display="flex" gap={1.5} flexWrap="wrap">
          {/* {displayType === 'staff' ? (
            <CustomSelect
              width={260}
              name="select-staff"
              label="All Staff"
              options={selectStaffOptions}
            />
          ) : (
            <CustomSelect
              width={260}
              name="select-experience"
              label="All Experiences"
              options={selectExperienceOptions}
              value={selectedStore}
              handleChange={(e) => setSelectedStore(e.target.value)}
            />
          )} */}
          <CustomSelect
            name="select-store"
            options={storesListOptions}
            value={selectedStore}
            handleChange={(e) => {
              setSelectedStore(e.target.value);
              handleUpdateSelectedStore(e);
            }}
            label="All Stores"
          />
        </Box>
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
      {value === 'non-store-ratings' ? (
        <>
          {displayType === 'staff' && (
            <NonStoreStaffReviews rangeValue={rangeValue} storeId={selectedStore} />
          )}
          {displayType === 'customer-experience' && (
            <CustomersExperience rangeValue={rangeValue} storeId={selectedStore} />
          )}
        </>
      ) : (
        <>
          {displayType === 'staff' && (
            <StoreStaffReviews rangeValue={rangeValue} storeId={selectedStore} />
          )}
          {displayType === 'categories' && (
            <CategoriesReviews rangeValue={rangeValue} storeId={selectedStore} />
          )}
        </>
      )}
    </Container>
  );
}
