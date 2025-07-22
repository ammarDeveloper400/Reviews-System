/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Grid,
  Stack,
  Typography,
  FormControl,
  DialogContent,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

import {
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useOtpVerificationMutation,
} from 'src/services/auth-api';

import './index.css';
import Iconify from '../iconify';
import PricingPopup from './pricing-popup';
import LoginForm from './auth-forms/login';
import SignUpForm from './auth-forms/signup';

const CloseButton = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    onClick={onClick}
    style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
  >
    <path
      fill="#000000"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </svg>
);

const CustomModal = ({ open, onClose }) => {
  const [pageName, setPageName] = React.useState('login');
  const [openPricingPopup, setPricingPopup] = React.useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [forgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading: otpVerificationLoading }] = useOtpVerificationMutation();
  const [resetPassword, { isLoading: resetPasswordMutation }] = useResetPasswordMutation();

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="lg"
        open={open}
        onClose={onClose}
        aria-labelledby="generic-dialog-title"
        sx={{
          '& .MuiDialog-paper': {
            width: { xs: '100%', sm: '70%', md: '70%' },
            height: { xs: '100%', sm: '90%', md: 'auto' },
          },
        }}
      >
        <Box display={{ xs: 'block', sm: 'none' }} mb="40px">
          <CloseButton onClick={onClose} />
        </Box>
        {pageName === 'login' ? (
          <DialogContent sx={{ p: 0 }}>
            <Box
              width={1}
              py={{ md: '10px', xs: '20px' }}
              pl={{ md: '42px', xs: '20px' }}
              pr={{ md: '12px', xs: '20px' }}
            >
              <Stack justifyContent="center" sx={{ height: 1 }}>
                <Grid container justifyContent="center" spacing={5} alignItems="center" zIndex={1}>
                  <Grid item xs={12} md={6}>
                    <LoginForm setPageName={setPageName} />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <img
                      src="/assets/images/Login/Login/login-logo.png"
                      alt="Login Image"
                      className="image-animate"
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </DialogContent>
        ) : pageName === 'forget' ? (
          <DialogContent sx={{ px: { md: '8px', xs: '30px' }, py: '8px' }}>
            <Box width={1} pl={{ md: '30px', xs: '0px' }}>
              <Stack justifyContent="center" sx={{}}>
                <Grid
                  container
                  justifyContent="center"
                  spacing={{ md: '40px', xs: '0px', sm: '0px' }}
                  alignItems="center"
                  zIndex={1}
                >
                  <Grid item xs={12} md={6}>
                    <Formik
                      initialValues={{
                        email: '',
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email('Must be a valid email')
                          .max(255)
                          .required('Email is required'),
                      })}
                      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                          await forgotPassword(values).unwrap();
                          setSearchParams({ email: values.email });
                          toast.success(
                            'OTP sent to your email successfully.Please check your email.',
                            {
                              autoClose: 5000,
                            }
                          );
                          setStatus({ success: true });
                          setSubmitting(false);
                          setPageName('reset');
                        } catch (err) {
                          toast.error(err?.data?.message);
                          setSubmitting(false);
                          setStatus({ success: false });
                        }
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          <Typography
                            sx={{ fontSize: '32px', color: '#333', textAlign: 'center', mb: 2 }}
                          >
                            Forgot Password
                          </Typography>

                          <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ mb: 1 }}
                          >
                            <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>
                              Email
                            </Typography>
                            <OutlinedInput
                              id="email"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              size="medium"
                              placeholder="Enter your email address"
                              sx={{
                                backgroundColor: 'transparent',
                                fontSize: '16px',
                                borderRadius: '15px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: '1px solid rgba(0, 0, 0, 0.50)',
                                },
                              }}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error id="email">
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Box display="flex" justifyContent="end" width={1}>
                            <Typography
                              onClick={() => setPageName('login')}
                              sx={{
                                color: '#111',
                                fontSize: '16px',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                width: 'max-content',
                              }}
                            >
                              Go back to Login
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 4 }}>
                            {/* <Button
                              onClick={() => setPageName('reset')}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{
                                py: { xs: '10px', md: '20px' },
                                fontSize: { md: '22px', xs: '16px' },
                                borderRadius: '15px',
                                // background: '#7ED957',
                                ':hover': {
                                  // background: '#7ED957',
                                },
                              }}
                            >
                              Reset Password
                            </Button> */}
                            <LoadingButton
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              loading={forgotPasswordLoading}
                              sx={{
                                py: { xs: '8px', md: '12px' },
                                fontSize: '22px',
                                fontWeight: 400,
                                borderRadius: '40px',
                              }}
                            >
                              Send
                            </LoadingButton>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <img src="/assets/images/signup.png" alt="" className="image-animate" />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </DialogContent>
        ) : pageName === 'reset' ? (
          <DialogContent sx={{ px: { md: '8px', xs: '30px' }, py: '8px' }}>
            <Box width={1} pl={{ md: '30px', xs: '0px' }}>
              <Box>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    display: { md: 'block', xs: 'none' },
                  }}
                >
                  <img src="/assets/login-left.png" alt="" />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    display: { md: 'block', xs: 'none' },
                  }}
                >
                  <img src="/assets/login-right.png" alt="" />
                </Box>
              </Box>
              <Stack justifyContent="center" sx={{ height: 1 }}>
                <Grid
                  container
                  justifyContent="center"
                  spacing="40px"
                  alignItems="center"
                  zIndex={1}
                >
                  <Grid item xs={12} md={6}>
                    <Formik
                      initialValues={{
                        email: searchParams?.get('email'),
                        otp: '',
                      }}
                      validationSchema={Yup.object().shape({
                        otp: Yup.string().max(255).required('OTP is required'),
                      })}
                      onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting, resetForm }
                      ) => {
                        try {
                          await verifyOtp(values).unwrap();
                          setSearchParams({ email: values.email });
                          toast.success('OTP verified successfully.');
                          resetForm();
                          setStatus({ success: true });
                          setSubmitting(false);
                          setTimeout(() => {
                            setPageName('newpassword');
                          }, 500);
                        } catch (err) {
                          toast.error(err?.data?.message);
                          setSubmitting(false);
                          setStatus({ success: false });
                        }
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          {/* <Typography
                            sx={{
                              fontSize: { md: '40px', xs: '35px' },
                              fontWeight: 500,
                              color: '#000',
                              textAlign: 'center',
                              mt: '10px',
                              mb: '20px',
                            }}
                          >
                            Verification Code
                          </Typography> */}
                          <Typography
                            sx={{ fontSize: '32px', color: '#333', textAlign: 'center', mb: 2 }}
                          >
                            OTP Verification
                          </Typography>

                          <FormControl
                            fullWidth
                            error={Boolean(touched.otp && errors.otp)}
                            sx={{ mb: 1 }}
                          >
                            <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>
                              OTP
                            </Typography>
                            <OutlinedInput
                              id="otp"
                              type="number"
                              value={values.otp}
                              name="otp"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter your OTP"
                              sx={{
                                backgroundColor: 'transparent',
                                fontSize: '16px',
                                borderRadius: '15px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: '1px solid rgba(0, 0, 0, 0.50)',
                                },
                              }}
                            />
                            {touched.otp && errors.otp && (
                              <FormHelperText error id="otp">
                                {errors.otp}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Box display="flex" justifyContent="end" width={1}>
                            <Typography
                              onClick={() => setPageName('forget')}
                              sx={{
                                color: '#111',
                                fontSize: '16px',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                width: 'max-content',
                              }}
                            >
                              Go back to Forgot Password
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 4 }}>
                            {/* <Button
                              onClick={() => setPageName('newpassword')}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{
                                py: { xs: '10px', md: '20px' },
                                fontSize: { md: '24px', xs: '16px' },
                                borderRadius: '15px',
                                // background: '#7ED957',
                                ':hover': {
                                  // background: '#7ED957',
                                },
                              }}
                            >
                              Add new password
                            </Button> */}
                            <LoadingButton
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              loading={otpVerificationLoading}
                              sx={{
                                py: { xs: '8px', md: '12px' },
                                fontSize: '22px',
                                fontWeight: 400,
                                borderRadius: '40px',
                              }}
                            >
                              Verify OTP
                            </LoadingButton>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <img src="/assets/images/login.png" alt="" className="image-animate" />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </DialogContent>
        ) : pageName === 'newpassword' ? (
          <DialogContent sx={{ px: { md: '8px', xs: '30px' }, py: '8px' }}>
            <Box width={1} pl={{ md: '30px', xs: '0px' }}>
              <Box display={{ md: 'block', xs: 'none' }}>
                <img
                  src="/assets/login-right.png"
                  alt=""
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              </Box>
              <Stack justifyContent="center" sx={{ height: 1 }}>
                <Grid container spacing="40px" alignItems="center" zIndex={1}>
                  <Grid item xs={12} md={6}>
                    <Formik
                      initialValues={{
                        password: '',
                        confirmPassword: '',
                      }}
                      validationSchema={Yup.object().shape({
                        password: Yup.string().max(255).required('Password is required'),
                        confirmPassword: Yup.string()
                          .oneOf([Yup.ref('password'), null], 'Passwords must match')
                          .required('Confirm password is required'),
                      })}
                      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        const payload = {
                          email: searchParams.get('email'),
                          password: values.password,
                        };
                        try {
                          await resetPassword(payload).unwrap();
                          toast.success('Password updated successfully');
                          setStatus({ success: true });
                          setSubmitting(false);
                          setPageName('login');
                          setSearchParams(null);
                        } catch (err) {
                          toast.error(err?.data?.message);
                          setSubmitting(false);
                          setStatus({ success: false });
                        }
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          {/* <Typography
                            sx={{
                              fontSize: { md: '40px', xs: '35px' },
                              fontWeight: 500,
                              color: '#000',
                              textAlign: 'center',
                              pb: '20px',
                            }}
                          >
                            Add New Password
                          </Typography> */}
                          <Typography
                            sx={{ fontSize: '32px', color: '#333', textAlign: 'center', mb: 2 }}
                          >
                            Reset Password
                          </Typography>

                          <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ mb: 3 }}
                          >
                            <Box display="flex" justifyContent="space-between">
                              <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>
                                New password
                              </Typography>
                              <Typography
                                sx={{
                                  display: 'flex',
                                  gap: '5px',
                                  alignItems: 'center',
                                  color: '#666',
                                  cursor: 'pointer',
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Iconify
                                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                  sx={{ width: '24px', height: '20px' }}
                                />
                                {showPassword ? 'Hide' : 'Show'}
                              </Typography>
                            </Box>
                            <OutlinedInput
                              // id="password"
                              // type={showPassword ? 'text' : 'password'}
                              type="text"
                              value={values.password}
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              size="medium"
                              sx={{
                                backgroundColor: 'transparent',
                                fontSize: '16px',
                                borderRadius: '15px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: '1px solid rgba(0, 0, 0, 0.50)',
                                },
                              }}
                            />
                            {touched.password && errors.password && (
                              <FormHelperText error id="password">
                                {errors.password}
                              </FormHelperText>
                            )}
                          </FormControl>

                          <FormControl
                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            sx={{ mb: 3 }}
                          >
                            <Box display="flex" justifyContent="space-between">
                              <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>
                                Confirm password
                              </Typography>
                              <Typography
                                sx={{
                                  display: 'flex',
                                  gap: '5px',
                                  alignItems: 'center',
                                  color: '#666',
                                  cursor: 'pointer',
                                }}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                <Iconify
                                  icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                  sx={{ width: '24px', height: '20px' }}
                                />
                                {showConfirmPassword ? 'Hide' : 'Show'}
                              </Typography>
                            </Box>
                            <OutlinedInput
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={values.confirmPassword}
                              name="confirmPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              size="medium"
                              sx={{
                                backgroundColor: 'transparent',
                                fontSize: '16px',
                                borderRadius: '15px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: '1px solid rgba(0, 0, 0, 0.50)',
                                },
                              }}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                              <FormHelperText error id="confirmPassword">
                                {errors.confirmPassword}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Box display="flex" justifyContent="end" width={1}>
                            <Typography
                              onClick={() => setPageName('reset')}
                              sx={{
                                color: '#111',
                                fontSize: '16px',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                width: 'max-content',
                              }}
                            >
                              Go back to OTP Verification
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 4 }}>
                            {/* <Button
                              onClick={() => setPageName('login')}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{
                                py: { xs: '10px', md: '20px' },
                                fontSize: { md: '24px', xs: '16px' },
                                borderRadius: '15px',
                                // background: '#7ED957',
                                ':hover': {
                                  // background: '#7ED957',
                                },
                              }}
                            >
                              Change Password
                            </Button> */}
                            <LoadingButton
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              loading={resetPasswordMutation}
                              sx={{
                                py: { xs: '8px', md: '12px' },
                                fontSize: '22px',
                                fontWeight: 400,
                                borderRadius: '40px',
                              }}
                            >
                              Reset
                            </LoadingButton>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <img src="/assets/images/signup.png" alt="" />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </DialogContent>
        ) : (
          // ---------------Register ----------------
          <DialogContent sx={{ p: 0 }}>
            <Box
              width={1}
              py={{ md: '10px', xs: '20px' }}
              pl={{ md: '10px', xs: '10px' }}
              pr={{ md: '30px', xs: '10px' }}
            >
              <Box display={{ md: 'block', xs: 'none' }}>
                <img
                  src="/assets/login-right.png"
                  alt=""
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              </Box>
              <Stack justifyContent="center" sx={{ height: 1 }}>
                <Grid container columnSpacing="40px" alignItems="center" zIndex={1}>
                  <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <img src="/assets/images/sign-up2.png" alt="" className="image-animate1" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SignUpForm setPageName={setPageName} />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </DialogContent>
        )}
      </Dialog>
      {openPricingPopup && (
        <Dialog
          fullWidth
          maxWidth="lg"
          open={openPricingPopup}
          onClose={() => setPricingPopup(false)}
          aria-labelledby="report-seller"
          aria-describedby="report-seller-description"
          // PaperProps={{ sx: { background: ThemeModeColor('#eeeaf8', '#0C0020')} }}
        >
          <Box display={{ xs: 'block', sm: 'none' }} mb="40px">
            <CloseButton onClick={onClose} />
          </Box>
          <DialogContent sx={{ p: 0, py: '30px' }}>
            <PricingPopup />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomModal;
