import { baseAPI } from '../base-api';

export const staffRatings = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaffListForRating: builder.query({
      query: (id) => ({
        url: `/v1/anonymous/active-staff/${id}`,
        method: 'GET',
      }),
      providesTags: ['STAFF_LIST_FOR_RATING'],
    }),
    postStaffRating: builder.mutation({
      query: (payload) => ({
        url: `/v1/feedback/staff-rating`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['STAFF_LIST_FOR_RATING'],
    }),
  }),
});

export const { useGetStaffListForRatingQuery, usePostStaffRatingMutation } = staffRatings;
