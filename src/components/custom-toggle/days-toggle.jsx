/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';

const CustomToggleButton = styled(ToggleButton)(({ theme, readOnly }) => ({
  borderRadius: '50px !important',
  width: '30px',
  height: '30px',
  color: '#01565A',
  backgroundColor: 'transparent',
  fontSize: '11px',
  fontWeight: 400,
  border: '1px solid #01565A !important',
  cursor: readOnly ? 'default' : 'pointer',
  '&.Mui-disabled': {
    backgroundColor: '#01565A',
    color: '#fff',
    opacity: '0.5',
    cursor: 'default',
  },
  '&.Mui-selected': {
    backgroundColor: '#01565A',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#01565A',
      color: '#ffffff',
      border: '1px solid #01565A !important',
    },
  },
  '&:hover': {
    backgroundColor: readOnly ? 'transparent' : '#01565A',
    color: readOnly ? '#01565A' : '#ffffff',
  },
}));

const DaysToggleButtons = ({ shifts, setShifts, readOnly }) => {
  const [selectedDays, setSelectedDays] = React.useState([]);

  useEffect(() => {
    const activeDays = shifts
      ? Object.keys(shifts)
          .filter((day) => shifts[day]?.active)
          .map((day) => day?.substring(0, 2).charAt(0).toUpperCase() + day?.substring(1, 2))
      : [];
    setSelectedDays(activeDays);
  }, [shifts]);

  const handleDayToggle = (event, newSelectedDays) => {
    if (!readOnly) {
      setSelectedDays(newSelectedDays);

      // Create a deep copy of the shifts object to avoid mutation issues
      const updatedShifts = Object.keys(shifts).reduce((acc, day) => {
        acc[day] = { ...shifts[day] };
        return acc;
      }, {});

      // Update the active status for each day
      Object.keys(updatedShifts).forEach((day) => {
        const dayAbbreviation = day.substring(0, 2).charAt(0).toUpperCase() + day.substring(1, 2);
        updatedShifts[day].active = newSelectedDays.includes(dayAbbreviation);
      });

      // Set the updated shifts state in the parent component
      setShifts(updatedShifts);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedDays}
      onChange={handleDayToggle}
      aria-label="days of the week"
      exclusive={false}
      sx={{ gap: 0.8 }}
    >
      <CustomToggleButton value="Mo" aria-label="Monday" readOnly={readOnly}>
        Mo
      </CustomToggleButton>
      <CustomToggleButton value="Tu" aria-label="Tuesday" readOnly={readOnly}>
        Tu
      </CustomToggleButton>
      <CustomToggleButton value="We" aria-label="Wednesday" readOnly={readOnly}>
        We
      </CustomToggleButton>
      <CustomToggleButton value="Th" aria-label="Thursday" readOnly={readOnly}>
        Th
      </CustomToggleButton>
      <CustomToggleButton value="Fr" aria-label="Friday" readOnly={readOnly}>
        Fr
      </CustomToggleButton>
      <CustomToggleButton value="Sa" aria-label="Saturday" readOnly={readOnly}>
        Sa
      </CustomToggleButton>
      <CustomToggleButton value="Su" aria-label="Sunday" readOnly={readOnly}>
        Su
      </CustomToggleButton>
    </ToggleButtonGroup>
  );
};

export default DaysToggleButtons;
