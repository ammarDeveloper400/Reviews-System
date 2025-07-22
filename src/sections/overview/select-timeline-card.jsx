/* eslint-disable react/prop-types */
import DatePicker from 'react-multi-date-picker';
import React, { useRef, useState, useEffect } from 'react';

import { Box, Card, Stack, Button, Typography } from '@mui/material';

const SelectTimelineCard = ({ onSelect }) => {
  const [value, setValue] = useState(null); // Start with null to clear previous value
  const [pickerType, setPickerType] = useState(''); // Default to day picker
  const [forceOpen, setForceOpen] = useState(false); // State to force calendar to open
  const datePickerRef = useRef();

  const handleButtonClick = (type) => {
    setPickerType(type);
    setValue(null); // Clear the previous value
    setForceOpen((prev) => !prev); // Toggle forceOpen to trigger re-render
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    if ((datePickerRef.current && forceOpen) || (datePickerRef.current && pickerType)) {
      datePickerRef.current.openCalendar(); // Open the calendar programmatically
    }
  }, [pickerType, forceOpen]); // Effect runs when forceOpen changes

  const handleDateChange = (val) => {
    setValue(val);
    if (value) {
      onSelect(val, pickerType);
    }
  };

  return (
    <Card
      sx={{
        p: 0,
        borderRadius: '10px',
        color: '#000',
        overflow: 'visible',
        height: '100%',
      }}
    >
      <Typography textAlign="center" fontWeight={500} fontSize={16} mb={5} pt={2}>
        Select Timeline
      </Typography>
      <Stack>
        {['Day', 'Weeks', 'Months', 'Annual', 'Custom'].map((item) => (
          <Box key={item}>
            {pickerType === item.toLowerCase() && (
              <DatePicker
                ref={datePickerRef}
                value={value}
                onChange={handleDateChange}
                onlyYearPicker={pickerType === 'annual'}
                onlyMonthPicker={pickerType === 'months'}
                weekPicker={pickerType === 'weeks'}
                range={pickerType === 'custom'}
                style={{ display: 'none' }}
                calendarPosition="left"
                scrollSensitive
                weekDays={weekDays}
                months={months}
                weekStartDayIndex={1}
              />
            )}
            <Button
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#000',
                width: 1,
                justifyContent: 'start',
                p: '14px 24px',
                borderRadius: 0,
                // bgcolor: pickerType === item.toLowerCase() ? 'primary.main' : 'transparent',
                ':hover': {
                  bgcolor: 'primary.main',
                  color: '#fff',
                },
              }}
              onClick={() => handleButtonClick(item.toLowerCase())}
            >
              {item}
            </Button>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default SelectTimelineCard;
