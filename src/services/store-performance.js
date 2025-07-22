import { baseAPI } from './base-api';

export const storePerformanceAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverallRatingsAndAverage: builder.query({
      query: ({ filterType, rangeValue, storeId = ' ' }) => ({
        url: `/v1/store/perfomance/overall?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getStoreTableData: builder.query({
      query: () => ({
        url: `/v1/store/perfomance/table`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getStoreFilteredTableData: builder.query({
      query: ({ filterType, rangeValue }) => ({
        url: `/v1/store/perfomance/table/filter?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getStoreChartData: builder.query({
      query: () => ({
        url: `/v1/store/perfomance/charts`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    getStoreFilteredChartData: builder.query({
      query: ({ filterType, rangeValue }) => ({
        url: `/v1/store/perfomance/charts/filter?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
    compareStores: builder.query({
      query: ({ store1, store2 }) => ({
        url: `/v1/store/perfomance/charts/compareTwoStores?storeId1=${store1}&storeId2=${store2}`,
        method: 'GET',
      }),
      providesTags: ['STORE_PERFORMANCE'],
    }),
  }),
});

export const {
  useGetOverallRatingsAndAverageQuery,
  useLazyGetOverallRatingsAndAverageQuery,
  useGetStoreTableDataQuery,
  useGetStoreFilteredTableDataQuery,
  useLazyGetStoreFilteredTableDataQuery,
  useGetStoreChartDataQuery,
  useLazyGetStoreFilteredChartDataQuery,
  useGetStoreFilteredChartDataQuery,
  useLazyCompareStoresQuery,
} = storePerformanceAPIs;
