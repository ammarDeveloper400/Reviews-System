import { baseAPI } from '../base-api';

export const socialLinksAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSocialLinks: builder.query({
      query: (id) => ({
        url: `/v1/anonymous/social-links/${id}`,
        method: 'GET',
      }),
      providesTags: ['SOCIAL_LINKS'],
    }),
  }),
});

export const { useGetSocialLinksQuery } = socialLinksAPIs;
