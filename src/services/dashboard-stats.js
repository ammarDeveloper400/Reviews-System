import { baseAPI } from './base-api';
// import { USERS } from "./tags";

export const dashboardStatsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardLastActive: builder.query({
      query: ({ storeId = '' }) => ({
        url: `/v1/dashboard/last-active?storeId=${storeId}`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardRatingsSubmitted: builder.query({
      query: ({ storeId = '', filterType = '' }) => ({
        url: `/v1/dashboard/total-submited-ratings?filterType=${filterType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardComments: builder.query({
      query: ({ storeId = '', filterType = '' }) => ({
        url: `/v1/dashboard/total-comments?filterType=${filterType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardAvgScore: builder.query({
      query: ({ storeId = '', filterType = '' }) => ({
        url: `/v1/dashboard/average-submited-rating?filterType=${filterType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardStaffPerformance: builder.query({
      query: ({ storeId = '', filterType = '' }) => ({
        url: `/v1/dashboard/staff-performance?filterType=${filterType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardOverallScore: builder.query({
      query: ({ storeId = '', filterType = '' }) => ({
        url: `/v1/dashboard/overall-score?filterType=${filterType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboard: builder.query({
      query: ({ storeId = '', filterType = '' }) => ({
        url: `/v1/dashboard/overall-score?filterType=${filterType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardCustomerComments: builder.query({
      query: ({ storeId = '', filterType = '', sortType = '' }) => ({
        url: `/v1/dashboard/customer-comments?filterType=${filterType}&sortType=${sortType}${
          storeId ? `&storeId=${storeId}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
    getDashboardCustomerExperience: builder.query({
      query: ({ storeId = '' }) => ({
        url: `/v1/dashboard/customer-experience/this-week${storeId ? `?storeId=${storeId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['DASHBOARD_STATS'],
    }),
  }),
});

export const {
  useGetDashboardLastActiveQuery,
  useGetDashboardRatingsSubmittedQuery,
  useGetDashboardCommentsQuery,
  useGetDashboardAvgScoreQuery,
  useGetDashboardStaffPerformanceQuery,
  useGetDashboardOverallScoreQuery,
  useGetDashboardCustomerCommentsQuery,
  useGetDashboardCustomerExperienceQuery,
} = dashboardStatsAPI;
