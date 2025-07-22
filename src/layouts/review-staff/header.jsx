import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Box, AppBar, Container, Typography } from '@mui/material';

import { useGetStoreDetailsQuery } from 'src/services/get-reviews/interfacesDetails';


const ReviewHeader = () => {
  const [searchParams] = useSearchParams();
  const { data } = useGetStoreDetailsQuery(searchParams.get('store'));
  return (
    <AppBar sx={{ boxShadow: 'none', py: '24px', bgcolor: '#fff' }} position="static">
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ md: 'space-between', sm: 'space-between', xs: 'center' }}
          gap="20px"
          alignItems="center"
        >
          <Box display="flex" alignItems="center" gap={1}>
            {/* <Logo
              disabledLink
              sx={{
                width: '150px',
                height: 'auto',
              }}
            /> */}
            {/* <Divider orientation="vertical" sx={{ borderColor: '#000', height: '50px' }} /> */}
            <img width="120px" height="auto" src={data?.store?.image} alt="" />
          </Box>
          <Box px="20px" py="10px" bgcolor="#303131" borderRadius="15px">
            <Typography sx={{ fontSize: { md: '26px', sm: '28px' }, color: '#FFC500' }}>
              100% Anonymous!
            </Typography>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default ReviewHeader;
