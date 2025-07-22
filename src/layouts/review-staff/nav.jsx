import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import { alpha } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

// import { account } from 'src/_mock/account';

import { useNavigate } from 'react-router-dom';

import { Divider, Typography } from '@mui/material';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const navigate = useNavigate();

  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box sx={{ position: 'sticky', bottom: 0 }}>
      <Box px="20px">
        <Divider sx={{ borderColor: '#fff' }} />
      </Box>
      <Box
        onClick={() => navigate('/')}
        sx={{
          mx: 2.5,
          px: 2.3,
          py: 3,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          cursor: 'pointer',
          color: '#fff',

          backgroundColor: 'primary.main',
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M16.6487 11.8303L14.7407 13.739L13.798 12.7963L14.9287 11.6656H10.334V10.3323H14.9713L13.798 9.15831L14.7407 8.21565L16.6487 10.1236C17.1193 10.5943 17.1193 11.3596 16.6487 11.8303ZM5.33333 8.33231C4.78133 8.33231 4.33333 8.78031 4.33333 9.33231C4.33333 9.88431 4.78133 10.3323 5.33333 10.3323C5.88533 10.3323 6.33333 9.88431 6.33333 9.33231C6.33333 8.78031 5.88533 8.33231 5.33333 8.33231ZM10.3333 12.999H11.6667V16.999H1V3.79898C1 2.84965 1.676 2.02498 2.60733 1.83831L6.608 1.03831C7.2 0.922314 7.80333 1.07231 8.26867 1.45298C8.554 1.68698 8.754 1.99431 8.874 2.33231H9.66733C10.77 2.33231 11.6673 3.22965 11.6673 4.33231V8.99898H10.334V4.33231C10.334 3.96431 10.0353 3.66565 9.66733 3.66565H9.00067V15.6656H10.334V12.999H10.3333ZM7.66667 2.99965C7.66667 2.79898 7.578 2.61098 7.42267 2.48431C7.268 2.35765 7.06467 2.30765 6.86933 2.34565L2.86933 3.14565C2.55867 3.20831 2.33333 3.48298 2.33333 3.79898V15.6656H7.66667V2.99965Z"
              fill="white"
              stroke="#254D71"
              strokeWidth="0.2"
            />
          </svg>
        </span>
        <Box sx={{ ml: 2 }}>
          <Typography>Log Out</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.8} sx={{ px: 2.2, mt: 4, mb: 1 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  // const renderUpgrade = (
  //   <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
  //     <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
  //       <Box
  //         component="img"
  //         src="/assets/illustrations/illustration_avatar.png"
  //         sx={{ width: 100, position: 'absolute', top: -50 }}
  //       />

  //       <Box sx={{ textAlign: 'center' }}>
  //         <Typography variant="h6">Get more?</Typography>

  //         <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
  //           From only $69
  //         </Typography>
  //       </Box>

  //       <Button
  //         href="https://material-ui.com/store/items/minimal-dashboard/"
  //         target="_blank"
  //         variant="contained"
  //         color="inherit"
  //       >
  //         Upgrade to Pro
  //       </Button>
  //     </Stack>
  //   </Box>
  // );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        bgcolor: '#01565A',
        borderRadius: { xs: 0, lg: '0 40px 40px 0' },
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          bgcolor: 'primary.main',
          borderTopRightRadius: { xs: 0, lg: '40px' },
        }}
      >
        <Logo
          sx={{
            pt: 3,
            pb: 1.5,
            pl: 3,
            pr: 6.5,
            width: '290px',
            height: 'auto',
          }}
        />
        <Box px={2.5}>
          <Divider sx={{ borderColor: '#fff' }} />
        </Box>
      </Box>
      {/* <Logo sx={{ mt: 3, width: '290px', height: 'auto' }} /> */}

      {renderMenu}

      {renderAccount}
      {/* <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade} */}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      disableRipple
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        color: '#fff',
        textTransform: 'capitalize',
        borderRadius: '100px',
        fontSize: '16px',
        fontWeight: '400',
        py: 1.6,
        ...(active && {
          color: '#000',
          bgcolor: '#EFF7F9',
          borderRadius: '100px',
          '&:hover': {
            bgcolor: '#EFF7F9',
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 16, height: 16, mr: 1.5 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
