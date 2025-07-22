/* eslint-disable no-nested-ternary */
// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material';
// import Typography from '@mui/material/Typography';

import { useState } from 'react';

import { useGetStoresListQuery } from 'src/services/manage-stores';

// import CustomSelect from 'src/components/custom-select/select';

import StoreCard from '../store-card';
import StoreModal from '../store-modal';

// ----------------------------------------------------------------------

export default function ManageStores() {
  const [open, setOpen] = useState(false);

  // const selectStoreOptions = [
  //   { value: 'store-1', label: 'Store 1' },
  //   { value: 'store-2', label: 'Store 2' },
  //   { value: 'store-3', label: 'Store 3' },
  // ];

  const { data, isLoading, isFetching } = useGetStoresListQuery();

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
            Manage Stores
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
              Add Store
            </Button>
            {/* <CustomSelect
              width={260}
              name="select-store"
              label="All Stores"
              options={selectStoreOptions}
            /> */}
          </Box>
        </Box>
        <Grid container spacing={4}>
          {isLoading || isFetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
              <CircularProgress />
            </Box>
          ) : data?.stores?.length > 0 ? (
            data?.stores?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item?._id}>
                <StoreCard store={item} />
              </Grid>
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, width: 1 }}>
              <Typography textAlign="center" fontSize={16} fontWeight={500}>
                No Store found.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
      {open && (
        <StoreModal title="Add New Store" acceptBtnText="Add" open={open} setOpen={setOpen} />
      )}
    </>
  );
}
