import { baseAPI } from './base-api';

export const subscriptionPlansAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlanRanges: builder.query({
      query: () => ({
        url: `/v1/plans/ranges`,
        method: 'GET',
      }),
      providesTags: ['PLAN_RANGES'],
    }),
    getPlanDetails: builder.query({
      query: ({ id }) => ({
        url: `/v1/plans/${id}`,
        method: 'GET',
      }),
      providesTags: ['PLAN_RANGES'],
    }),
    getCurrentPlan: builder.query({
      query: () => ({
        url: `/v1/plans/currentplan`,
        method: 'GET',
      }),
      providesTags: ['CURRENT_PLAN'],
    }),
    cancelSubscriptionPlan: builder.mutation({
      query: () => ({
        url: `/v1/plans/cancel-subscription`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CURRENT_PLAN', 'PROFILE'],
    }),
  }),
});

export const {
  useGetPlanRangesQuery,
  useLazyGetPlanDetailsQuery,
  useGetCurrentPlanQuery,
  useCancelSubscriptionPlanMutation,
} = subscriptionPlansAPIs;
