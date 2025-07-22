/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
// import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Chip,
  Grid,
  Button,
  Dialog,
  FormControl,
  DialogContent,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';
import { baseAPI } from 'src/services/base-api';
import {
  useUpdateProfileMutation,
  useLazyGetUserProfileQuery,
} from 'src/services/profile/profile-api';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
//   // {
//   //   label: 'Settings',
//   //   icon: 'eva:settings-2-fill',
//   // },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const smUp = useResponsive('up', 'sm');

  const [open, setOpen] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const [getUserProfileDetails] = useLazyGetUserProfileQuery();

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(user?.profilePicture ?? null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('fullname', values?.fullname);
    formData.append('oldPassword', values?.oldPassword);
    formData.append('newPassword', values?.newPassword);

    if (selectedFile) {
      // Append the file if it's available
      formData.append('profilePicture', selectedFile);
    }

    try {
      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully');
      setOpenPopup(false);
      setOpen(null);
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(baseAPI.util.resetApiState());
    navigate('/');
  };

  useEffect(() => {
    getUserProfileDetails()
      .unwrap()
      .then((response) => {
        if (response?.user?.subscriptionStatus === 'expired') {
          if (window.location.pathname + window.location.search !== '/my-subscription') {
            navigate('/my-subscription');
            toast.warning('Please upgrade your plan to access your content.');
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]); // Empty dependency array to run the effect only once

  return (
    <>
      <IconButton sx={{ p: 0 }} disableRipple onClick={handleOpen}>
        {smUp ? (
          <Chip
            sx={{ height: '54px', borderRadius: '100px', bgcolor: '#fff' }}
            avatar={
              <Avatar
                src={user?.profilePicture}
                alt={user?.fullname}
                sx={{
                  width: '40px !important',
                  height: '40px !important',
                  bgcolor: 'grey.300',
                  // border: (theme) => `solid 2px ${theme.palette.background.default}`,
                }}
              >
                {user?.fullname?.charAt(0).toUpperCase()}
              </Avatar>
            }
            label={
              <Box display="flex" gap={3} alignItems="center">
                <Box textAlign="left">
                  <Typography fontSize={14} fontWeight={500}>
                    {user?.fullname}
                  </Typography>
                  <Typography fontSize={10} fontWeight={300} color="#5C5C5C">
                    {user?.userType}
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
        ) : (
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
        )}
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              p: 0,
              mt: 1,
              ml: 0.75,
              width: 200,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullname}
          </Typography>
          <Typography variant="body2" fontSize={12} sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {MENU_OPTIONS.map((option) => ( */}
        {/* <MenuItem>Home</MenuItem> */}
        <MenuItem
          onClick={() => {
            setOpenPopup(true);
            setImage(user?.profilePicture);
          }}
          sx={{ py: 1.5 }}
        >
          Profile
        </MenuItem>
        {/* ))} */}

        <Divider sx={{ borderStyle: 'dashed', my: '0 !important' }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
      {openPopup && (
        <Dialog
          fullWidth
          maxWidth="md"
          open={openPopup}
          onClose={() => setOpenPopup(false)}
          aria-labelledby="report-seller"
          aria-describedby="report-seller-description"
        >
          <DialogContent sx={{ px: '35px', py: '31px', bgcolor: '#EFF7F9' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 500 }}>Profile</Typography>
            <Grid container spacing={4} sx={{ mt: 3 }}>
              <Grid item xs={12} md={4}>
                <Box
                  display="flex"
                  gap="20px"
                  p="30px"
                  borderRadius="15px"
                  alignItems="center"
                  flexDirection="column"
                  boxShadow="0px 96px 27px 0px rgba(0, 0, 0, 0.00)"
                  bgcolor="#fff"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="140"
                      height="140"
                      viewBox="0 0 140 140"
                      fill="none"
                    >
                      <circle cx="70" cy="70" r="70" fill="#D9D9D9" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M62.8896 99H77.1104C87.0976 99 92.0928 99 95.68 96.6317C97.2278 95.6102 98.5609 94.2919 99.6032 92.7521C102 89.2077 102 84.268 102 74.3952C102 64.5191 102 59.5827 99.6032 56.0382C98.5609 54.4984 97.2279 53.1801 95.68 52.1587C93.376 50.6346 90.4896 50.09 86.0704 49.8967C83.9616 49.8967 82.1472 48.3178 81.7344 46.2717C81.4189 44.7729 80.5993 43.4298 79.4139 42.4693C78.2286 41.5088 76.7503 40.9899 75.2288 41.0001H64.7712C61.6096 41.0001 58.8864 43.2074 58.2656 46.2717C57.8528 48.3178 56.0384 49.8967 53.9296 49.8967C49.5136 50.09 46.6272 50.6378 44.32 52.1587C42.7732 53.1803 41.4412 54.4986 40.4 56.0382C38 59.5827 38 64.5191 38 74.3952C38 84.268 38 89.2045 40.3968 92.7521C41.4336 94.2859 42.7648 95.6038 44.32 96.6317C47.9072 99 52.9024 99 62.8896 99ZM70 61.2131C62.6368 61.2131 56.6656 67.113 56.6656 74.392C56.6656 81.6742 62.6368 87.5773 70 87.5773C77.3632 87.5773 83.3344 81.6742 83.3344 74.3952C83.3344 67.113 77.3632 61.2131 70 61.2131ZM70 66.4846C65.584 66.4846 62 70.0259 62 74.3952C62 78.7613 65.584 82.3025 70 82.3025C74.416 82.3025 78 78.7613 78 74.3952C78 70.0259 74.416 66.4846 70 66.4846ZM85.1104 63.8489C85.1104 62.3924 86.304 61.2131 87.7792 61.2131H91.3312C92.8032 61.2131 94 62.3924 94 63.8489C93.9932 64.5542 93.7087 65.228 93.2089 65.7222C92.7091 66.2164 92.0349 66.4907 91.3344 66.4846H87.7792C87.4321 66.488 87.0877 66.4226 86.7657 66.2919C86.4437 66.1613 86.1505 65.9681 85.9026 65.7234C85.6548 65.4786 85.4573 65.1871 85.3214 64.8655C85.1854 64.5438 85.1137 64.1984 85.1104 63.8489Z"
                        fill="black"
                      />
                    </svg>
                  )}
                  <Button
                    sx={{
                      color: 'black',
                      fontSize: '20px',
                      fontWeight: '400',
                      borderRadius: '15px',
                      textTransform: 'none',
                      py: '7px',
                      px: '20px',
                      ':hover': {
                        bgcolor: 'white',
                        color: 'black',
                        borderRadius: '15px',
                        textTransform: 'none',
                      },
                    }}
                    onClick={handleUploadClick}
                  >
                    Upload image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Formik
                  initialValues={{
                    email: user?.email || '',
                    oldPassword: '',
                    newPassword: '',
                    fullname: user?.fullname || '',
                  }}
                  validationSchema={Yup.object().shape({
                    fullname: Yup.string().max(255).required('Name is required'),
                  })}
                  onSubmit={onSubmit}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.fullname && errors.fullname)}
                        sx={{ mb: '20px' }}
                      >
                        <OutlinedInput
                          id="fullname"
                          type="text"
                          placeholder="Full Name"
                          value={values.fullname}
                          name="fullname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            backgroundColor: 'transparent',
                            fontSize: '16px',
                            borderRadius: '15px',
                            height: '48px',
                            '& .MuiOutlinedInput-input': {
                              py: 1.5,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: '1px solid rgba(0, 0, 0, 0.50)',
                              py: 1,
                            },
                          }}
                        />
                        {touched.fullname && errors.fullname && (
                          <FormHelperText error id="fullname">
                            {errors.fullname}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        sx={{ mb: '20px' }}
                      >
                        <OutlinedInput
                          id="email"
                          type="email"
                          placeholder="Email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          disabled
                          sx={{
                            backgroundColor: 'transparent',
                            fontSize: '16px',
                            borderRadius: '15px',
                            height: '48px',
                            '& .MuiOutlinedInput-input': {
                              py: 1.5,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: '1px solid rgba(0, 0, 0, 0.50)',
                              // height: '48px',
                            },
                          }}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="email">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                        sx={{ mb: '20px' }}
                      >
                        <OutlinedInput
                          id="oldPassword"
                          type="password"
                          placeholder="Old Password"
                          value={values.oldPassword}
                          name="oldPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            backgroundColor: 'transparent',
                            fontSize: '16px',
                            height: '48px',
                            borderRadius: '15px',
                            '& .MuiOutlinedInput-input': {
                              py: 1.5,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: '1px solid rgba(0, 0, 0, 0.50)',
                            },
                          }}
                        />
                        {touched.oldPassword && errors.oldPassword && (
                          <FormHelperText error id="oldPassword">
                            {errors.oldPassword}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        sx={{ mb: '20px' }}
                      >
                        <OutlinedInput
                          id="newPassword"
                          placeholder="Confirm Password"
                          type="password"
                          value={values.newPassword}
                          name="newPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            backgroundColor: 'transparent',
                            fontSize: '16px',
                            height: '48px',
                            borderRadius: '15px',
                            '& .MuiOutlinedInput-input': {
                              py: 1.5,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: '1px solid rgba(0, 0, 0, 0.50)',
                            },
                          }}
                        />
                        {touched.newPassword && errors.newPassword && (
                          <FormHelperText error id="newPassword">
                            {errors.newPassword}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <Box sx={{ mt: 2 }} display="flex" justifyContent="end">
                        <LoadingButton
                          size="large"
                          type="submit"
                          variant="contained"
                          loading={updateProfileLoading}
                          sx={{
                            px: '45px',
                            py: { xs: '10px', md: '5px' },
                            fontSize: '13px',
                            fontWeight: 400,
                            borderRadius: '15px',
                          }}
                        >
                          Update
                        </LoadingButton>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
