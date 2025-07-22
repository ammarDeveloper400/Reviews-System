/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Typography, CircularProgress } from '@mui/material';

import { useLazyGetPlanDetailsQuery } from 'src/services/subscription-plans';

import Iconify from 'src/components/iconify';

import PlanCard from './subscription-card';

const PlanSelectionModal = ({ open, setOpen, selectedPlanId }) => {
  const [planDetails, setPlanDetails] = React.useState();
  const [getPlans, { isLoading }] = useLazyGetPlanDetailsQuery();

  React.useEffect(() => {
    if (selectedPlanId) {
      getPlans({ id: selectedPlanId }).then((res) => {
        setPlanDetails(res?.data?.plan);
      });
    }
  }, [selectedPlanId]);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
      PaperProps={{ sx: { bgcolor: '#EFF7F9' } }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {`Select your plan's Duration`}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={(theme) => ({
          position: 'absolute',
          right: 10,
          top: 16,
          color: theme.palette.grey[500],
        })}
      >
        <Iconify icon="streamline:delete-1-solid" />
      </IconButton>
      <DialogContent dividers sx={{ py: 5 }}>
        <Grid container spacing={{ md: 4, xs: 3 }} alignItems="center">
          {isLoading ? (
            <Grid item xs={12} textAlign="center" py={5}>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              {planDetails?.plans?.length > 0 ? (
                planDetails?.plans?.map((plan, index) => (
                  <Grid key={index} item xs={12} sm={6} md={3}>
                    <PlanCard
                      plan={plan}
                      mostPopular={plan?.duration === 6}
                      planId={selectedPlanId}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center" my={5}>
                    No Plan Found!
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSelectionModal;
