import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Box, Stack, Button, Typography } from '@mui/material';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="subscriptions-list-wrapper" style={{ paddingInline: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '78vh' }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h3" style={{ textAlign: 'center', fontWeight: '600' }}>
            {searchParams.get('proration')
              ? 'Your plan was upgraded successfully.'
              : 'Your payment was Successful!'}
          </Typography>
          {searchParams?.get('proration') && (
            <Typography px={{ md: 10, xs: 2 }} textAlign="center">
              As a result of upgrading your subscription plan, you will receive an immediate refund
              of <strong>${Number(searchParams.get('proration')).toFixed(2)}</strong> for the unused
              portion of your current plan. This amount will be refunded to your account shortly.
            </Typography>
          )}
          <Button
            sx={{ width: 120 }}
            variant="contained"
            LinkComponent={Link}
            to="/my-subscription"
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default PaymentSuccess;
