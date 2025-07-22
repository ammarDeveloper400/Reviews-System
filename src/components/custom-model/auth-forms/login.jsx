/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Box, Typography, FormControl, OutlinedInput, FormHelperText } from '@mui/material';

import { setUser } from 'src/utils/functions';

import { useLoginMutation } from 'src/services/auth-api';

import Iconify from 'src/components/iconify';

const LoginForm = ({ setPageName }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values)
            .unwrap()
            .then((response) => {
              localStorage.setItem('token', response?.token);
              setUser(response?.user);
            });
          toast.success('Login success.');
          setStatus({ success: true });
          setSubmitting(false);
          navigate('/dashboard');
        } catch (err) {
          toast.error(err?.data?.message);
          setSubmitting(false);
          setStatus({ success: false });
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Typography sx={{ fontSize: '32px', color: '#333', textAlign: 'center' }}>
            Login
          </Typography>
          <Typography sx={{ fontSize: '16px', textAlign: 'center', mt: '10px', mb: '40px' }}>
            {`Don't have an account?`}{' '}
            <span
              onClick={() => setPageName('register')}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: '#111',
              }}
            >
              Sign up
            </span>
          </Typography>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>Email</Typography>
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
            sx={{ mb: 1 }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ fontSize: '16px', color: '#666', mb: '6px' }}>Password</Typography>
              <Typography
                sx={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  color: '#666',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
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
              Forgot password?
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <LoadingButton
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
              Login
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
