/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
// import { faker } from '@faker-js/faker';

import { Fragment, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Box, Stack, Button, Typography, CircularProgress } from '@mui/material';
// import Typography from '@mui/material/Typography';

import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

import { useGetStoresListQuery } from 'src/services/manage-stores';
import { useGetRotaStaffMembersListQuery } from 'src/services/rota';
import {
  useGetUserProfileQuery,
  useUpdateSelectedStoreMutation,
} from 'src/services/profile/profile-api';

import CustomSelect from 'src/components/custom-select/select';

import RotaCard from '../rota-card';

// ----------------------------------------------------------------------

export default function Rota() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams?.get('status') ?? 'active');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { data: userProfile } = useGetUserProfileQuery();
  const [selectedStore, setSelectedStore] = useState(userProfile?.user?.selectedStore?._id || ' ');

  const [updateSelectedStore] = useUpdateSelectedStoreMutation();

  const [staffData, setStaffData] = useState([]);

  const { data, isLoading, isFetching, refetch } = useGetRotaStaffMembersListQuery({
    storeId: selectedStore,
  });
  const { data: storesList } = useGetStoresListQuery();

  const storesListOptions = storesList?.stores?.map((store) => ({
    value: store?._id,
    label: store?.name,
  }));

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
    if (data) {
      if (status === 'active') {
        setStaffData(data.activeStaff);
      } else if (status === 'offline') {
        setStaffData(data.inactiveStaff);
      }
      setIsDataLoaded(true);
    }
  }, [status, data]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight={600}>
        Rota for{' '}
        {userProfile?.user?.selectedStore ? userProfile?.user?.selectedStore?.name : 'All Stores'}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        mt={1}
        mb={2.5}
        justifyContent="space-between"
      >
        <Box display="flex" gap={1.5} flexWrap="wrap" my={1}>
          <Button
            variant={status === 'active' ? 'contained' : 'outlined'}
            color="success"
            sx={{
              fontSize: 14,
              fontWeight: 400,
              height: 36,
              px: 4,
              borderRadius: '10px',
              ':hover': status === 'active' ? { bgcolor: '#00c820bf' } : { bgcolor: 'inherit' },
            }}
            onClick={() => {
              setStatus('active');
              setSearchParams({});
            }}
          >
           On shift now
          </Button>
          <Button
            variant={status === 'offline' ? 'contained' : 'outlined'}
            color="error"
            sx={{
              fontSize: 14,
              fontWeight: 400,
              height: 36,
              px: 4,
              borderRadius: '10px',
              ':hover': status === 'offline' ? { bgcolor: '#fe0000b8' } : { bgcolor: 'inherit' },
            }}
            onClick={() => setStatus('offline')}
          >
            Not on shift
          </Button>
        </Box>
        <Box display="flex" gap={1.5} flexWrap="wrap">
          {/* <CustomSelect name="select-store" label="All Staff" options={selectStaffOptions} /> */}
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
        </Box>
      </Box>
      <Stack
        spacing={2.5}
        sx={{ maxHeight: 'calc(100vh - 190px)', overflow: 'auto', pr: 2, pb: 2 }}
      >
        {isLoading || isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, width: 1 }}>
            <CircularProgress />
          </Box>
        ) : isDataLoaded && staffData?.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, width: 1 }}>
            <Typography textAlign="center" fontSize={16} fontWeight={500}>
              No Staff member found.
            </Typography>
          </Box>
        ) : (
          staffData?.map((item) => (
            <Fragment key={item?._id}>
              <RotaCard member={item} />
            </Fragment>
          ))
        )}
      </Stack>
    </Container>
  );
}
