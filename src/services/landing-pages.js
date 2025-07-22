import { baseAPI } from './base-api';

export const landingPagesAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => ({
        url: `/v1/static-pages/term`,
        method: 'GET',
      }),
      providesTags: ['TERMS'],
    }),
    getBlogDetails: builder.query({
      query: () => ({
        url: `/v1/static-pages/blog`,
        method: 'GET',
      }),
      providesTags: ['BLOG_DETAILS'],
    }),
  }),
});

export const { useGetTermsQuery, useGetBlogDetailsQuery } = landingPagesAPIs;
