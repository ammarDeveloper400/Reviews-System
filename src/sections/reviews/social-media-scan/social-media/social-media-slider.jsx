/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import Slider from 'react-slick';
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
// import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  //   DialogContent,
  //   CircularProgress,
} from '@mui/material';

import { useGetSocialLinksQuery } from 'src/services/get-reviews/social-media';

import QRCodeWithLogo from 'src/components/qr-code';

const SocialMediaSlider = ({ interfaceDetails }) => {
  const [searchParams] = useSearchParams();
  const { isLoading, data } = useGetSocialLinksQuery(searchParams.get('store'));

  const navigate = useNavigate();

  const [isNextVisible, setIsNextVisible] = useState(true);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow, // Use the dynamic state value
    slidesToScroll: 1,
    nextArrow: isNextVisible ? <NextArrow /> : null,
    prevArrow: isPrevVisible ? <PrevArrow /> : null,
    afterChange: (current) => {
      const maxIndex = Object.keys(data?.socialLinks || {}).length - slidesToShow;
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
    setIsNextVisible(Object.keys(data?.socialLinks || {}).length > 3);
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

  const socialIcons = {
    instagram: '/assets/icons/hugeicons_instagram.svg',
    facebook: '/assets/icons/basil_facebook-outline.svg',
    whatsapp: '/assets/icons/ic_sharp-whatsapp.svg',
    snapchat: '/assets/icons/iconoir_snapchat.svg',
    tiktok: '/assets/icons/ri_tiktok-line.svg',
    youtube: '/assets/icons/iconoir_youtube.svg',
    linkedin: '/assets/icons/basil_linkedin-outline.svg',
    telegram: '/assets/icons/hugeicons_telegram.svg',
    wechat: '/assets/icons/hugeicons_wechat.svg',
    pinterest: '/assets/icons/ant-design_pinterest-outlined.svg',
    twitter: '/assets/icons/ph_x-logo.svg',
    google: '/assets/icons/google.svg',
    trustpilot: '/assets/icons/trustpilot.svg',
  };

  return (
    <Box sx={{ position: 'relative', width: '90%', margin: '0 auto' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <Button
          onClick={() =>
            interfaceDetails?.interface2?.status
              ? navigate(`/rate-experience?store=${searchParams.get('store')}`)
              : navigate(`/rate-staff?store=${searchParams.get('store')}`)
          }
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
        <Typography
          sx={{
            fontSize: { md: '56px', xs: '35px', sm: '45px' },
            color: '#000',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Engage-Follow-Comment
        </Typography>
        <Box />
      </Box>

      <Box sx={{ padding: '0 50px', mt: { md: '0px', xs: '40px' } }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={2} width={1} height={250}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            {Object.keys(data?.socialLinks || {}).length === 0 ? (
              <Typography
                sx={{
                  fontSize: { md: '26px', xs: '20px' },
                  fontWeight: 500,
                  textAlign: 'center',
                  py: 6,
                }}
              >
                No Social Link Found
              </Typography>
            ) : (
              <Slider {...settings}>
                {Object.keys(data?.socialLinks).map((item, index) => (
                  <Box key={index} sx={{ padding: '0 10px' }}>
                    <Box display="flex" justifyContent="center">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width={120}
                        height={120}
                        bgcolor="#FFC500"
                        borderRadius="50%"
                        p={3}
                      >
                        <img
                          width="100%"
                          src={socialIcons[item]}
                          alt={`${item} icon`}
                          style={{ borderRadius: '10px' }}
                        />
                      </Box>
                    </Box>
                    <Box backgroundColor="#EFF7F9" py="26px" mt="-20px">
                      <Typography
                        sx={{
                          fontSize: { md: '30px', sm: '20px' },
                          fontWeight: { md: 600, sm: 500 },
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          color: '#000000',
                          mt: 1,
                        }}
                      >
                        {item}
                      </Typography>
                      {/* <Link to={data?.socialLinks[item]}> */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: '10px',
                          px: { sm: '20px', md: '0px' },
                        }}
                      >
                        <Box
                          mx="auto"
                          sx={{
                            width: 'max-content',
                            border: '7px solid black',
                            borderRadius: '10px',
                          }}
                        >
                          <QRCodeWithLogo
                            value={data?.socialLinks[item]}
                            size={120}
                            logoWidth={32}
                            logoHeight={32}
                            bgColor="#EFF7F9"
                          />
                        </Box>
                      </Box>
                      {/* </Link> */}
                    </Box>
                  </Box>
                ))}
              </Slider>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SocialMediaSlider;
