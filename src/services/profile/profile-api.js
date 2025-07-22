import { baseAPI } from '../base-api';

// const ADMIN_BASE_URL = import.meta.env.VITE_API_ADMIN_BASE_URL;

export const profileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: '/v1/user/get-profile',
        method: 'GET',
      }),
      providesTags: ['PROFILE'],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/update-profile',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['PROFILE'],
    }),
    updateSelectedStore: builder.mutation({
      query: (payload) => ({
        url: '/v1/user/select-store',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['PROFILE'],
    }),
    // verifyToken: builder.mutation({
    //   query: (payload) => ({
    //     url: `${ADMIN_BASE_URL}/verify-token`,
    //     method: 'POST',
    //     body: payload,
    //   }),
    // }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdateSelectedStoreMutation,
  // useVerifyTokenMutation,
} = profileAPI;
