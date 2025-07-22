/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';
import ApexChart from 'react-apexcharts';

import { Box, Card, useTheme, Typography, CircularProgress } from '@mui/material';

const RatingsChart = ({
  data,
  isLoading,
  isFetching,
  duration,
  dateRange,
  durationValue,
  ratings,
}) => {
  const theme = useTheme();

  const getDateRange = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const dateArray = [];

    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      dateArray.push(currentDate.format('DD MMM'));
      currentDate = currentDate.add(1, 'day');
    }

    return dateArray;
  };

  // Generate categories based on duration
  const generateCategories = (duration) => {
    switch (duration) {
      case 'day':
        return Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
      case 'weeks':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      case 'months': {
        const selectedDate = dayjs(durationValue); // Convert durationValue to a dayjs object
        const year = selectedDate.year(); // Get the year from durationValue
        const month = selectedDate.month(); // Get the month (0-based index) from durationValue
        const daysInMonth = dayjs(new Date(year, month + 1, 0)).date(); // Get the number of days in that month
        return Array.from({ length: daysInMonth }, (_, i) => i + 1); // [1, 2, 3, ..., daysInMonth]
      }
      case 'custom':
        return getDateRange(dateRange?.start, dateRange?.end); // Custom range based on start and end dates
      default:
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  };

  const categories = generateCategories(duration);

  const series = [
    {
      name: 'Ratings',
      data: data && data,
    },
  ];

  const options = {
    theme: {
      mode: theme.palette.mode,
    },
    chart: {
      toolbar: { show: false },
      height: 360,
      type: 'area',
      fontFamily: theme.typography.fontFamily,
      background: theme.palette.mode === 'dark' ? '#0C0020' : 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    legend: {
      show: false,
    },
    colors: ['#01565A'],
    grid: {
      borderColor: 'transparent',
    },
    xaxis: {
      title: {
        text: 'Timeline',
        style: {
          fontSize: '16px',
          fontWeight: 400,
        },
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: true,
        color: '#000',
      },
      // type: 'datetime',
      categories,
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0.55,
      },
    },
    yaxis: {
      title: {
        text: 'Number of ratings',
        style: {
          fontSize: '16px',
          fontWeight: 400,
        },
      },
      axisBorder: {
        show: true,
        color: '#000',
      },
      labels: {
        formatter: (value) => `${value}`,
      },
    },
    // tooltip: {
    //   enabled: true,
    //   y: {
    //     formatter (value) {
    //       return `Staff Ratings: ${ratings?.staffRatings} | Customer Experience: ${ratings?.customerExperienceRatings}`;
    //     },
    //     title: {
    //       formatter: (seriesName) => 'Ratings',
    //     },
    //   },
    // },
  };

  return (
    <Card
      sx={{
        p: '10px',
        pr: 3,
        borderRadius: '10px',
        color: '#000',
        height: '100%',
      }}
    >
      <Box display="flex" justifyContent="end" mt={1}>
        <Typography>
          <span style={{ fontWeight: 500 }}>Selected Duration: </span>
          {duration === 'day'
            ? dayjs(durationValue)?.format('DD MMM YYYY')
            : duration === 'weeks'
            ? `${dayjs(dateRange?.start, 'MM/DD/YYYY').format('DD MMM YYYY')} - ${dayjs(
                dateRange?.end,
                'MM/DD/YYYY'
              ).format('DD MMM YYYY')}`
            : duration === 'months'
            ? dayjs(durationValue)?.format('MMMM YYYY')
            : duration === 'annual'
            ? dayjs(durationValue)?.format('YYYY')
            : `${dayjs(dateRange?.start, 'MM/DD/YYYY').format('DD MMM YYYY')} - ${dayjs(
                dateRange?.end,
                'MM/DD/YYYY'
              ).format('DD MMM YYYY')}`}
        </Typography>
      </Box>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ApexChart options={options} series={series} type="area" height={360} />
      )}
    </Card>
  );
};

export default RatingsChart;
