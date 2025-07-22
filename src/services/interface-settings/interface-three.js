import { getUser } from 'src/utils/functions';

import { baseAPI } from '../base-api';

export const interfaceThreeAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInterfaceThreeDetails: builder.query({
      query: () => ({
        url: `/v1/interface/interface3/${getUser()?.interface3}`,
        method: 'GET',
      }),
      providesTags: ['INTERFACE_THREE'],
    }),
    updateInterfaceThree: builder.mutation({
      query: (payload) => ({
        url: `/v1/interface/interface3/${getUser()?.interface3}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['INTERFACE_THREE', 'INTERFACES_DETAILS'],
    }),
  }),
});

export const { useGetInterfaceThreeDetailsQuery, useUpdateInterfaceThreeMutation } =
  interfaceThreeAPIs;
