import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { verifyCheckoutSession } from 'src/utils/functions';

const SuccessLoading = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const session_id = searchParams.get('session_id');
  const planId = searchParams.get('planId');
  const package_chosen = searchParams.get('package_chosen');
  const userId = searchParams.get('userId');

  useEffect(() => {
    verifyCheckoutSession({
      sessionId: session_id,
      planId,
      package_chosen,
      userId,
    }).then((res) => {
      if ((res && res.status === 201) || res.status === 200) {
        if (res?.data && res?.data?.data?.paymentStatus) {
          toast.success('Your payment was successful.');
          localStorage.removeItem('orderRemainingTime');
        }
      } else if ((res && res.status === 400) || res.status === 401) {
        navigate('/payment-failed');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, session_id]);

  return (
    <div className="subscriptions-list-wrapper" style={{ paddingInline: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '78vh' }}>
        <Typography variant="h3" style={{ textAlign: 'center', fontWeight: '600' }}>
          Please wait ... <br />
          Your payment is being processed.
        </Typography>
      </Box>
    </div>
  );
};

export default SuccessLoading;
