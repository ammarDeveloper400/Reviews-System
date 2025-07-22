import { useState } from 'react';

import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
// import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  // {
  //   label: 'Profile',
  //   icon: 'eva:person-fill',
  // },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton sx={{ p: 0 }} disableRipple onClick={handleOpen}>
        <Chip
          sx={{ height: '54px', borderRadius: '100px', bgcolor: '#fff' }}
          avatar={
            <Avatar
              src={account.photoURL}
              alt={account.displayName}
              sx={{
                width: '40px !important',
                height: '40px !important',
                // border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            >
              {account.displayName.charAt(0).toUpperCase()}
            </Avatar>
          }
          label={
            <Box display="flex" gap={3} alignItems="center">
              <Box textAlign="left" ml={0.5}>
                <Typography fontSize={14} fontWeight={500}>
                  {account.displayName}
                </Typography>
                <Typography fontSize={10} fontWeight={300} color="#5C5C5C">
                  Café Owner
                </Typography>
              </Box>
              <Box mr={1}>
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 0.792885C5.68342 0.402364 6.31658 0.402364 6.70711 0.792885L11.7071 5.79289C12.0976 6.18342 12.0976 6.81658 11.7071 7.2071C11.3166 7.59763 10.6834 7.59763 10.2929 7.2071L6 2.91418L1.70711 7.2071C1.31658 7.59763 0.68342 7.59763 0.292892 7.2071C-0.0976294 6.81658 -0.0976294 6.18342 0.292892 5.79289L5.29289 0.792885Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.70711 7.20712C6.31661 7.59763 5.68341 7.59763 5.29291 7.20712L0.292891 2.20712C-0.0976302 1.81659 -0.0976302 1.18342 0.292891 0.792891C0.683421 0.40237 1.31658 0.40237 1.70711 0.792891L6.00001 5.08582L10.2929 0.792891C10.6834 0.40237 11.3166 0.40237 11.7071 0.792891C12.0976 1.18342 12.0976 1.81659 11.7071 2.20712L6.70711 7.20712Z"
                      fill="black"
                    />
                  </svg>
                )}
              </Box>
            </Box>
          }
        />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
