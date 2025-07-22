import { baseAPI } from './base-api';
// import { USERS } from "./tags";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/signup',
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/login',
        method: 'POST',
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),
    otpVerification: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/verify-otp',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/reset-password',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useOtpVerificationMutation,
  useResetPasswordMutation,
} = authAPI;
