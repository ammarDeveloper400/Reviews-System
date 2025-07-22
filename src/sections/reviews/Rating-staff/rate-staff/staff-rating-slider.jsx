/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Stack,
  Dialog,
  Rating,
  Button,
  Typography,
  DialogContent,
  CircularProgress,
  // CircularProgress,
} from '@mui/material';

import { usePathname } from 'src/routes/hooks';

import {
  usePostStaffRatingMutation,
  useGetStaffListForRatingQuery,
} from 'src/services/get-reviews/staff-ratings';

import Iconify from '../../../../components/iconify';

const StaffRatingSlider = ({ setIsStaffRated, interfaceDetails, interfaces, resetTimer }) => {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useGetStaffListForRatingQuery(searchParams.get('store'));
  const [postStaffRating] = usePostStaffRatingMutation();

  const pathName = usePathname();

  const [open, setOpen] = useState(false);

  const [isNextVisible, setIsNextVisible] = useState(true);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const navigate = useNavigate();

  const goTo = () => {
    navigate(`/rate-experience?store=${searchParams.get('store')}`);
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          top: '50%',
          right: '-100px',
          zIndex: 1,
          transform: 'translateY(-50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 128 128"
          fill="none"
        >
          <path
            d="M20.4795 64C20.4795 39.936 39.9355 20.48 63.9995 20.48C88.0635 20.48 107.52 39.936 107.52 64C107.52 88.064 88.0635 107.52 63.9995 107.52C39.9355 107.52 20.4795 88.064 20.4795 64ZM102.4 64C102.4 42.752 85.2475 25.6 63.9995 25.6C42.7515 25.6 25.5995 42.752 25.5995 64C25.5995 85.248 42.7515 102.4 63.9995 102.4C85.2475 102.4 102.4 85.248 102.4 64Z"
            fill="#FFC500"
          />
          <path
            d="M59.6485 85.248L80.8965 64L59.6485 42.752L63.2325 39.168L88.0645 64L63.2325 88.832L59.6485 85.248Z"
            fill="#FFC500"
          />
          <path
            d="M84.4805 61.4399L84.4805 66.5599L40.9605 66.5599L40.9605 61.4399L84.4805 61.4399Z"
            fill="#FFC500"
          />
        </svg>
      </Box>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          top: '50%',
          left: '-100px',
          zIndex: 1,
          transform: 'translateY(-50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 128 128"
          fill="none"
        >
          <path
            d="M107.52 64C107.52 88.064 88.0645 107.52 64.0005 107.52C39.9365 107.52 20.4805 88.064 20.4805 64C20.4805 39.936 39.9365 20.48 64.0005 20.48C88.0645 20.48 107.52 39.936 107.52 64ZM25.6005 64C25.6005 85.248 42.7525 102.4 64.0005 102.4C85.2485 102.4 102.4 85.248 102.4 64C102.4 42.752 85.2485 25.6 64.0005 25.6C42.7525 25.6 25.6005 42.752 25.6005 64Z"
            fill="#FFC500"
          />
          <path
            d="M68.3515 42.752L47.1035 64L68.3515 85.248L64.7675 88.832L39.9355 64L64.7675 39.168L68.3515 42.752Z"
            fill="#FFC500"
          />
          <path
            d="M43.5195 66.5601L43.5195 61.4401L87.0395 61.4401L87.0395 66.5601L43.5195 66.5601Z"
            fill="#FFC500"
          />
        </svg>
      </Box>
    );
  };

  // Function to calculate slidesToShow based on screen width
  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      setSlidesToShow(3); // Default for large screens
    } else if (screenWidth >= 768) {
      setSlidesToShow(2); // Tablets
    } else {
      setSlidesToShow(1); // Small mobile devices
    }
    setIsNextVisible(filteredStaff?.length > 3);
  };

  // Add event listener to handle window resize
  React.useEffect(() => {
    handleResize(); // Set the correct slidesToShow on mount
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderTime = ({ remainingTime }) => (
    // if (remainingTime === 0) {
    //   return <div className="timer">Too lale...</div>;
    // }

    <Stack textAlign="center" color="#fff">
      <Typography fontSize={28}>Timer</Typography>
      <Typography fontSize={46} fontWeight={500}>
        {remainingTime}s
      </Typography>
    </Stack>
  );

  const [ratedStaff, setRatedStaff] = useState([]);
  const [ratings, setRatings] = useState({});

  const handleStaffRating = async (rating, id) => {
    const payload = {
      staff: id,
      rating,
      feedbackMethod: 'Manual',
      store: searchParams.get('store'),
    };

    try {
      const res = await postStaffRating(payload).unwrap();
      const ratedStaffId = res?.staffRating?.staff;

      if (ratedStaffId) {
        setRatedStaff((prev) => [...prev, ratedStaffId]);
        // toast.success('Your rating submitted successfully.');
        setOpen(true);
        resetTimer();
      }
    } catch (err) {
      // Reset the rating for this staff in case of an error
      setRatings((prevRatings) => ({ ...prevRatings, [id]: null }));
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const filteredStaff =
    ratedStaff?.length > 0
      ? data?.activeStaff?.filter((staff) => !ratedStaff?.includes(staff?._id))
      : data?.activeStaff;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow, // Use the dynamic state value
    slidesToScroll: 1,
    nextArrow: isNextVisible ? <NextArrow /> : null,
    prevArrow: isPrevVisible ? <PrevArrow /> : null,
    afterChange: (current) => {
      const maxIndex = filteredStaff && filteredStaff.length - slidesToShow;
      setIsNextVisible(current < maxIndex);
      setIsPrevVisible(current > 0);
    },
    onReInit: () => handleResize(), // Handle resize when the slider is re-initialized
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (!isLoading) {
      if (!filteredStaff?.length) {
        if (interfaces?.interface2?.status) {
          navigate(`/rate-experience?store=${searchParams.get('store')}`);
        } else if (interfaces?.interface3?.status) {
          navigate(`/social-media?store=${searchParams.get('store')}`);
        } else navigate(`/thanks?store=${searchParams.get('store')}`);
      }
    }
  }, [filteredStaff?.length]);

  return (
    <Box sx={{ position: 'relative', width: { lg: '90%', xs: '100%' }, px: 1, margin: '0 auto' }}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={pathName?.includes('/rate-staff') ? 'center' : 'space-between'}
        alignItems="center"
      >
        {pathName?.includes('/rate-more-staff') && (
          <Button
            LinkComponent={Link}
            to="/rate-staff"
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="36"
                viewBox="0 0 32 36"
                fill="none"
                className="responsive-svg"
              >
                <g clipPath="url(#clip0_1410_18156)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.48602 8.139C3.63741 7.72782 3.89379 7.37638 4.22273 7.12913C4.55168 6.88189 4.93841 6.74995 5.33402 6.75H18.6674C21.3195 6.75 23.8631 7.93526 25.7384 10.045C27.6138 12.1548 28.6674 15.0163 28.6674 18C28.6674 20.9837 27.6138 23.8452 25.7384 25.955C23.8631 28.0647 21.3195 29.25 18.6674 29.25H6.66735C6.13692 29.25 5.62821 29.0129 5.25314 28.591C4.87807 28.169 4.66735 27.5967 4.66735 27C4.66735 26.4033 4.87807 25.831 5.25314 25.409C5.62821 24.9871 6.13692 24.75 6.66735 24.75H18.6674C20.2587 24.75 21.7848 24.0388 22.91 22.773C24.0352 21.5071 24.6674 19.7902 24.6674 18C24.6674 16.2098 24.0352 14.4929 22.91 13.227C21.7848 11.9612 20.2587 11.25 18.6674 11.25H10.162L11.4154 12.66C11.7795 13.0845 11.9809 13.653 11.976 14.243C11.9712 14.8329 11.7607 15.3971 11.3897 15.8141C11.0187 16.2311 10.517 16.4674 9.99256 16.4723C9.46816 16.4771 8.96305 16.2501 8.58602 15.84L3.91935 10.59C3.63987 10.2754 3.44954 9.87465 3.37241 9.4384C3.29528 9.00216 3.33482 8.54998 3.48602 8.139Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1410_18156">
                    <rect width="32" height="36" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
            sx={{
              fontSize: { md: '30px', xs: '20px', sm: '30px' },
              fontWeight: '400',
              color: '#000000',
              '@media (max-width: 600px)': {
                '& .responsive-svg': {
                  width: '20px',
                  height: '22px',
                  ml: '0px',
                },
              },
            }}
          >
            Back
          </Button>
        )}
        <Typography
          sx={{
            fontSize: { md: '56px', sm: '45px', xs: '30px' },
            color: '#000',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Review Your Service!
        </Typography>
        <Box />
      </Box>
      <Box sx={{ padding: '0 50px' }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={2} width={1} height={250}>
            <CircularProgress size={60} />
          </Box>
        ) : filteredStaff?.length > 0 ? (
          <Slider {...settings}>
            {filteredStaff?.map((staff, index) => (
              <Box key={index} sx={{ padding: '0 10px' }}>
                <Stack position="relative" width="100%">
                  <Box
                    position="relative"
                    width="100%"
                    height={{ md: 280, xs: 200 }}
                    borderRadius={15}
                  >
                    <img
                      src={
                        interfaceDetails?.staffFaces
                          ? staff?.image
                          : '/assets/images/profile_placeholder.jpg'
                      }
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '15px',
                      }}
                    />
                  </Box>

                  <Box
                    width="100%"
                    height={{ lg: 80, md: 60, sm: 60, xs: 50 }}
                    position="absolute"
                    bottom={0}
                    left={0}
                    sx={{
                      background: 'linear-gradient(to top, #FFC500, transparent)',
                      borderRadius: '0 0 15px 15px',
                    }}
                  >
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                      <Typography fontSize={{ md: 18, xs: 16 }} fontWeight={600} color="#000">
                        {staff?.name}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                <Box display="flex" justifyContent="center">
                  <Rating
                    name="half-rating"
                    sx={{
                      fontSize: { lg: '65px', md: '45px', xs: '40px', sm: '30px' },
                      mt: '20px',
                    }}
                    precision={1}
                    value={ratings[staff?._id] || null} // Set rating value from state
                    onChange={(e, newValue) => {
                      setRatings((prevRatings) => ({ ...prevRatings, [staff?._id]: newValue }));
                      handleStaffRating(newValue, staff?._id);
                    }}
                    emptyIcon={
                      <Iconify
                        sx={{ color: '#C5C5C5', width: 'inherit', height: 'inherit' }}
                        icon="material-symbols:star"
                      />
                    }
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography
            sx={{
              fontSize: { md: '26px', fontWeight: 500 },
              textAlign: 'center',
              py: 6,
            }}
          >
            No Staff Found
          </Typography>
        )}
      </Box>
      {open && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              setOpen(false); // Sirf 'Escape' key se close hoga
            }
          }}
          disableEscapeKeyDown
          aria-labelledby="report-seller"
          aria-describedby="report-seller-description"
        >
          <DialogContent sx={{ py: '8px', px: '10px', pl: 3 }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item sm={6} order={{ sm: 1, xs: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: '30px', textAlign: 'center', fontWeight: 600 }}>
                    {interfaceDetails?.timerPopupText || 'Rate more Staff?'}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    gap="20px"
                    mt={{ md: '36px', sm: '36px', xs: '20px' }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpen(false);
                        setIsStaffRated(true);
                      }}
                      sx={{
                        background: '#FFC500',
                        color: '#000',
                        fontSize: '20px',
                        fontWeight: 400,
                        px: '51px',
                        py: '5px',
                        borderRadius: '5px',
                        ':hover': { background: '#FFC500' },
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={goTo}
                      variant="outlined"
                      sx={{
                        color: '#000',
                        fontSize: '20px',
                        fontWeight: 400,
                        px: '51px',
                        py: '10px',
                        border: '1px solid #000',
                        ':hover': {
                          border: '1px solid #000',
                          bgcolor: 'transparent',
                        },
                      }}
                    >
                      No
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item p="0px" sm={6} order={{ sm: 2, xs: 1 }}>
                <Box
                  position="relative"
                  display="inline-flex"
                  bgcolor="#303131"
                  py="22px"
                  px="40px"
                  borderRadius="12px"
                  width="100%"
                  justifyContent="center"
                >
                  <CountdownCircleTimer
                    isPlaying
                    duration={interfaceDetails && interfaceDetails?.timerInSec}
                    colors={['#FFC500']}
                    colorsTime={[0]}
                    trailColor="#C5C5C5"
                    onComplete={() => {
                      setOpen(false);
                      setIsStaffRated(false);
                      setRatedStaff([]);
                    }}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default StaffRatingSlider;
