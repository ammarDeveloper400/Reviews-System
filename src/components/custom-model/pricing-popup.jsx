/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  SvgIcon,
  Divider,
  Container,
  Typography,
} from '@mui/material';

const PricingPopup = () => {
  //   const navigate = useNavigate();

  const data = [
    {
      heading: 'All analytics features',
    },
    {
      heading: 'Up to 250,000 tracked visits',
    },
    {
      heading: 'Normal support',
    },
    {
      heading: 'Can increase teh staff number',
    },
  ];
  const cardData = [
    {
      linethrough: '£90.00',
      box: 'Save  £16',
      heading1: '£84.00',
      paragraph: '(Renewal Every 3 Months)',
      heading: '3 months plan',
    },
    {
      linethrough: '£180.00',
      box: 'Save  £22',
      heading1: '£158.00',
      paragraph: '(Renewal Every 6 Months)',
      heading: '6 months plan',
    },
    {
      linethrough: '£360.00',
      box: 'Save  £119',
      heading1: '£241.00',
      paragraph: '(Renewal Every 12 Months)',
      heading: '12 months plan',
    },
  ];
  return (
    <Container maxWidth="lg" sx={{}}>
      <Typography
        sx={{
          fontSize: { md: '30px', xs: '26px' },
          fontWeight: 600,
          color: '#000',
          textAlign: 'center',
        //   my: '40px',
        }}
      >
        Explore Our Plans
      </Typography>
      <Grid container spacing="28px">
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              px: '31px',
              py: '13px',
              boxShadow:
                '58px 59px 23px 0px rgba(0, 0, 0, 0.00), 37px 38px 21px 0px rgba(0, 0, 0, 0.01), 21px 21px 18px 0px rgba(0, 0, 0, 0.05), 9px 10px 13px 0px rgba(0, 0, 0, 0.09), 2px 2px 7px 0px rgba(0, 0, 0, 0.10)',
            }}
          >
            <img src="/assets/images/basic-plan.svg" alt="" />
            <Typography
              sx={{
                fontSize: { sm: '30px', xs: '24PX' },
                fontWeight: 700,
                color: '#1E1B39',
                mt: '12px',
              }}
            >
              Basic plan
            </Typography>
            {data &&
              data.map((item, index) => (
                <Box display="flex" gap="14px" key={index} mt="12px" alignItems="center">
                  <SvgIcon viewBox="0 0 33 32">
                    <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="33" height="32">
                      <path d="M32.3984 0H0.398438V32H32.3984V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0)">
                      <path
                        d="M16.3984 32C25.2344 32 32.3984 24.837 32.3984 16C32.3984 7.163 25.2344 0 16.3984 0C7.56144 0 0.398438 7.163 0.398438 16C0.398438 24.837 7.56144 32 16.3984 32Z"
                        fill="#01565A"
                      />
                      <path
                        d="M9.1582 17.034L13.2962 21.172L23.6402 10.828"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </SvgIcon>
                  <Typography sx={{ fontSize: '20px', color: '#01565A' }}>
                    {item.heading}
                  </Typography>
                </Box>
              ))}
            <Box my="10px">
              <Divider />
            </Box>
            <Typography
              sx={{
                fontSize: { md: '45px', xs: '36px' },
                fontWeight: 700,
                color: '#01565A',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              $99<span style={{ fontSize: '30px', color: '#6E6C83' }}>/monthly</span>
            </Typography>
            <Link to="/dashboard">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  px: '50px',
                  py: '12px',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#fff',
                  borderRadius: '10px',
                }}
              >
                Select
              </Button>
            </Link>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Stack gap={{ md: '32px', xs: '30px' }}>
            {cardData &&
              cardData.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    px: '40px',
                    py: '22px',
                    gap: '62px',
                    boxShadow:
                      '58px 59px 23px 0px rgba(0, 0, 0, 0.00), 37px 38px 21px 0px rgba(0, 0, 0, 0.01), 21px 21px 18px 0px rgba(0, 0, 0, 0.05), 9px 10px 13px 0px rgba(0, 0, 0, 0.09), 2px 2px 7px 0px rgba(0, 0, 0, 0.10)',
                  }}
                >
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    gap="15px"
                    alignItems="center"
                  >
                    <Box>
                      <Box display="flex" gap="10px">
                        <Typography
                          sx={{ textDecoration: 'line-through', fontSize: '20px', color: '#000' }}
                        >
                          {item.linethrough}
                        </Typography>
                        <Box
                          sx={{
                            px: '10px',
                            py: '5px',
                            background: '#01565A80',
                            borderRadius: '40px',
                          }}
                        >
                          <Typography sx={{ fontSize: '15px', color: 'white' }}>
                            {item.box}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: '10px', mt: '23px' }}>
                        by subscribing for
                      </Typography>
                      <Typography
                        sx={{ fontSize: '25px', fontWeight: '600', color: '#000', mt: '5px' }}
                      >
                        {item.heading}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '30px', fontWeight: 800 }}>
                        {item.heading1}
                      </Typography>
                      <Typography sx={{ fontSize: '15px', mt: '6px', opacity: '0.5' }}>
                        {item.paragraph}
                      </Typography>
                    </Box>
                    <Box>
                      <Link to="/dashboard">
                        <Button
                          variant="contained"
                          sx={{
                            px: '50px',
                            py: '12px',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: '#fff',
                            borderRadius: '10px',
                          }}
                        >
                          Select
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Card>
              ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
export default PricingPopup;
