/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Chip, styled, Typography, CardContent } from '@mui/material';

import { getUser, createCheckoutSession } from 'src/utils/functions';

import { useGetCurrentPlanQuery } from 'src/services/subscription-plans';
import { useGetUserProfileQuery } from 'src/services/profile/profile-api';

const DiscountBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -6,
  left: -5,
}));

const PriceContainer = styled(Box)(({ theme, mostPopular }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: mostPopular ? '30px' : 0,
}));

const StrikeThrough = styled(Typography)(() => ({
  textDecoration: 'line-through',
}));

const DiscountChip = styled(Chip)(() => ({
  backgroundColor: '#01565A',
  color: '#fff',
  opacity: 0.5,
}));

const PlanCard = ({ plan, mostPopular, planId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const { data: currentPlanDetails } = useGetCurrentPlanQuery();
  const { data: profileDetails } = useGetUserProfileQuery();

  const paymentHandler = async () => {
    setLoading(true);
    // setLoadingStates((prevStates) => ({
    //   ...prevStates,
    //   [plan?.planId]: true,
    // }));
    const payload = {
      planId: planId || currentPlanDetails?.plan?._id,
      priceId: plan?.priceId,
      base_url: `${window.location.origin}/`,
      customerEmail: getUser()?.email,
      subscriptionId: profileDetails?.user?.subscriptionId,
    };

    const stripeKey =
      import.meta.env.VITE_APP_STRIPEKEY ??
      'pk_test_51Q50tnALdqvhSvBSwoyoCJXyvmPizdGVVm2N4Ck23YPDGwXSchA4xwyvuYOMlyUR9iyBNRcSS2V3bqC2FYoYqXBB003frqjcMF';

    const stripePromise = loadStripe(stripeKey);
    const stripe = await stripePromise;

    try {
      await createCheckoutSession(payload).then((res) => {
        if (res && (res.status === 201 || res.status === 200)) {
          if (res.data) {
            if (stripe) {
              setLoading(false);
              // setLoadingStates((prevStates) => ({
              //   ...prevStates,
              //   [plan?.planId]: false,
              // }));
              stripe
                .redirectToCheckout({ sessionId: res?.data?.id })
                .then((result) => {
                  // Handle success or error from the redirect
                  if (result.error) {
                    // Show an error message to the user
                    //   setErrorMessage(result.error.message);
                  }
                })
                .catch((error) => {
                  // Handle any other errors
                  console.error(error);
                  // setErrorMessage("An error occurred during the payment process. Please try again.");
                });
            }
          }
        } else if (res && (res.status === 401 || res.status === 400)) {
          navigate('/payment-failed');
          // setErrorMessage(res?.data?.message);
          // setBtnLoading(false);
        }
        //   setBtnLoading(false);
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <Card
      sx={{
        border: mostPopular && '1px solid #01565A',
        borderRadius: '8px',
        paddingInline: mostPopular ? '50px' : '30px',
        position: 'relative',
        color: '#000',
      }}
    >
      {mostPopular && (
        <DiscountBadge>
          <img src="/assets/icons/most-popular-badge.svg" alt="" />
        </DiscountBadge>
      )}
      <CardContent>
        <PriceContainer mostPopular={mostPopular}>
          <StrikeThrough fontSize={20}>£{plan?.basePrice?.toFixed(2)}</StrikeThrough>
          <DiscountChip label={`Save ${plan?.discount}%`} />
        </PriceContainer>
        <Typography fontSize={10} mt="10px">{`Let's Get You Saving!`}</Typography>
        <Typography variant="h4" fontWeight={600}>
          {plan?.duration} months plan
        </Typography>
        <Typography fontSize={14}>Number of Staff: {plan?.staffRange}</Typography>
        <Typography fontSize={30} fontWeight={800} sx={{ mt: 1.5 }}>
          £{plan?.finalPrice?.toFixed(2)}
        </Typography>
        <Typography fontSize={14} color="textSecondary">
          (Renewal Every {plan?.duration} Months)
        </Typography>
        <LoadingButton
          loading={loading}
          onClick={() => paymentHandler()}
          fullWidth
          variant="contained"
          color="primary"
          sx={{ fontSize: 18, fontWeight: 400, mt: 2, py: 1.2 }}
        >
          Upgrade
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
