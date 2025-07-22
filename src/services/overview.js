import { baseAPI } from './base-api';

export const overviewAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewDetails: builder.query({
      query: ({ storeId }) => ({
        url: `/v1/analytics/rating-overview?storeId=${storeId}`,
        method: 'GET',
      }),
      providesTags: ['OVERVIEW_DETAILS'],
    }),
    getGraphOverviewDetails: builder.query({
      query: (filters) => {
        // Convert filters object into query parameters
        const queryParams = filters
          ? new URLSearchParams(filters).toString() // Convert object to query string
          : '';
        return {
          url: `/v1/analytics/rating-overview/graph${queryParams ? `?${queryParams}` : ''}`,
          method: 'GET',
        };
      },
      providesTags: ['GRAPH_OVERVIEW_DETAILS'],
    }),
  }),
});

export const { useGetOverviewDetailsQuery, useGetGraphOverviewDetailsQuery } = overviewAPIs;
