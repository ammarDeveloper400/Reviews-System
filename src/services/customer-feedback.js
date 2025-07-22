import { baseAPI } from './base-api';

export const storePerformanceAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaffNonStoreRatings: builder.query({
      query: ({ filterType = '', rangeValue, storeId = '' }) => ({
        url: `/v1/feedback/staff/qr?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getStaffStoreRatings: builder.query({
      query: ({ filterType = '', rangeValue, storeId = '' }) => ({
        url: `/v1/feedback/staff/mannual?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getStoreCustomerExperience: builder.query({
      query: ({ filterType = '', rangeValue, storeId = '' }) => ({
        url: `/v1/feedback/customer/mannual?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getNonStoreCustomerExperience: builder.query({
      query: ({ filterType = '', rangeValue, storeId = '' }) => ({
        url: `/v1/feedback/customer/qr?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
  }),
});

export const {
  useGetStaffStoreRatingsQuery,
  useGetStaffNonStoreRatingsQuery,
  useGetStoreCustomerExperienceQuery,
  useGetNonStoreCustomerExperienceQuery,
} = storePerformanceAPIs;
