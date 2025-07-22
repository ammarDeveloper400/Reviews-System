import React, { useState } from 'react';

import { Box, Card, Grid, Stack, Button, Container, Typography } from '@mui/material';

import CustomModal from 'src/components/custom-model';

const FreeTrial = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          p: { md: '32px', xs: '20px' },
          background: '#01565A',
          mt: { md: '154px', xs: '30px' },
        }}
      >
        <Grid container spacing={{ md: '77px', xs: '30px' }} alignItems="center">
          <Grid item md={8} xs={12}>
            <Stack gap={{ md: '57px', xs: '20px' }}>
              <Typography
                sx={{ fontSize: { md: '36px', xs: '26px' }, fontWeight: 800, color: 'white' }}
              >
                Start a free trial
              </Typography>
              <Typography sx={{ fontSize: '18px', color: 'white' }}>
                Take the first step toward transforming your restaurant operations. Monitor staff
                performance, enhance customer satisfaction, and boost your revenue—all from a single
                platform.
              </Typography>
              <Box display="flex" justifyContent="start">
                <Button
                  onClick={handleOpen}
                  sx={{
                    fontSize: { md1: '25px', xs: '20px' },
                    background: 'white',
                    color: '#01565A',
                    fontWeight: 500,
                    px: '42px',
                    py: '9px',
                    ':hover': {
                      background: 'white',
                    },
                  }}
                >
                  Start a free trial
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <img src="/assets/images/free-trials.svg" alt="" width="100%" />
          </Grid>
        </Grid>
      </Card>
      {modalOpen && <CustomModal open={modalOpen} onClose={handleClose} />}
    </Container>
  );
};

export default FreeTrial;
