/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ToggleContainer = styled('div')({
  border: '1px solid rgba(0, 0, 0, 0.30)',
  borderRadius: '40px',
  padding: '3px',
  backgroundColor: 'transparent',
  width: 'max-content',
  whiteSpace: 'nowrap',
});

const ToggleButton = styled(Button)(({ active }) => ({
  borderRadius: '20px',
  margin: '0 2px',
  fontSize: '13px',
  width: '80px',
  fontWeight: 400,
}));

const CustomToggleButton = ({
  activeBtnText = 'Active',
  inactiveBtnText = 'InActive',
  handleUpdate,
  initialStatus, // New prop for prefilled value
}) => {
  const [isActive, setIsActive] = useState(initialStatus);

  useEffect(() => {
    setIsActive(initialStatus);
  }, [initialStatus]);

  const handleClick = (newStatus) => {
    setIsActive(newStatus);
    handleUpdate(newStatus);
  };

  return (
    <ToggleContainer>
      <ToggleButton
        sx={{
          color: isActive ? '#fff' : '#02B81F',
          background: isActive ? '#02B81F' : '#fff',
          ':hover': { background: isActive ? '#02B81F' : '#fff' },
        }}
        active={isActive}
        onClick={() => handleClick(true)}
      >
        {activeBtnText}
      </ToggleButton>
      <ToggleButton
        sx={{
          color: !isActive ? '#fff' : '#EE3434',
          background: !isActive ? '#EE3434' : '#fff',
          ':hover': { background: !isActive ? '#EE3434' : '#fff' },
        }}
        active={!isActive}
        onClick={() => handleClick(false)}
      >
        {inactiveBtnText}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default CustomToggleButton;
