import { baseAPI } from './base-api';

export const manageStaffAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaffMembersList: builder.query({
      query: () => ({
        url: `/v1/staff`,
        method: 'GET',
      }),
      providesTags: ['STAFF_LIST'],
    }),
    getStaffMembersByStore: builder.query({
      query: ({ id }) => ({
        url: `/v1/staff/store/${id}`,
        method: 'GET',
      }),
      providesTags: ['STAFF_LIST'],
    }),
    addStaffMember: builder.mutation({
      query: (payload) => ({
        url: '/v1/staff/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['STAFF_LIST', 'STAFF_LIST_FOR_RATING'],
    }),
    updateStaffMember: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/v1/staff/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['STAFF_LIST', 'STAFF_LIST_FOR_RATING'],
    }),
    deleteStaffMember: builder.mutation({
      query: (id) => ({
        url: `/v1/staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['STAFF_LIST'],
    }),
  }),
});

export const {
  useGetStaffMembersListQuery,
  useAddStaffMemberMutation,
  useUpdateStaffMemberMutation,
  useDeleteStaffMemberMutation,
  useLazyGetStaffMembersByStoreQuery,
} = manageStaffAPIs;
