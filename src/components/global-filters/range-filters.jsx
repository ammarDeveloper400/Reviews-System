/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
import DatePicker from 'react-multi-date-picker';
import React, { useRef, Fragment, useState } from 'react';

import { Box, Button } from '@mui/material';

const RangeFilters = ({ options, onSelect }) => {
  const [pickerType, setPickerType] = useState(null);
  const [value, setValue] = useState([]);
  const datePickerRef = useRef(null);

  const handleButtonClick = (item) => {
    setValue([]);
    setPickerType(item);
    if (item === 'Custom') {
      if (datePickerRef.current) {
        datePickerRef.current.openCalendar();
      }
    } else {
      onSelect(item);
    }
  };

  // const handleDateChange = (val) => {
  //   setValue(val);
  //   const formattedValue = val.map((date) => date.toDate().toLocaleDateString());
  //   onSelect(formattedValue);
  // };

  const handleDateChange = (val) => {
    setValue(val);
    const formattedValue = val.map((date) => dayjs(date.toDate()).format('MM/DD/YYYY')); // Specify the desired format
    onSelect(formattedValue);
  };

  return (
    <Box display="flex" gap={1} flexWrap="wrap" position="relative">
      {options.map((item) => (
        <Fragment key={item}>
          <Button
            variant={pickerType === item ? 'contained' : 'outlined'}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              height: 36,
              px: 4,
              borderRadius: '30px',
              ':hover': { background: '#01565A', color: '#fff' },
            }}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </Button>
          {item === 'Custom' && (
            <DatePicker
              ref={datePickerRef}
              value={value}
              onChange={handleDateChange}
              range={pickerType === 'Custom'}
              style={{ display: 'none', width: 0 }}
              calendarPosition="bottom"
              containerStyle={{ position: 'absolute', bottom: 0, right: 60 }}
              scrollSensitive
              weekStartDayIndex={1}
              weekDays={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
            />
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default RangeFilters;
