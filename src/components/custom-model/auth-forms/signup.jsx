/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import { Box, Typography, FormControl, OutlinedInput, FormHelperText } from '@mui/material';

import { useSignUpMutation } from 'src/services/auth-api';

import Iconify from 'src/components/iconify';

const SignUpForm = ({ setPageName }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const payload = {
          fullname: values.name,
          email: values.email,
          password: values.password,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        try {
          await signUp(payload).unwrap();
          toast.success(
            'Account created successfully. We’ve sent a verification link to your email (check your inbox or spam too)'
          );
          setStatus({ success: true });
          setSubmitting(false);
          setPageName('login');
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
            sx={{
              fontSize: '32px',
              // fontWeight: 700,
              color: '#333',
              textAlign: 'center',
            }}
          >
            Sign up
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              textAlign: 'center',
              color: '#333',
              mt: '10px',
              // mb: '26px',
            }}
          >
            Already have an account?{' '}
            <span
              onClick={() => setPageName('login')}
              style={{
                cursor: 'pointer',
                color: '#111',
                textDecoration: 'underline',
              }}
            >
              Login in
            </span>
          </Typography>
          <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ mb: 3 }}>
            <Typography htmlFor="name" sx={{ fontSize: '16px', color: '#666' }}>
              Full Name
            </Typography>
            <OutlinedInput
              id="name"
              type="text"
              value={values.name}
              name="name"
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
            {touched.name && errors.name && (
              <FormHelperText error id="name">
                {errors.name}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 3 }}>
            <Typography htmlFor="email" sx={{ fontSize: '16px', color: '#666' }}>
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

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ mb: 3 }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>
                Your password
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
              id="password"
              type={showPassword ? 'text' : 'password'}
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

          <Box sx={{ mt: '5px' }}>
            <LoadingButton
              //   onClick={setPricingPopup}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                py: { xs: '8px', md: '12px' },
                fontSize: '22px',
                fontWeight: 400,
                borderRadius: '40px',
              }}
            >
              Sign up
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
