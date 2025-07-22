/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function ThankYouView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/rate-staff?store=${searchParams.get('store')}`);
    }, 2000);
  }, []);

  return (
    <Container sx={{ pt: 6 }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          sx={{
            fontSize: { md: '56px', sm: '35px', xs: '30px' },
            color: '#000',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Thanks for your Review!
        </Typography>
      </Box>
    </Container>
  );
}
