/* eslint-disable react/prop-types */
import React from 'react';

import { Select, MenuItem } from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      color: '#000',
      boxShadow: 'none',
      borderRadius: '10px',
    },
  },
};

const CustomSelect = ({ name, label, options, value = ' ', handleChange, width = 180 }) => (
  <Select
    id={name}
    type="text"
    value={value}
    name={name}
    onChange={handleChange}
    MenuProps={MenuProps}
    displayEmpty
    IconComponent={(props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
      >
        <path
          d="M15.6478 0.34416C15.4222 0.123795 15.1163 8.76423e-07 14.7974 8.48538e-07C14.4784 8.20654e-07 14.1725 0.123795 13.947 0.34416L7.99274 6.16269L2.03852 0.344159C1.81166 0.13004 1.50781 0.0115601 1.19242 0.014238C0.87703 0.0169159 0.575334 0.140538 0.352313 0.358478C0.12929 0.576417 0.00278639 0.871238 4.64601e-05 1.17944C-0.00269443 1.48764 0.118548 1.78457 0.33766 2.00626L7.14231 8.65584C7.36788 8.87621 7.67378 9 7.99274 9C8.3117 9 8.6176 8.87621 8.84317 8.65584L15.6478 2.00626C15.8733 1.78583 16 1.4869 16 1.17521C16 0.863521 15.8733 0.564591 15.6478 0.34416Z"
          fill="black"
        />
      </svg>
    )}
    sx={{
      color: '#000',
      height: '40px',
      borderWidth: '1px',
      fontSize: '15px',
      borderRadius: '30px',
      background: '#fff',
      minWidth: { xs: 'auto', md: '180px' },
      width: { xs: '100%', sm: width },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `#0000004D`,
      },
      '& fieldset': {
        borderWidth: '1px',
      },
      '& .MuiSelect-icon': {
        top: '18px',
        right: '14px',
      },
    }}
  >
    <MenuItem value=" ">{label}</MenuItem>
    {options?.map((item, index) => (
      <MenuItem key={index} value={item?.value}>
        {item?.label}
      </MenuItem>
    ))}
  </Select>
);

export default CustomSelect;
