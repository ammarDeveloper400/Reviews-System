import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { Box, Menu, Button, MenuItem, IconButton, Typography } from '@mui/material';

import { useGetUserProfileQuery } from 'src/services/profile/profile-api';

import Logo from 'src/components/logo';
import CustomModal from 'src/components/custom-model/index';

import AccountPopover from './common/account-popover';

export default function LandingHeader() {
  const { data } = useGetUserProfileQuery();

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          backgroundColor: '#fff',
          width: 1,
          px: { md: 4, xs: 1 },
          boxShadow:
            '1px 991px 278px 0px rgba(0, 0, 0, 0.00), 1px 634px 254px 0px rgba(0, 0, 0, 0.01), 0px 357px 214px 0px rgba(0, 0, 0, 0.05), 0px 159px 159px 0px rgba(0, 0, 0, 0.09), 0px 40px 87px 0px rgba(0, 0, 0, 0.10)',
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>

        <Logo
          sx={{
            py: 2.5,
            width: { sm: '130px', xs: '100px' },
            height: 'auto',
            ml: { sm: '55px', xs: '20px', md: '0px' },
          }}
        />
        <Button
          variant="contained"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M12 10.5C14.2091 10.5 16 8.70914 16 6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5C8 8.70914 9.79086 10.5 12 10.5Z"
                fill="white"
              />
              <path
                d="M20 18C20 20.485 20 22.5 12 22.5C4 22.5 4 20.485 4 18C4 15.515 7.582 13.5 12 13.5C16.418 13.5 20 15.515 20 18Z"
                fill="white"
              />
            </svg>
          }
          onClick={handleOpen}
          sx={{
            px: '20px',
            borderRadius: '15px',
            gap: '0px',
            fontSize: '14px',
            fontWeight: 400,
            py: '11px',
          }}
        >
          Login
        </Button>
      </Box>
      <Box
        display="flex"
        // py={2}
        alignItems="center"
        justifyContent="space-between"
        boxShadow="1px 991px 278px 0px rgba(0, 0, 0, 0.00)"
        bgcolor="#fff"
        px={4}
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
            bgcolor: '#fff',
            boxShadow:
              '1px 991px 278px 0px rgba(0, 0, 0, 0.00), 1px 634px 254px 0px rgba(0, 0, 0, 0.01), 0px 357px 214px 0px rgba(0, 0, 0, 0.05), 0px 159px 159px 0px rgba(0, 0, 0, 0.09), 0px 40px 87px 0px rgba(0, 0, 0, 0.10)',
          },
        }}
      >
        {/* Menu Icon */}

        {/* Logo */}
        <Logo
          sx={{
            py: 2.5,
            width: '130px',
            height: 'auto',
          }}
        />

        <Box display="flex" alignItems="center" gap="42px">
          {/* <Link
            to="/blog-posts"
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <Typography color="#01565A" display={{ xs: 'none', md: 'block' }} fontSize="18px">
              Blog
            </Typography>
          </Link> */}
          {/* <Link
            to="/terms-conditions"
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <Typography color="#01565A" display={{ xs: 'none', md: 'block' }} fontSize="18px">
              T & C’s
            </Typography>
          </Link> */}
          <Link
            to="/contact-us"
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <Typography color="#01565A" display={{ xs: 'none', md: 'block' }} fontSize="18px">
              Contact us
            </Typography>
          </Link>
          <Box>
            {localStorage.getItem('token') ? (
              <AccountPopover user={data?.user} />
            ) : (
              <Button
                variant="contained"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12 10.5C14.2091 10.5 16 8.70914 16 6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5C8 8.70914 9.79086 10.5 12 10.5Z"
                      fill="white"
                    />
                    <path
                      d="M20 18C20 20.485 20 22.5 12 22.5C4 22.5 4 20.485 4 18C4 15.515 7.582 13.5 12 13.5C16.418 13.5 20 15.515 20 18Z"
                      fill="white"
                    />
                  </svg>
                }
                sx={{
                  px: '22px',
                  borderRadius: '15px',
                  gap: '12px',
                  fontSize: '18px',
                  fontWeight: 400,
                  py: '11px',
                }}
                onClick={handleOpen}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
    

        {/* Login Button */}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        slotProps={{ paper: { sx: { width: 200 } } }}
      >
        {/* <Link
          to="/blog-posts"
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          <MenuItem onClick={handleMenuClose}>Blog</MenuItem>
        </Link> */}
        {/* <Link
          to="/terms-conditions"
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          <MenuItem onClick={handleMenuClose}>T & C’s</MenuItem>
        </Link> */}
        <Link
          to="/contact-us"
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          <MenuItem onClick={handleMenuClose}>Contact us</MenuItem>
        </Link>
      </Menu>
      {modalOpen && <CustomModal open={modalOpen} onClose={handleClose} />}
    </>
  );
}
