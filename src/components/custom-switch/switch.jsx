/* eslint-disable react/prop-types */
import React from 'react';

import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: '70px',
  height: '32px',
  padding: '0px',
  '& .MuiSwitch-switchBase': {
    color: '#EFF7F9',
    padding: '1px',
    '&.Mui-checked': {
      transform: 'translateX(38px)',
      color: '#EFF7F9',
      '& + .MuiSwitch-track': {
        backgroundColor: '#EFF7F9',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    color: '#01565A',
    width: '28px',
    height: '28px',
    margin: '1px',
  },
  '& .MuiSwitch-track': {
    borderRadius: '20px',
    backgroundColor: '#EFF7F9',
    opacity: '1 !important',
    '&:after, &:before': {
      color: '#000',
      fontSize: '14px',
      fontWeight:500,
      position: 'absolute',
      top: '6px',
    },
    '&:after': {
      content: "'ON'",
      right: '6px',
    },
    '&:before': {
      content: "'OFF'",
      left: '4px',
    },
  },
}));

export default function CustomSwitchWithText({
  initialShowStaffFaces,
  // setShowStaffFaces,
  handleUpdate,
  status,
}) {
  const [isChecked, setIsChecked] = React.useState(initialShowStaffFaces);

  React.useEffect(() => {
    setIsChecked(initialShowStaffFaces);
  }, [initialShowStaffFaces]);

  const handleChange = (event) => {
    const newValue = event.target.checked;

    setIsChecked(newValue);
    // setShowStaffFaces(newValue);
    handleUpdate(status, !newValue); // Use status directly or pass it as needed
  };

  return (
    <div>
      <CustomSwitch
        checked={!isChecked}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}
