import { baseAPI } from './base-api';

export const settingsAndNotificationsAPIs = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplatesList: builder.query({
      query: () => ({
        url: `/v1/settings/email-templates`,
        method: 'GET',
      }),
      providesTags: ['EMAIL_TEMPLATES_LIST'],
    }),
    addEmailTemplate: builder.mutation({
      query: (payload) => ({
        url: '/v1/settings/email-templates',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['EMAIL_TEMPLATES_LIST'],
    }),
    updateEmailTemplate: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/v1/settings/email-templates/${id}`,
        method: 'PUT',
        body: { ...payload },
      }),
      invalidatesTags: ['EMAIL_TEMPLATES_LIST'],
    }),
    deleteEmailTemplate: builder.mutation({
      query: (id) => ({
        url: `/v1/settings/email-templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EMAIL_TEMPLATES_LIST'],
    }),
    setEmailPreferenceForManagement: builder.mutation({
      query: (payload) => ({
        url: '/v1/settings/set-email-preferences/boss',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['EMAIL_TEMPLATES_LIST'],
    }),
    setEmailPreferenceForStaff: builder.mutation({
      query: (payload) => ({
        url: '/v1/settings/set-email-preferences',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['EMAIL_TEMPLATES_LIST', 'EMAIL_PREFERENCES_LIST'],
    }),
    getEmailPreferences: builder.query({
      query: () => ({
        url: `/v1/settings/email-preferences`,
        method: 'GET',
      }),
      providesTags: ['EMAIL_PREFERENCES_LIST'],
    }),
    deleteEmailPreference: builder.mutation({
      query: ({ type, preference }) => ({
        url: `/v1/settings/email-preferences?type=${type}&preference=${preference}`,
        method: 'PUT',
      }),
      invalidatesTags: ['EMAIL_PREFERENCES_LIST'],
    }),

    // Management Email preferences

    getBossEmailPreferences: builder.query({
      query: () => ({
        url: `/v1/settings/email-preferences/boss`,
        method: 'GET',
      }),
      providesTags: ['BOSS_EMAIL_PREFERENCES'],
    }),
    updateBossEmailPreference: builder.mutation({
      query: (payload) => ({
        url: `/v1/settings/email-preferences/boss`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['BOSS_EMAIL_PREFERENCES'],
    }),
  }),
});

export const {
  useGetEmailTemplatesListQuery,
  useAddEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useSetEmailPreferenceForManagementMutation,
  useSetEmailPreferenceForStaffMutation,
  useGetEmailPreferencesQuery,
  useDeleteEmailPreferenceMutation,
  useGetBossEmailPreferencesQuery,
  useUpdateBossEmailPreferenceMutation,
} = settingsAndNotificationsAPIs;
