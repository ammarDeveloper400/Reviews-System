import { getUser } from 'src/utils/functions';

import { baseAPI } from '../base-api';

export const interfaceTwoAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInterfaceTwoDetails: builder.query({
      query: () => ({
        url: `/v1/interface/interface2/${getUser()?.interface2}`,
        method: 'GET',
      }),
      providesTags: ['INTERFACE_TWO'],
    }),
    updateInterfaceTwo: builder.mutation({
      query: (payload) => ({
        url: `/v1/interface/interface2/${getUser()?.interface2}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['INTERFACE_TWO', 'INTERFACES_DETAILS'],
    }),
    addCustomerExperience: builder.mutation({
      query: (payload) => ({
        url: `/v1/interface/interface2/${getUser()?.interface2}/customer-experience`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['INTERFACE_TWO', 'INTERFACES_DETAILS'],
    }),
    updateCustomerExperience: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/v1/interface/interface2/${getUser()?.interface2}/customer-experience/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['INTERFACE_TWO', 'INTERFACES_DETAILS'],
    }),
    deleteCustomerExperience: builder.mutation({
      query: (id) => ({
        url: `/v1/interface/interface2/${getUser()?.interface2}/customer-experience/${id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['INTERFACE_TWO', 'INTERFACES_DETAILS'],
    }),
  }),
});

export const {
  useGetInterfaceTwoDetailsQuery,
  useUpdateInterfaceTwoMutation,
  useAddCustomerExperienceMutation,
  useUpdateCustomerExperienceMutation,
  useDeleteCustomerExperienceMutation,
} = interfaceTwoAPIs;
