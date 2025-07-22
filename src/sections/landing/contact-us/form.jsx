import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  // TextField,
  Typography,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

import { usePostContactUsDetailsMutation } from 'src/services/contact-us';

export default function ContactForm() {
  const [postContactDetails, { isLoading }] = usePostContactUsDetailsMutation();
  return (
    <Grid container spacing="70px">
      <Grid item md={5.5} xs={12}>
        <Box>
          <Typography fontSize="40px" fontWeight={700}>
            Contact Us
          </Typography>
        </Box>
        <Typography fontSize="18px" textAlign="justify" mt="19px">
        Ready to get your CX boosted…reach each out!
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Box>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              message: '',
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().max(50).required('First name is required'),
              lastName: Yup.string().max(50).required('Last name is required'),
              email: Yup.string().email('Invalid email').required('Email is required'),
              phoneNumber: Yup.string().required('Phone number is required'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
              try {
                await postContactDetails(values).unwrap();
                toast.success('Information submitted successfully.');
                setStatus({ success: true });
                setSubmitting(false);
                resetForm();
              } catch (err) {
                toast.error(err?.data?.message);
                setSubmitting(false);
                setStatus({ success: false });
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing="17px">
                  <Grid item xs={12} md={6} sm={6}>
                    <OutlinedInput
                      fullWidth
                      placeholder="First Name"
                      id="firstName"
                      type="text"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // label="name"
                      sx={{
                        backgroundColor: 'transparent',
                        fontSize: '20px',
                        borderRadius: '15px',
                        height: '54px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid rgba(0, 0, 0, 0.50)',
                        },
                      }}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error id="firstName">
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6} sm={6}>
                    <OutlinedInput
                      fullWidth
                      placeholder="Last Name"
                      id="lastName"
                      type="text"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // label="name"
                      sx={{
                        backgroundColor: 'transparent',
                        fontSize: '20px',
                        borderRadius: '15px',
                        height: '54px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid rgba(0, 0, 0, 0.50)',
                        },
                      }}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error id="lastName">
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <OutlinedInput
                      fullWidth
                      placeholder="Email Address"
                      id="email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // label="Email"
                      sx={{
                        backgroundColor: 'transparent',
                        fontSize: '20px',
                        borderRadius: '15px',
                        height: '54px',
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
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <OutlinedInput
                      placeholder="Phone Number"
                      fullWidth
                      id="phoneNumber"
                      type="tel"
                      value={values.phoneNumber}
                      name="phoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // label="phoneNumber"
                      sx={{
                        backgroundColor: 'transparent',
                        fontSize: '20px',
                        borderRadius: '15px',
                        height: '54px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid rgba(0, 0, 0, 0.50)',
                        },
                      }}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <FormHelperText error id="phoneNumber">
                        {errors.phoneNumber}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <OutlinedInput
                      fullWidth
                      placeholder="Message"
                      id="message"
                      type="message"
                      value={values.message}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // label="message"
                      multiline
                      rows={4}
                      sx={{
                        backgroundColor: 'transparent',
                        fontSize: '20px',
                        borderRadius: '15px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: '1px solid rgba(0, 0, 0, 0.50)',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                  fullWidth
                  endIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.2428 12.4371C21.4016 12.3489 21.5 12.1816 21.5 12C21.5 11.8184 21.4016 11.6511 21.2428 11.5629L18.9605 10.295C14.464 7.79689 9.72391 5.76488 4.81421 4.2306L4.14914 4.02276C3.99732 3.97532 3.83198 4.00294 3.70383 4.09716C3.57568 4.19138 3.5 4.34094 3.5 4.5V10.25C3.5 10.5159 3.70816 10.7353 3.97372 10.7493L4.98336 10.8025C7.44497 10.932 9.89156 11.2659 12.2979 11.8006L12.5362 11.8536C12.5892 11.8654 12.6122 11.887 12.625 11.9042C12.6411 11.926 12.6536 11.9594 12.6536 12C12.6536 12.0406 12.6411 12.0741 12.625 12.0958C12.6122 12.113 12.5892 12.1347 12.5362 12.1464L12.2979 12.1994C9.89157 12.7341 7.44496 13.068 4.98334 13.1976L3.97372 13.2507C3.70816 13.2647 3.5 13.4841 3.5 13.75V19.5C3.5 19.6591 3.57568 19.8086 3.70383 19.9029C3.83198 19.9971 3.99732 20.0247 4.14914 19.9772L4.81422 19.7694C9.72391 18.2351 14.464 16.2031 18.9605 13.705L21.2428 12.4371Z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                  sx={{
                    py: '29px',
                    mt: '17px',
                    fontSize: '20px',
                    borderRadius: '15px',
                  }}
                >
                  Send
                </LoadingButton>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
