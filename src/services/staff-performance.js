import { baseAPI } from './base-api';

export const staffPerformanceAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaffTableData: builder.query({
      query: () => ({
        url: `/v1/staff/perfomance/table`,
        method: 'GET',
      }),
      providesTags: ['STAFF_PERFORMANCE'],
    }),
    getStaffFilteredTableData: builder.query({
      query: ({ filterType, rangeValue, storeId = ' ' }) => ({
        url: `/v1/staff/perfomance/table/filter?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STAFF_PERFORMANCE'],
    }),
    getStaffChartData: builder.query({
      query: () => ({
        url: `/v1/staff/perfomance/charts`,
        method: 'GET',
      }),
      providesTags: ['STAFF_PERFORMANCE'],
    }),
    getStaffFilteredChartData: builder.query({
      query: ({ filterType, rangeValue, storeId = ' ' }) => ({
        url: `/v1/staff/perfomance/charts/filter?filterType=${filterType}${
          filterType === 'Custom' ? `&fromDate=${rangeValue[0]}&toDate=${rangeValue[1]}` : ''
        }${storeId !== ' ' ? `&storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['STAFF_PERFORMANCE'],
    }),
  }),
});

export const {
  useGetStaffTableDataQuery,
  useGetStaffFilteredTableDataQuery,
  useLazyGetStaffFilteredTableDataQuery,
  useGetStaffChartDataQuery,
  useLazyGetStaffFilteredChartDataQuery,
  useGetStaffFilteredChartDataQuery,
} = staffPerformanceAPIs;
