import { getUser } from 'src/utils/functions';

import { baseAPI } from '../base-api';

export const interfaceOneAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInterfaceOneDetails: builder.query({
      query: () => ({
        url: `/v1/interface/interface1/${getUser()?.interface1}`,
        method: 'GET',
      }),
      providesTags: ['INTERFACE_ONE'],
    }),
    updateInterfaceOne: builder.mutation({
      query: (payload) => ({
        url: `/v1/interface/interface1/${getUser()?.interface1}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['INTERFACE_ONE', 'INTERFACES_DETAILS'],
    }),
  }),
});

export const { useGetInterfaceOneDetailsQuery, useUpdateInterfaceOneMutation } = interfaceOneAPIs;
