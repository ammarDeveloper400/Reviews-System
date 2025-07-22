import { baseAPI } from './base-api';

export const rotaAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getRotaStaffMembersList: builder.query({
      query: ({ storeId = '' }) => ({
        url: `/v1/staff/status/all?storeId=${storeId}`,
        method: 'GET',
      }),
      providesTags: ['ROTA_STAFF_LIST'],
    }),
    adjustStaffRota: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/v1/staff/${id}/shifts`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['ROTA_STAFF_LIST', 'STAFF_ON_SHIFT_LIST', 'STAFF_LIST_FOR_RATING'],
    }),
  }),
});

export const { useGetRotaStaffMembersListQuery, useAdjustStaffRotaMutation } = rotaAPIs;
