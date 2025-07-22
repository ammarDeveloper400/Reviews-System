/* eslint-disable no-unused-vars */
// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';

import InterfaceOne from '../interface-cards/interface-1';
import InterfaceTwo from '../interface-cards/interface-2';
import InterfaceThree from '../interface-cards/interface3';

// import StaffCard from '../staff-card';

// ----------------------------------------------------------------------

export default function InterfaceSettings() {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" mb={2}>
        Let’s choose what your customers rate
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12}>
            <InterfaceOne />
          </Grid>
          <Grid item md={7} xs={12}>
            <InterfaceTwo />
          </Grid>
          <Grid item md={5} xs={12}>
            <InterfaceThree />
          </Grid>
        </Grid>
      </Container>
      {/* <CancelConfirmationModal open={openConfirmationModal} setOpen={setOpenConfirmationModal} /> */}
    </>
  );
}
