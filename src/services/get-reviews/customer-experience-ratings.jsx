import { baseAPI } from '../base-api';

export const customerExperienceRatings = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerExperienceListForRating: builder.query({
      query: (id) => ({
        url: `/v1/anonymous/customer-experience/${id}`,
        method: 'GET',
      }),
      providesTags: ['CUSTOMER_EXPERIENCE_LIST_FOR_RATING'],
    }),
    postCustomerExperienceRating: builder.mutation({
      query: (payload) => ({
        url: `/v1/feedback/customer-experience-rating`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['CUSTOMER_EXPERIENCE_LIST_FOR_RATING'],
    }),
  }),
});

export const {
  useGetCustomerExperienceListForRatingQuery,
  usePostCustomerExperienceRatingMutation,
} = customerExperienceRatings;
