import { baseAPI } from './base-api';

export const staffOnShiftAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaffOnShiftList: builder.query({
      query: () => ({
        url: `/v1/staff/shifts/today`,
        method: 'GET',
      }),
      providesTags: ['STAFF_ON_SHIFT_LIST'],
    }),
    getStaffOnShiftByStore: builder.query({
      query: ({ id }) => ({
        url: `/v1/staff/store/${id}/staffs`,
        method: 'GET',
      }),
      providesTags: ['STAFF_ON_SHIFT_LIST'],
    }),
    updateStaffOnShift: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/v1/staff/shifts/status/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['STAFF_ON_SHIFT_LIST'],
    }),
  }),
});

export const {
  useGetStaffOnShiftListQuery,
  useLazyGetStaffOnShiftListQuery,
  useLazyGetStaffOnShiftByStoreQuery,
  useGetStaffOnShiftByStoreQuery,
  useUpdateStaffOnShiftMutation,
} = staffOnShiftAPIs;
