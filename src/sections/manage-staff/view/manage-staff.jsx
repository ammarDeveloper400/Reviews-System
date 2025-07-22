/* eslint-disable no-nested-ternary */
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material';

import { useGetStoresListQuery } from 'src/services/manage-stores';
import {
  useGetUserProfileQuery,
  useUpdateSelectedStoreMutation,
} from 'src/services/profile/profile-api';
import {
  useGetStaffMembersListQuery,
  useLazyGetStaffMembersByStoreQuery,
} from 'src/services/manage-staff';

import CustomSelect from 'src/components/custom-select/select';

import StaffCard from '../staff-card';
import StaffModal from '../staff-member-modal';

export default function ManageStaff() {
  const [open, setOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { data, isLoading, isFetching } = useGetStaffMembersListQuery();
  const { data: storesList } = useGetStoresListQuery();
  const [
    getStaffMembersByStoreId,
    { isLoading: getStaffMembersByStoreIdLoading, isFetching: getStaffMembersByStoreIdIsFetching },
  ] = useLazyGetStaffMembersByStoreQuery();

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
    setIsDataLoaded(false);
    if (selectedStore === ' ') {
      setStaffList(data?.staff);
      setIsDataLoaded(true);
    } else {
      getStaffMembersByStoreId({ id: selectedStore })
        .unwrap()
        .then((res) => {
          setStaffList(res?.staff);
          setIsDataLoaded(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedStore]);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
          mb={2.5}
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight={600}>
            Manage staff for{' '}
            {userProfile?.user?.selectedStore
              ? userProfile?.user?.selectedStore?.name
              : 'All Stores'}
          </Typography>
          <Box display="flex" gap={1.5} flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                px: 2,
                borderRadius: '30px',
                height: '40px',
              }}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M10.5652 21.5652C10.5652 21.9457 10.7164 22.3107 10.9855 22.5798C11.2545 22.8488 11.6195 23 12 23C12.3805 23 12.7455 22.8488 13.0145 22.5798C13.2836 22.3107 13.4348 21.9457 13.4348 21.5652L13.4348 13.4348L21.5652 13.4348C21.9457 13.4348 22.3107 13.2836 22.5798 13.0145C22.8488 12.7455 23 12.3805 23 12C23 11.6195 22.8488 11.2545 22.5798 10.9855C22.3107 10.7164 21.9457 10.5652 21.5652 10.5652L13.4348 10.5652L13.4348 2.43478C13.4348 2.05425 13.2836 1.68931 13.0145 1.42024C12.7455 1.15116 12.3805 0.999999 12 0.999999C11.6195 0.999999 11.2545 1.15116 10.9855 1.42024C10.7164 1.68931 10.5652 2.05425 10.5652 2.43478L10.5652 10.5652L2.43478 10.5652C2.05426 10.5652 1.68931 10.7164 1.42024 10.9855C1.15117 11.2545 1 11.6195 1 12C1 12.3805 1.15117 12.7455 1.42024 13.0145C1.68931 13.2836 2.05426 13.4348 2.43478 13.4348L10.5652 13.4348L10.5652 21.5652Z"
                    fill="white"
                  />
                </svg>
              }
            >
              Add Staff
            </Button>
            <CustomSelect
              name="select-store"
              width={260}
              label="All Stores"
              options={storesListOptions}
              value={selectedStore}
              handleChange={(e) => {
                setSelectedStore(e.target.value);
                handleUpdateSelectedStore(e);
              }}
            />
          </Box>
        </Box>
        <Grid container spacing={4}>
          {isLoading ||
          isFetching ||
          getStaffMembersByStoreIdLoading ||
          getStaffMembersByStoreIdIsFetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
              <CircularProgress />
            </Box>
          ) : isDataLoaded && staffList?.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
              <Typography textAlign="center" fontSize={16} fontWeight={500}>
                No Staff member found.
              </Typography>
            </Box>
          ) : (
            staffList?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item?._id}>
                <StaffCard staffMember={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      {open && (
        <StaffModal
          title="Add Staff Member"
          acceptBtnText="Add"
          open={open}
          setOpen={setOpen}
          staffList={staffList}
        />
      )}
    </>
  );
}
