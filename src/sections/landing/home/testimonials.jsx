/* eslint-disable react/jsx-no-undef */
import React from 'react';

import { Box, Container, Typography } from '@mui/material';

export default function Testimonials() {
  return (
    <Container maxWidth="lg" sx={{ my: { md: '150px', xs: '30px' } }}>
      <Box >
        <Typography
          sx={{ textAlign: 'center', fontSize: { md: '40px', xs: '26px' }, fontWeight: 600 }}
        >
          Our customers rate us as Excellent on Trustpilot
        </Typography>
        <Box display="flex" gap={3} flexWrap={{ xs: 'wrap', md: 'nowrap' }} justifyContent="center" mt={3}>
          <img src="/assets/images/testimonial1.svg" alt="" />
          <img src="/assets/images/testimonial2.svg" alt="" />
          <img src="/assets/images/testimonial3.svg" alt="" />
        </Box>
      </Box>
    </Container>
  );
}
