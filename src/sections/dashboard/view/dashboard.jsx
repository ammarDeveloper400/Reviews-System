// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Grid, Select, MenuItem } from '@mui/material';

// import Iconify from 'src/components/iconify';

import dayjs from 'dayjs';
import { toast } from 'react-toastify';
// import AppTasks from '../app-tasks';
import { useState, useEffect } from 'react';

// import AppNewsUpdate from '../app-news-update';
import { useGetStoresListQuery } from 'src/services/manage-stores';
import {
  useGetUserProfileQuery,
  useUpdateSelectedStoreMutation,
} from 'src/services/profile/profile-api';
import {
  useGetDashboardAvgScoreQuery,
  useGetDashboardCommentsQuery,
  useGetDashboardLastActiveQuery,
  useGetDashboardRatingsSubmittedQuery,
} from 'src/services/dashboard-stats';

import AppOverallScore from '../app-overall-score';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';

// import AppConversionRates from '../app-conversion-rates';
import AppStaffPerformance from '../app-staff-performance';
import AppCustomerComments from '../app-customer-comments';
import AppCustomerExperience from '../app-customer-experience';

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

export default function AppView() {
  const { data: userProfile } = useGetUserProfileQuery();
  const [selectedStore, setSelectedStore] = useState(userProfile?.user?.selectedStore?._id || ' ');
  const [submittedRatingsFilterValue, setSubmittedRatingsFilterValue] = useState('daily');
  const [commentsFilterValue, setCommentsFilterValue] = useState('daily');

  const [avgScoreFilterValue, setAvgScoreFilterValue] = useState('daily');
  const { data: storesList } = useGetStoresListQuery();
  const [updateSelectedStore] = useUpdateSelectedStoreMutation();

  // Build store options
  const storesListOptions = storesList?.stores?.map((store) => ({
    value: store?._id,
    label: store?.name,
  }));

  // Fetch data conditionally based on selectedStore
  const { data: lastActiveDetails, isLoading: lastActiveLoading } = useGetDashboardLastActiveQuery({
    storeId: selectedStore,
  });

  const { data: avgScoreDetails, isLoading: avgScoreLoading } = useGetDashboardAvgScoreQuery({
    storeId: selectedStore,
    filterType: avgScoreFilterValue,
  });

  const { data: submittedRatings, isLoading: submittedRatingsLoading } =
    useGetDashboardRatingsSubmittedQuery({
      storeId: selectedStore,
      filterType: submittedRatingsFilterValue,
    });

  const { data: totalComments, isLoading: totalCommentsLoading } = useGetDashboardCommentsQuery({
    storeId: selectedStore,
    filterType: commentsFilterValue,
  });

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
          Snapshot for{' '}
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
              {store?.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={
              lastActiveDetails?.lastRating?.date
                ? dayjs(lastActiveDetails?.lastRating?.date)?.format('h:mma dddd D MMM')
                : '--'
            }
            subTitle="Most Recently Rated in-store"
            icon={<img alt="icon" src="/assets/icons/store-finger-tap.svg" />}
            hasFilter={false}
            headingFontSize={13}
            isLoading={lastActiveLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={submittedRatings?.totalRatings ?? '--'}
            subTitle="In-store Ratings"
            icon={<img alt="icon" src="/assets/icons/rating-submitted-icon.svg" />}
            hasFilter
            headingFontSize={18}
            setFilterValue={setSubmittedRatingsFilterValue}
            filterValue={submittedRatingsFilterValue}
            isLoading={submittedRatingsLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={totalComments?.totalRatings ?? '--'}
            subTitle="QR Code Ratings"
            icon={<img alt="icon" src="/assets/icons/clarity_cursor-hand-click-line.svg" />}
            hasFilter
            headingFontSize={18}
            setFilterValue={setCommentsFilterValue}
            filterValue={commentsFilterValue}
            isLoading={totalCommentsLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={avgScoreDetails?.averageRating ?? '--'}
            subTitle="Average Score"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M7.86726 12.6887C7.64109 12.5452 7.3575 12.5453 7.13134 12.6888L3.66276 14.8898C3.12514 15.231 2.46052 14.7262 2.60338 14.0852L3.52296 9.95938C3.5827 9.69134 3.49608 9.41069 3.29782 9.22993L0.244697 6.44628C-0.228228 6.0151 0.0260092 5.20066 0.650878 5.14511L4.67445 4.78739C4.93646 4.7641 5.16471 4.59109 5.26766 4.33777L6.84671 0.452286C7.09179 -0.150763 7.90821 -0.150762 8.15329 0.452287L9.73234 4.33777C9.83529 4.59109 10.0635 4.7641 10.3256 4.78739L14.3491 5.14511C14.974 5.20066 15.2282 6.0151 14.7553 6.44628L11.7022 9.22993C11.5039 9.41069 11.4173 9.69134 11.477 9.95938L12.3967 14.0855C12.5395 14.7265 11.875 15.2312 11.3374 14.8901L7.86726 12.6887Z"
                  fill="#FFC500"
                />
              </svg>
            }
            hasFilter
            headingFontSize={18}
            setFilterValue={setAvgScoreFilterValue}
            filterValue={avgScoreFilterValue}
            isLoading={avgScoreLoading}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3.5} mt={0.01}>
        <Grid item xs={12} md={6} lg={7}>
          <AppStaffPerformance storeId={selectedStore} />
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <AppOverallScore storeId={selectedStore} />
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <AppCustomerComments storeId={selectedStore} />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <AppCustomerExperience storeId={selectedStore} />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
