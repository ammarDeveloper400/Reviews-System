import { baseAPI } from './base-api';

export const notificationAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/v1/notifications`,
        method: 'GET',
      }),
      providesTags: ['NOTIFICATIONS_LIST'],
    }),
    markAsReadNotifications: builder.mutation({
      query: () => ({
        url: `/v1/notifications/mark-read`,
        method: 'PUT',
        body: {},
      }),
      invalidatesTags: ['NOTIFICATIONS_LIST'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkAsReadNotificationsMutation,
} = notificationAPIs;
