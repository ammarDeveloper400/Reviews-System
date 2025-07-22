// RTK Query
import { toast } from 'react-toastify';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Store + configuration
// import { BASE_URL } from "@root/config";
// import { TAGS } from "./tags";
// import toast from "react-hot-toast";

const TAGS = [];
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create baseQuery instance
const baseQuery = async (args, api, extraOptions) => {
  const response = await fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('ngrok-skip-browser-warning', '69420');
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);
  if (response?.error && response?.error?.status === 401) {
    localStorage.clear();
    window.location.replace('/');
    toast.error(response?.error?.data?.message);
  }
  return response;
};

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
