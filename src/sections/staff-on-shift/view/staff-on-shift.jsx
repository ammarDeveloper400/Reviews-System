/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
// import { faker } from '@faker-js/faker';

import { toast } from 'react-toastify';
import { Fragment, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, CircularProgress } from '@mui/material';

import { useGetStoresListQuery } from 'src/services/manage-stores';
import {
  useGetUserProfileQuery,
  useUpdateSelectedStoreMutation,
} from 'src/services/profile/profile-api';
import {
  useLazyGetStaffOnShiftListQuery,
  useLazyGetStaffOnShiftByStoreQuery,
} from 'src/services/staff-on-shift';

import CustomSelect from 'src/components/custom-select/select';

import StaffCard from '../staff-card';

// ----------------------------------------------------------------------

export default function StaffOnShift() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const [staffListUpdated, setStaffListUpdated] = useState(false);

  const [getStaffOnShift, { isLoading, error }] = useLazyGetStaffOnShiftListQuery();

  const { data: storesList } = useGetStoresListQuery();
  const [getStaffMembersByStoreId, { isLoading: getStaffMembersByStoreIdLoading }] =
    useLazyGetStaffOnShiftByStoreQuery();

  const storesListOptions = storesList?.stores?.map((store) => ({
    value: store?._id,
    label: store?.name,
  }));

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
    const fetchStaffData = async () => {
      setIsDataLoaded(false);
      try {
        if (selectedStore === ' ') {
          const res = await getStaffOnShift().unwrap();
          setStaffList(res?.staffOnShift || []);
        } else {
          const res = await getStaffMembersByStoreId({ id: selectedStore }).unwrap();
          setStaffList(res?.staffOnShift || []);
        }
        setIsDataLoaded(true);
      } catch (err) {
        console.error('Error fetching staff data', err);
        setIsDataLoaded(true); // You can still set it to true in case of an error.
      }
    };

    fetchStaffData();
  }, [selectedStore, staffListUpdated]); // Only depend on selectedStore

  // const selectStoreOptions = [
  //   { value: 'store-1', label: 'Store 1' },
  //   { value: 'store-2', label: 'Store 2' },
  //   { value: 'store-3', label: 'Store 3' },
  // ];
  // const selectStaffOptions = [
  //   { value: 'staff-1', label: 'Staff 1' },
  //   { value: 'staff-2', label: 'Staff 2' },
  //   { value: 'staff-3', label: 'Staff 3' },
  // ];

  return (
    <Container maxWidth="xl">
      <Box
        display={{ sm: 'flex', md: 'flex', xs: 'block' }}
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
        mb={2.5}
      >
        <Typography variant="h4" fontWeight={600}>
          Staff on shift for{' '}
          {userProfile?.user?.selectedStore ? userProfile?.user?.selectedStore?.name : 'All Stores'}
        </Typography>
        <Box display="flex" mt={{ md: '0px', xs: '10px', sm: '0px' }} gap={1.5} flexWrap="wrap">
          {/* <CustomSelect
            width={260}
            name="select-staff"
            label="All Staff"
            options={selectStaffOptions}
          /> */}
          <CustomSelect
            name="select-store"
            width={190}
            label="All Stores"
            options={storesListOptions}
            value={selectedStore}
            handleChange={(e) => {
              setSelectedStore(e.target.value);
              handleUpdateSelectedStore(e);
            }}
          />
          {/* <CustomSelect name="select-store" label="All Stores" options={selectStoreOptions} /> */}
        </Box>
      </Box>
      <Stack
        spacing={2.5}
        sx={{ maxHeight: 'calc(100vh - 190px)', overflow: 'auto', pr: 2, pb: 2 }}
      >
        {isLoading || getStaffMembersByStoreIdLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
            <CircularProgress />
          </Box>
        ) : (isDataLoaded && staffList?.length === 0) || error?.status === 404 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
            <Typography textAlign="center" fontSize={16} fontWeight={500}>
              No Staff member found.
            </Typography>
          </Box>
        ) : (
          staffList?.map((item) => (
            <Fragment key={item?.id}>
              <StaffCard member={item} setStaffListUpdated={setStaffListUpdated} />
            </Fragment>
          ))
        )}
        {/* {[1, 2, 3, 4, 5, 6].map((item) => (
          <Fragment key={item}>
            <StaffCard />
          </Fragment>
        ))} */}
      </Stack>
    </Container>
  );
}
