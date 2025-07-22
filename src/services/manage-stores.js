import { baseAPI } from './base-api';

export const manageStoresAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStoresList: builder.query({
      query: () => ({
        url: `/v1/store`,
        method: 'GET',
      }),
      providesTags: ['STORES_LIST'],
    }),
    addStore: builder.mutation({
      query: (payload) => ({
        url: '/v1/store/create',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['STORES_LIST'],
    }),
    updateStore: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/v1/store/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['STORES_LIST'],
    }),
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/v1/store/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['STORES_LIST'],
    }),
  }),
});

export const {
  useGetStoresListQuery,
  useAddStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = manageStoresAPIs;
