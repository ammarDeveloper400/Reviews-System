/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
// import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import {
  Box,
  Card,
  Grid,
  Stack,
  Radio,
  Button,
  Skeleton,
  Typography,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import {
  useGetPlanRangesQuery,
  useGetCurrentPlanQuery,
  useCancelSubscriptionPlanMutation,
} from 'src/services/subscription-plans';

import Iconify from 'src/components/iconify';

import PlanCard from '../subscription-card';
import PlanSelectionModal from '../plan-selection-modal';
import CancelConfirmationModal from '../cancel-confirmation';

// import StaffCard from '../staff-card';

// ----------------------------------------------------------------------

export default function MySubscription() {
  const { data, isLoading } = useGetPlanRangesQuery();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const [openPlanSelectionModal, setOpenPlanSelectionModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');

  const { data: currentPlanDetails, isLoading: currentPlanDetailsLoading } =
    useGetCurrentPlanQuery();
  const handleRadioChange = (event) => {
    setSelectedPlanId(event.target.value); // Update state with the selected _id
  };

  const [cancelSubscription, { isLoading: cancelSubscriptionLoading }] =
    useCancelSubscriptionPlanMutation();

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription().unwrap();
      toast.success('You have successfully cancelled your subscription.');
      setOpenConfirmationModal(false);
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={{ md: 5, xs: 3 }}>
          <Grid item md={6} xs={12}>
            <Typography variant="h4" mb={1}>
              My Subscription
            </Typography>

            <Card sx={{ p: '30px 40px', borderRadius: '15px' }}>
              {currentPlanDetailsLoading ? (
                <Stack spacing={2}>
                  <Skeleton
                    sx={{ borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={50}
                  />
                  <Skeleton
                    sx={{ borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={50}
                  />
                  <Skeleton
                    sx={{ borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={50}
                  />
                </Stack>
              ) : (
                <Stack spacing={1.2}>
                  <Typography variant="h4" fontWeight={600} pb={1} textTransform="capitalize">
                    {currentPlanDetails?.plan?.name}
                  </Typography>
                  <Typography fontSize={20} fontWeight={500}>
                    Number of Staff:{' '}
                    <span style={{ fontWeight: 400 }}>
                      {currentPlanDetails?.plan?.planType === 'custom'
                        ? `1-${currentPlanDetails?.plan?.staffLimit}`
                        : currentPlanDetails?.plan?.staffRange}
                    </span>
                  </Typography>
                  <Typography fontSize={20} fontWeight={500}>
                    Plan Price:{' '}
                    <span style={{ fontWeight: 400 }}>
                      £
                      {currentPlanDetails?.plan?.planType === 'custom'
                        ? currentPlanDetails?.plan?.price
                        : currentPlanDetails?.plan?.basePrice}
                    </span>
                  </Typography>

                  <Box display="flex" alignItems="end" justifyContent="space-between" pb={1}>
                    <Box>
                      {currentPlanDetails?.plan?.planType !== 'free' && (
                        <Typography fontSize={20} fontWeight={500} mb={1}>
                          {currentPlanDetails?.plan?.planType === 'custom'
                            ? 'Subscription Period: '
                            : 'Auto-renewal: '}
                          <span style={{ fontWeight: 400 }}>
                            {dayjs(currentPlanDetails?.plan?.enddate).format('DD MMM YYYY')}
                          </span>
                        </Typography>
                      )}
                      {currentPlanDetails?.plan?.planType === 'free' ? (
                        <Typography fontSize={14}>
                          (Trial will be expired on{' '}
                          {dayjs(currentPlanDetails?.plan?.enddate).format('DD MMM YYYY')})
                        </Typography>
                      ) : (
                        currentPlanDetails?.plan?.planType !== 'custom' && (
                          <Typography fontSize={14}>
                            (Renewal Every {currentPlanDetails?.plan?.name})
                          </Typography>
                        )
                      )}
                    </Box>
                    {currentPlanDetails?.plan?.planstatus !== 'cancelled' &&
                      currentPlanDetails?.plan?.planType !== 'free' &&
                      currentPlanDetails?.plan?.planType !== 'custom' && (
                        <Button
                          onClick={() => setOpenConfirmationModal(true)}
                          variant="outlined"
                          color="error"
                          sx={{ fontSize: 16, fontWeight: 400, borderRadius: '15px' }}
                        >
                          Cancel
                        </Button>
                      )}
                  </Box>
                </Stack>
              )}
            </Card>
            <Card
              sx={{
                p: '20px',
                borderRadius: '15px',
                border: '2px solid #FF5555',
                color: '#FF5555',
                mt: 3,
              }}
            >
              <Stack spacing={1.2}>
                <Typography fontSize={18} fontWeight={700}>
                  Cancellation Policy
                </Typography>
                <Typography fontSize={14}>
                  To cancel your subscription, Click on the cancel button at least 7 days prior to
                  the renewal date.
                </Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h4" mb={1}>
              Elevate your Staff
            </Typography>

            <Stack spacing={1.8}>
              {isLoading ? (
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton
                      key={i}
                      variant="rectangular"
                      sx={{ borderRadius: '10px' }}
                      width="100%"
                      height={54}
                    />
                  ))}
                </>
              ) : (
                <>
                  {data?.planRanges?.length > 0 ? (
                    <>
                      {data?.planRanges?.map((plan) => (
                        <Card
                          key={plan?._id}
                          sx={{ p: '12px 30px', borderRadius: '10px', fontSize: 20 }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={1.5}
                          >
                            <FormControlLabel
                              value={plan?._id} // Set the value to the plan's _id
                              control={
                                <Radio
                                  sx={{
                                    p: '5px',
                                    mr: 1.5,
                                    '& .MuiSvgIcon-root': { fontSize: '20px' },
                                  }}
                                  checked={selectedPlanId === plan?._id} // Check if this plan is selected
                                  onChange={handleRadioChange} // Handle selection change
                                  checkedIcon={
                                    <Iconify
                                      icon="material-symbols:check-circle"
                                      width="20px"
                                      height="20px"
                                    />
                                  }
                                />
                              }
                              label={<Typography fontSize={20}>{plan?.staffRange}</Typography>}
                            />
                            <Typography fontSize={20}>£{plan?.basePrice}</Typography>
                          </Box>
                        </Card>
                      ))}
                      <Card sx={{ p: '12px 30px', borderRadius: '10px', fontSize: 20 }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={1.5}
                        >
                          <Typography fontSize={20}>40+ Staff</Typography>
                          <Link
                            to="/contact-us"
                            target="_blank"
                            style={{ textDecoration: 'underline', color: '#000', fontWeight: 400 }}
                          >
                            Get in touch
                          </Link>
                        </Box>
                      </Card>
                    </>
                  ) : (
                    <Typography textAlign="center" py={3}>
                      No plan found.
                    </Typography>
                  )}
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedPlanId}
                sx={{ fontSize: 20, fontWeight: 400, py: 1.6 }}
                onClick={() => {
                  setOpenPlanSelectionModal(true);
                }} // You can handle the upgrade logic here
              >
                Upgrade
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h4" my={2.5} textAlign="center">
          Save on your current subscription
        </Typography>
        <Grid container spacing={{ md: 6, xs: 3 }} alignItems="center">
          {currentPlanDetailsLoading ? (
            <Grid item xs={12} textAlign="center" py={5}>
              <CircularProgress />
            </Grid>
          ) : (
            <>
              {currentPlanDetails?.plan?.planType !== 'free' &&
              currentPlanDetails?.plan?.plans?.length > 0 ? (
                currentPlanDetails?.plan?.plans?.map((plan, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <PlanCard plan={plan} mostPopular={plan?.duration === 6} />
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
      </Container>
      {openConfirmationModal && (
        <CancelConfirmationModal
          open={openConfirmationModal}
          setOpen={setOpenConfirmationModal}
          handleCancel={handleCancelSubscription}
          isLoading={cancelSubscriptionLoading}
        />
      )}
      {openPlanSelectionModal && (
        <PlanSelectionModal
          open={openPlanSelectionModal}
          setOpen={setOpenPlanSelectionModal}
          selectedPlanId={selectedPlanId}
        />
      )}
    </>
  );
}
