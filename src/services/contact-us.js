import { baseAPI } from './base-api';

export const contactUsAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postContactUsDetails: builder.mutation({
      query: (payload) => ({
        url: '/v1/contact-us',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['CONTACT_US'],
    }),
  }),
});

export const { usePostContactUsDetailsMutation } = contactUsAPIs;
