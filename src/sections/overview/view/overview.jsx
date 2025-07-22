/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Grid, Select, MenuItem } from '@mui/material';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';

// import AppOverallScore from '../app-overall-score';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

// import AppConversionRates from '../app-conversion-rates';
import { useGetStoresListQuery } from 'src/services/manage-stores';
import { useGetOverviewDetailsQuery, useGetGraphOverviewDetailsQuery } from 'src/services/overview';
import {
  useGetUserProfileQuery,
  useUpdateSelectedStoreMutation,
} from 'src/services/profile/profile-api';

// import AppStaffPerformance from '../app-staff-performance';
import RatingsChart from '../ratings-graph';
// import AverageScoresCard from '../average-score-card';
// import AppCustomerComments from '../app-customer-comments';
import ReviewCardsWrapper from '../review-cards-wrapper';
import SelectTimelineCard from '../select-timeline-card';
// import AppCustomerExperience from '../app-customer-experience';
// import SubmittedRatingsCard from '../submitted-ratings-card';

// ----------------------------------------------------------------------

const MenuProps = {
  PaperProps: {
    style: {
      background: '#E1F296',
      color: '#000',
      boxShadow: 'none',
      borderRadius: '10px',
    },
  },
};

export default function Overview() {
  const durations = {
    day: 'daily',
    weeks: 'weekly',
    months: 'monthly',
    annual: 'annual',
    custom: 'custom',
  };

  const [timeLine, setTimeLine] = useState('day');

  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const [durationValue, setDurationValue] = useState(new Date());

  const handleSelect = (dateValue, duration) => {
    setTimeLine(duration);

    if (duration === 'custom' || duration === 'weeks') {
      // Use dayjs to format the dates consistently as 'MM/DD/YYYY'
      const formattedValue = dateValue.map((date) => dayjs(date?.toDate()).format('MM/DD/YYYY'));
      setDateRange({ start: formattedValue[0], end: formattedValue[1] });
    } else {
      setDurationValue(dateValue?.toDate()); // Save the date object for later processing
    }
  };

  const { data: userProfile } = useGetUserProfileQuery();
  const [selectedStore, setSelectedStore] = useState(userProfile?.user?.selectedStore?._id || ' ');

  const [updateSelectedStore] = useUpdateSelectedStoreMutation();

  const buildFilters = () => {
    const filters = {};

    if (selectedStore !== ' ') {
      filters.storeId = selectedStore;
    }
    // Add period (timeline) filter
    if (timeLine) {
      filters.period = durations[timeLine] ?? '';
    }

    // Handle custom or weeks date range
    if (timeLine === 'custom' || timeLine === 'weeks') {
      filters.startDate = dayjs(dateRange.start).format('MM/DD/YYYY'); // Use consistent format
      filters.endDate = dayjs(dateRange.end).format('MM/DD/YYYY'); // Use consistent format
    }
    // Handle annual selection
    else if (timeLine === 'annual') {
      filters.year = durationValue?.getFullYear(); // Extract year correctly
    }
    // Handle months selection
    else if (timeLine === 'months') {
      filters.month = durationValue?.getMonth() + 1; // Get month (1-12)
      filters.year = durationValue?.getFullYear(); // Get year
    }
    // Handle day selection
    else if (timeLine === 'day') {
      filters.startDate = dayjs(durationValue).format('MM/DD/YYYY'); // Consistent date format
    }

    return filters;
  };

  const {
    data: graphData,
    isLoading: graphDataLoading,
    isFetching: graphDataIsFetching,
  } = useGetGraphOverviewDetailsQuery(buildFilters());

  const { data, isLoading, isFetching } = useGetOverviewDetailsQuery({ storeId: selectedStore });

  const { data: storesList } = useGetStoresListQuery();

  const storesListOptions = storesList?.stores?.map((store) => ({
    value: store?._id,
    label: store?.name,
  }));

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

  return (
    <Container maxWidth="xl">
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2.5}>
        <Typography variant="h4" fontWeight={600}>
          Overview for{' '}
          {userProfile?.user?.selectedStore ? userProfile?.user?.selectedStore?.name : 'All Stores'}
        </Typography>
        <Select
          id="sorting"
          type="text"
          value={selectedStore}
          name="sorting"
          onChange={(e) => {
            setSelectedStore(e.target.value);
            handleUpdateSelectedStore(e);
          }}
          MenuProps={MenuProps}
          IconComponent={(props) => (
            <svg
              {...props}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
            >
              <path
                d="M15.6478 0.34416C15.4222 0.123795 15.1163 8.76423e-07 14.7974 8.48538e-07C14.4784 8.20654e-07 14.1725 0.123795 13.947 0.34416L7.99274 6.16269L2.03852 0.344159C1.81166 0.13004 1.50781 0.0115601 1.19242 0.014238C0.87703 0.0169159 0.575334 0.140538 0.352313 0.358478C0.12929 0.576417 0.00278639 0.871238 4.64601e-05 1.17944C-0.00269443 1.48764 0.118548 1.78457 0.33766 2.00626L7.14231 8.65584C7.36788 8.87621 7.67378 9 7.99274 9C8.3117 9 8.6176 8.87621 8.84317 8.65584L15.6478 2.00626C15.8733 1.78583 16 1.4869 16 1.17521C16 0.863521 15.8733 0.564591 15.6478 0.34416Z"
                fill="black"
              />
            </svg>
          )}
          sx={{
            color: '#000',
            height: '44px',
            borderWidth: '1px',
            fontSize: '15px',
            borderRadius: '30px',
            background: '#E1F296',
            minWidth: '180px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: `#0000004D`,
            },
            '& fieldset': {
              borderWidth: '1px',
            },
            '& .MuiSelect-icon': {
              top: '18px',
              right: '14px',
            },
          }}
        >
          <MenuItem value=" ">All Stores</MenuItem>
          {storesListOptions?.map((store) => (
            <MenuItem key={store?.value} value={store?.value}>
              {store.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6} md={3}>
          <SubmittedRatingsCard
            isLoading={isLoading || isFetching}
            title={data?.overview?.today?.totalRatings ?? '--'}
            subTitle="Ratings submitted today"
            icon={
              <svg
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.120117" width="23.4336" height="26.7592" rx="4" fill="#EFF7F9" />
                <path
                  d="M17.3339 13.2959C16.5839 12.5043 15.5839 11.9626 14.5422 11.7543C14.0839 11.6293 13.6256 11.5459 13.1672 11.5043C14.3339 10.1293 14.1256 8.04594 12.7506 6.87927C11.3756 5.7126 9.29222 5.92094 8.12556 7.29594C6.95889 8.67094 7.16722 10.7543 8.54222 11.9209C8.79222 12.1293 9.04222 12.2959 9.29222 12.3793V13.2959L8.62556 12.6709C8.04222 12.0876 7.08389 12.0876 6.45889 12.6709C5.87556 13.2543 5.83389 14.1709 6.41722 14.7543L8.33389 17.0043C8.41722 17.5876 8.62556 18.1293 8.91722 18.6293C9.12556 19.0043 9.41722 19.3793 9.70889 19.6709V20.4626C9.70889 20.7126 9.87556 20.8793 10.1256 20.8793H15.7922C16.0006 20.8793 16.2089 20.6709 16.2089 20.4626V19.3793C17.0006 18.4209 17.4172 17.2126 17.4172 16.0043V13.5876C17.4589 13.4209 17.4172 13.3376 17.3339 13.2959ZM8.16722 9.37927C8.16722 8.00427 9.29222 6.92094 10.6672 6.9626C12.0422 6.9626 13.1256 8.0876 13.0839 9.4626C13.0839 10.2126 12.7506 10.8793 12.1672 11.3376V9.25427C12.1459 8.89317 11.9873 8.55389 11.7239 8.30598C11.4605 8.05807 11.1123 7.92031 10.7506 7.92094C10.0006 7.87927 9.33389 8.50427 9.33389 9.25427V11.4209C8.62556 11.0043 8.20889 10.2126 8.16722 9.37927ZM16.6256 15.9626C16.6672 17.0459 16.2922 18.0876 15.5839 18.9209C15.5006 19.0043 15.4172 19.0876 15.4172 19.2126V20.0876H10.5839V19.5043C10.5839 19.3793 10.5006 19.2543 10.4172 19.1709C10.1256 18.9209 9.87556 18.6293 9.66722 18.2543C9.41722 17.8376 9.25056 17.3376 9.16722 16.8376C9.16722 16.7543 9.12556 16.6709 9.08389 16.5876L7.08389 14.2126C6.95889 14.0876 6.87556 13.9209 6.87556 13.7126C6.87556 13.5459 6.95889 13.3376 7.08389 13.2126C7.37556 12.9626 7.79222 12.9626 8.08389 13.2126L9.29222 14.4209V15.6709L10.0839 15.2543V9.25427C10.1256 8.9626 10.3756 8.7126 10.7089 8.75427C11.0006 8.75427 11.2922 8.9626 11.2922 9.25427V14.0459L12.1256 14.2126V12.2959C12.1672 12.2543 12.2089 12.2543 12.2506 12.2126C12.5422 12.2126 12.8339 12.2543 13.1256 12.2959V14.4209L13.7922 14.5459V12.3793L14.2922 12.5043C14.5006 12.5459 14.7089 12.6293 14.9172 12.7126V14.7959L15.5839 14.9209V13.0043C15.9589 13.1709 16.2922 13.4209 16.5839 13.7126L16.6256 15.9626Z"
                  fill="black"
                />
              </svg>
            }
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
          <AverageScoresCard
            isLoading={isLoading || isFetching}
            title="Average score today"
            rating={data?.overview?.today?.averageRating ?? '--'}
            subTitle={`Based on ${data?.overview?.today?.totalRatings} Ratings`}
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
          <SubmittedRatingsCard
            isLoading={isLoading || isFetching}
            title={data?.overview?.week?.totalRatings ?? '--'}
            subTitle="Ratings submitted this week"
            icon={
              <svg
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.120117" width="23.4336" height="26.7592" rx="4" fill="#EFF7F9" />
                <path
                  d="M17.3339 13.2959C16.5839 12.5043 15.5839 11.9626 14.5422 11.7543C14.0839 11.6293 13.6256 11.5459 13.1672 11.5043C14.3339 10.1293 14.1256 8.04594 12.7506 6.87927C11.3756 5.7126 9.29222 5.92094 8.12556 7.29594C6.95889 8.67094 7.16722 10.7543 8.54222 11.9209C8.79222 12.1293 9.04222 12.2959 9.29222 12.3793V13.2959L8.62556 12.6709C8.04222 12.0876 7.08389 12.0876 6.45889 12.6709C5.87556 13.2543 5.83389 14.1709 6.41722 14.7543L8.33389 17.0043C8.41722 17.5876 8.62556 18.1293 8.91722 18.6293C9.12556 19.0043 9.41722 19.3793 9.70889 19.6709V20.4626C9.70889 20.7126 9.87556 20.8793 10.1256 20.8793H15.7922C16.0006 20.8793 16.2089 20.6709 16.2089 20.4626V19.3793C17.0006 18.4209 17.4172 17.2126 17.4172 16.0043V13.5876C17.4589 13.4209 17.4172 13.3376 17.3339 13.2959ZM8.16722 9.37927C8.16722 8.00427 9.29222 6.92094 10.6672 6.9626C12.0422 6.9626 13.1256 8.0876 13.0839 9.4626C13.0839 10.2126 12.7506 10.8793 12.1672 11.3376V9.25427C12.1459 8.89317 11.9873 8.55389 11.7239 8.30598C11.4605 8.05807 11.1123 7.92031 10.7506 7.92094C10.0006 7.87927 9.33389 8.50427 9.33389 9.25427V11.4209C8.62556 11.0043 8.20889 10.2126 8.16722 9.37927ZM16.6256 15.9626C16.6672 17.0459 16.2922 18.0876 15.5839 18.9209C15.5006 19.0043 15.4172 19.0876 15.4172 19.2126V20.0876H10.5839V19.5043C10.5839 19.3793 10.5006 19.2543 10.4172 19.1709C10.1256 18.9209 9.87556 18.6293 9.66722 18.2543C9.41722 17.8376 9.25056 17.3376 9.16722 16.8376C9.16722 16.7543 9.12556 16.6709 9.08389 16.5876L7.08389 14.2126C6.95889 14.0876 6.87556 13.9209 6.87556 13.7126C6.87556 13.5459 6.95889 13.3376 7.08389 13.2126C7.37556 12.9626 7.79222 12.9626 8.08389 13.2126L9.29222 14.4209V15.6709L10.0839 15.2543V9.25427C10.1256 8.9626 10.3756 8.7126 10.7089 8.75427C11.0006 8.75427 11.2922 8.9626 11.2922 9.25427V14.0459L12.1256 14.2126V12.2959C12.1672 12.2543 12.2089 12.2543 12.2506 12.2126C12.5422 12.2126 12.8339 12.2543 13.1256 12.2959V14.4209L13.7922 14.5459V12.3793L14.2922 12.5043C14.5006 12.5459 14.7089 12.6293 14.9172 12.7126V14.7959L15.5839 14.9209V13.0043C15.9589 13.1709 16.2922 13.4209 16.5839 13.7126L16.6256 15.9626Z"
                  fill="black"
                />
              </svg>
            }
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
          <AverageScoresCard
            isLoading={isLoading || isFetching}
            title="Average score this week"
            rating={data?.overview?.week?.averageRating ?? '--'}
            subTitle={`Based on ${data?.overview?.week?.totalRatings} Ratings`}
          />
        </Grid> */}
      </Grid>
      <Box width={1} mt={2.5}>
        <ReviewCardsWrapper isLoading={isLoading || isFetching} data={data?.overview} />
      </Box>
      <Grid container spacing={2.5} mt={0.01}>
        <Grid item xs={12} sm={8} md={9.5}>
          <RatingsChart
            data={graphData?.data}
            isLoading={graphDataLoading}
            isFetching={graphDataIsFetching}
            duration={timeLine}
            dateRange={dateRange}
            durationValue={durationValue}
            ratings={graphData?.ratings}
            storeId={selectedStore}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={2.5}>
          <SelectTimelineCard onSelect={handleSelect} />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={5}>
          <AppOverallScore />
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <AppCustomerComments />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <AppCustomerExperience />
        </Grid> */}
      </Grid>
    </Container>
  );
}
