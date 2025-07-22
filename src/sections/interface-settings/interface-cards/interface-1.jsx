/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from 'react-toastify';
/* eslint-disable no-unused-expressions */
import { useState, useEffect } from 'react';

import {
  Box,
  Card,
  Stack,
  Skeleton,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import {
  useUpdateInterfaceOneMutation,
  useGetInterfaceOneDetailsQuery,
} from 'src/services/interface-settings/interface-one';

import CustomToggleButton from 'src/components/custom-toggle/toggle';
import CustomSwitchWithText from 'src/components/custom-switch/switch';

const InterfaceOne = () => {
  const { data, isLoading, isFetching } = useGetInterfaceOneDetailsQuery();

  // const [showStaffFaces, setShowStaffFaces] = useState(data?.data?.staffFaces);
  const [popupText, setPopupText] = useState('');
  const [time, setTime] = useState('');

  const [updateInterface] = useUpdateInterfaceOneMutation();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isTimerInputFocused, setIsTimerInputFocused] = useState(false);

  const handleUpdate = async (newStatus, newShowStaffFaces) => {
    const payload = {
      status: newStatus,
      timerPopupText: popupText,
      timerInSec: time,
      staffFaces: newShowStaffFaces,
    };
    try {
      await updateInterface(payload).unwrap();
      toast.success('Interface updated successfully.');
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    if (data) {
      setPopupText(data.data?.timerPopupText);
      setTime(data.data?.timerInSec);
    }
  }, [data]);

  return (
    <Card sx={{ p: '20px', borderRadius: '15px', color: '#000', minHeight: '300px' }}>
      {isLoading || isFetching ? (
        <Stack spacing={2}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rounded" width="100%" height={60} />
          <Skeleton variant="rounded" width="100%" height={60} />
        </Stack>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" gap={1} flexWrap="wrap">
            <Typography fontSize={20} fontWeight={600}>
              Interface 1: Get Staff Rated!
            </Typography>
            <CustomToggleButton
              handleUpdate={(newStatus) => handleUpdate(newStatus, data?.data?.staffFaces)}
              activeBtnText="Enable"
              inactiveBtnText="Disable"
              initialStatus={data?.data?.status} // Pass the correct status here
            />
          </Box>
          <Typography fontSize={14} mb={2}>
            Choose to display names only or images too
          </Typography>

          <Typography fontSize={14} fontWeight={500} mb={1.5}>
            Edit text that’s displayed next to the countdown timer
          </Typography>
          <TextField
            name="text_after_popup"
            type="text"
            size="small"
            variant="outlined"
            fullWidth
            disabled={!isInputFocused}
            value={popupText}
            onChange={(e) => setPopupText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    setIsInputFocused(!isInputFocused);
                    isInputFocused && handleUpdate();
                  }}
                  position="end"
                >
                  <IconButton sx={{ p: 0.3 }}>
                    {!isInputFocused ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.32 4.17578H5C3.895 4.17578 3 5.12478 3 6.29378V16.8818C3 18.0518 3.895 18.9998 5 18.9998H16C17.105 18.9998 18 18.0518 18 16.8818V9.13178L14.086 13.2758C13.7442 13.6413 13.2991 13.8938 12.81 13.9998L10.129 14.5678C8.379 14.9378 6.837 13.3048 7.187 11.4528L7.723 8.61378C7.82 8.10178 8.058 7.63078 8.407 7.26178L11.32 4.17578Z"
                          fill="#01565A"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.8457 2.31802C19.7446 2.06205 19.5964 1.82732 19.4087 1.62602C19.2242 1.42915 19.0017 1.27165 18.7547 1.16302C18.5114 1.05615 18.2485 1.00098 17.9827 1.00098C17.7169 1.00098 17.454 1.05615 17.2107 1.16302C16.9637 1.27165 16.7412 1.42915 16.5567 1.62602L16.0107 2.20402L18.8627 5.22402L19.4087 4.64502C19.5983 4.44524 19.7468 4.21011 19.8457 3.95302C20.0517 3.42749 20.0517 2.84355 19.8457 2.31802ZM17.4497 6.72102L14.5967 3.70002L9.8197 8.76002C9.74922 8.83511 9.70169 8.92879 9.6827 9.03002L9.1467 11.87C9.0767 12.24 9.3857 12.566 9.7347 12.492L12.4167 11.925C12.5143 11.9033 12.6031 11.8528 12.6717 11.78L17.4497 6.72102Z"
                          fill="#01565A"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.136Z"
                          fill="#00C820"
                        />
                      </svg>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#000',
                fontSize: '14px',
                height: '42px',
                borderRadius: '5px',
              },
            }}
            placeholder="Rate More Staff?"
          />
          <Typography fontSize={14} fontWeight={500} mt={2} mb={1}>
            Set Timer
          </Typography>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
            <TextField
              type="number"
              size="small"
              name="text_after_popup"
              variant="outlined"
              disabled={!isTimerInputFocused}
              value={time}
              onChange={(e) => {
                const { value } = e.target;
                // Update only if value is a positive integer, or clear if invalid
                setTime(value === '' || (/^\d+$/.test(value) && Number(value) > 0) ? value : '');
              }}
              InputProps={{
                min: 1,
                endAdornment: (
                  <InputAdornment
                    onClick={() => {
                      setIsTimerInputFocused(!isTimerInputFocused);
                      isTimerInputFocused && handleUpdate();
                    }}
                    position="end"
                  >
                    <Typography fontSize={14} color="rgba(0, 0, 0, 0.4)">
                      sec
                    </Typography>
                    <IconButton sx={{ p: 0.3, ml: 0.8 }}>
                      {!isTimerInputFocused ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.32 4.17578H5C3.895 4.17578 3 5.12478 3 6.29378V16.8818C3 18.0518 3.895 18.9998 5 18.9998H16C17.105 18.9998 18 18.0518 18 16.8818V9.13178L14.086 13.2758C13.7442 13.6413 13.2991 13.8938 12.81 13.9998L10.129 14.5678C8.379 14.9378 6.837 13.3048 7.187 11.4528L7.723 8.61378C7.82 8.10178 8.058 7.63078 8.407 7.26178L11.32 4.17578Z"
                            fill="#01565A"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.8457 2.31802C19.7446 2.06205 19.5964 1.82732 19.4087 1.62602C19.2242 1.42915 19.0017 1.27165 18.7547 1.16302C18.5114 1.05615 18.2485 1.00098 17.9827 1.00098C17.7169 1.00098 17.454 1.05615 17.2107 1.16302C16.9637 1.27165 16.7412 1.42915 16.5567 1.62602L16.0107 2.20402L18.8627 5.22402L19.4087 4.64502C19.5983 4.44524 19.7468 4.21011 19.8457 3.95302C20.0517 3.42749 20.0517 2.84355 19.8457 2.31802ZM17.4497 6.72102L14.5967 3.70002L9.8197 8.76002C9.74922 8.83511 9.70169 8.92879 9.6827 9.03002L9.1467 11.87C9.0767 12.24 9.3857 12.566 9.7347 12.492L12.4167 11.925C12.5143 11.9033 12.6031 11.8528 12.6717 11.78L17.4497 6.72102Z"
                            fill="#01565A"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.136Z"
                            fill="#00C820"
                          />
                        </svg>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#000',
                  fontSize: '14px',
                  height: '42px',
                  borderRadius: '5px',
                  width: '150px',
                },
              }}
              placeholder="Time"
            />
            <CustomSwitchWithText
              initialShowStaffFaces={data?.data?.staffFaces}
              // setShowStaffFaces={setShowStaffFaces}
              handleUpdate={(newStatus, newStaffFaces) => handleUpdate(newStatus, newStaffFaces)}
              status={data?.data?.status}
            />
            <Typography fontSize={16} fontWeight={400}>
            Display Staff
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
};

export default InterfaceOne;
