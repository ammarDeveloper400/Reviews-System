import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import { useGetUserProfileQuery } from 'src/services/profile/profile-api';

import Iconify from 'src/components/iconify';
import SelectStoreModal from 'src/components/select-store-modal';

// import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
// import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const [openStoreModal, setOpenStoreModal] = useState(false);
  const { data } = useGetUserProfileQuery();

  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify sx={{ color: '#000' }} icon="eva:menu-2-fill" />
        </IconButton>
      )}
      {/* <Searchbar /> */}
      <Box display={{ md: 'block', xs: 'none' }}>
        <Typography fontSize={22} fontWeight={500} color="#000">
          Welcome Back, {data?.user?.fullname?.split(' ')[0]}
        </Typography>
        <Typography fontSize={10} fontWeight={300} color="#5C5C5C">
        Your CX Journey…see through
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: { md: 'block', xs: 'none', sm: 'block' } }} />
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        <Button
          onClick={() => setOpenStoreModal(true)}
          variant="contained"
          sx={{
            bgcolor: '#E1F296',
            boxShadow: 'none',
            fontSize: '15px',
            fontWeight: 500,
            color: 'black',
            p: { md: '15px 30px', xs: '5px 20px' },
            borderRadius: '20px',
            height: { md: '54px', xs: 44 },
            whiteSpace: 'nowrap',
            ':hover': {
              bgcolor: '#daeb8c',
            },
          }}
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.517 13.673L12 12.167L14.483 13.673L13.823 10.848L16.019 8.964L13.133 8.708L12 6.058L10.867 8.708L7.981 8.964L10.177 10.848L9.517 13.673ZM3 20.077V4.616C3 4.15533 3.15433 3.771 3.463 3.463C3.77167 3.155 4.15567 3.00067 4.615 3H19.385C19.845 3 20.229 3.15433 20.537 3.463C20.845 3.77167 20.9993 4.156 21 4.616V15.385C21 15.845 20.8457 16.2293 20.537 16.538C20.2283 16.8467 19.8443 17.0007 19.385 17H6.077L3 20.077ZM5.65 16H19.385C19.5383 16 19.6793 15.936 19.808 15.808C19.9367 15.68 20.0007 15.539 20 15.385V4.615C20 4.46167 19.936 4.32067 19.808 4.192C19.68 4.06333 19.539 3.99933 19.385 4H4.615C4.46167 4 4.32067 4.064 4.192 4.192C4.06333 4.32 3.99933 4.461 4 4.615V17.645L5.65 16Z"
                fill="black"
              />
            </svg>
          }
        >
          Get Reviews
        </Button>
        <NotificationsPopover />
        <AccountPopover user={data?.user} />
      </Stack>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            mx: { lg: 5 },
            px: { xs: 0 },
            borderBottom: '0.5px solid #000',
            justifyContent: 'space-around',
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
      {openStoreModal && <SelectStoreModal open={openStoreModal} setOpen={setOpenStoreModal} />}
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
