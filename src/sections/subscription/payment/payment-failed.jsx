import React from 'react';

import { Box, Typography } from '@mui/material';

const PaymentFailed = () => (
  <div className="subscriptions-list-wrapper" style={{ paddingInline: '16px' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '78vh' }}>
      <Typography variant="h3" style={{ textAlign: 'center', fontWeight: '600' }}>
        Your payment was Failed!
      </Typography>
    </Box>
  </div>
);

export default PaymentFailed;
