import { baseAPI } from '../base-api';

export const interfacesDetailsAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInterfacesDetails: builder.query({
      query: (id) => ({
        url: `/v1/anonymous/user-interfaces/${id}`,
        method: 'GET',
      }),
      providesTags: ['INTERFACES_DETAILS'],
    }),
    getStoreDetails: builder.query({
      query: (id) => ({
        url: `/v1/anonymous/store-details/${id}`,
        method: 'GET',
      }),
      providesTags: ['STORE_DETAILS'],
    }),
  }),
});

export const {
  useGetInterfacesDetailsQuery,
  useLazyGetInterfacesDetailsQuery,
  useGetStoreDetailsQuery,
} = interfacesDetailsAPIs;
