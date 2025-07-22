/* eslint-disable react/prop-types */
import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
//   components: {
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           fontFamily: 'Inria Sans, sans-serif',
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#FDC358',
//             borderWidth: '3px',
//             borderRadius: '8px',
//             fontSize: '20px',
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#FDC358', // Hover border color
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#FDC358', // Focused border color
//           },
//           '& .MuiInputBase-input': {
//             color: '#FDC358',
//             fontSize: '20px',
//           },
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           fontFamily: 'Poppins, sans-serif',
//           color: '#000',
//           fontSize: '16px',
//           '&.Mui-focused': {
//             fontSize: '16px',
//             color: '#000',
//           },
//         },
//       },
//     },
//   },
// });

const CustomDatePicker = ({ name, label, value, handleChange, isFutureDateDisabled }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      value={value}
      name={name}
      onChange={handleChange}
      label={label}
      sx={{ width: 1, background: '#fff', borderRadius: '10px' }}
      disableFuture={isFutureDateDisabled}
      slotProps={{
        day: {
          sx: {
            '&.MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#01565A',
            },
          },
        },
      }}
      slots={{
        openPickerIcon: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              opacity="0.5"
              d="M25.6663 11.6668H2.33301V22.1668C2.33301 23.0951 2.70176 23.9853 3.35813 24.6417C4.01451 25.2981 4.90475 25.6668 5.83301 25.6668H22.1663C23.0946 25.6668 23.9848 25.2981 24.6412 24.6417C25.2976 23.9853 25.6663 23.0951 25.6663 22.1668V11.6668ZM8.16634 9.3335C7.85692 9.3335 7.56018 9.21058 7.34138 8.99179C7.12259 8.77299 6.99967 8.47625 6.99967 8.16683V3.50016C6.99967 3.19074 7.12259 2.894 7.34138 2.6752C7.56018 2.45641 7.85692 2.3335 8.16634 2.3335C8.47576 2.3335 8.77251 2.45641 8.9913 2.6752C9.21009 2.894 9.33301 3.19074 9.33301 3.50016V8.16683C9.33301 8.47625 9.21009 8.77299 8.9913 8.99179C8.77251 9.21058 8.47576 9.3335 8.16634 9.3335ZM19.833 9.3335C19.5236 9.3335 19.2268 9.21058 19.0081 8.99179C18.7893 8.77299 18.6663 8.47625 18.6663 8.16683V3.50016C18.6663 3.19074 18.7893 2.894 19.0081 2.6752C19.2268 2.45641 19.5236 2.3335 19.833 2.3335C20.1424 2.3335 20.4392 2.45641 20.658 2.6752C20.8768 2.894 20.9997 3.19074 20.9997 3.50016V8.16683C20.9997 8.47625 20.8768 8.77299 20.658 8.99179C20.4392 9.21058 20.1424 9.3335 19.833 9.3335Z"
              fill="#01565A"
            />
            <path
              d="M22.1663 4.6665H20.9997V8.1665C20.9997 8.47592 20.8768 8.77267 20.658 8.99146C20.4392 9.21025 20.1424 9.33317 19.833 9.33317C19.5236 9.33317 19.2268 9.21025 19.0081 8.99146C18.7893 8.77267 18.6663 8.47592 18.6663 8.1665V4.6665H9.33301V8.1665C9.33301 8.47592 9.21009 8.77267 8.9913 8.99146C8.77251 9.21025 8.47576 9.33317 8.16634 9.33317C7.85692 9.33317 7.56018 9.21025 7.34138 8.99146C7.12259 8.77267 6.99967 8.47592 6.99967 8.1665V4.6665H5.83301C4.90475 4.6665 4.01451 5.03525 3.35813 5.69163C2.70176 6.34801 2.33301 7.23825 2.33301 8.1665V11.6665H25.6663V8.1665C25.6663 7.23825 25.2976 6.34801 24.6412 5.69163C23.9848 5.03525 23.0946 4.6665 22.1663 4.6665Z"
              fill="#01565A"
            />
          </svg>
        ),
      }}
    />
  </LocalizationProvider>
);

export default CustomDatePicker;
