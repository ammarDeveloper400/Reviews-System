import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const convertTo12HourFormat = (time) => {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  const adjustedHour = hourInt % 12 || 12; // Adjusts "00:00" to "12:00"

  return `${String(adjustedHour).padStart(2, '0')}:${minute} ${ampm}`;
};

export const getOrdinalSuffix = (i) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = i % 100;
  return i + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export const createCheckoutSession = async (payload) =>
  axios
    .post(`${BASE_URL}/v1/plans/create-checkout-session`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then((response) => response)
    .catch((err) => err.response);

export const verifyCheckoutSession = async (payload) =>
  axios
    .post(`${BASE_URL}/verify-checkout-session`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then((response) => response)
    .catch((err) => err.response);

export const baseUrl = window.location.origin;
