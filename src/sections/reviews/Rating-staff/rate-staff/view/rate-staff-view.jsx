/* eslint-disable react-hooks/exhaustive-deps */
// import { faker } from '@faker-js/faker';

// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, CircularProgress } from '@mui/material';

import {
  useGetInterfacesDetailsQuery,
  useLazyGetInterfacesDetailsQuery,
} from 'src/services/get-reviews/interfacesDetails';

import Barcode from '../barcode';
import StaffRatingSlider from '../staff-rating-slider';
// import StaffModal from '../barcode';

// ----------------------------------------------------------------------

export default function RateMoreStaffView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetInterfacesDetailsQuery(searchParams.get('store'));
  const [isStaffRated, setIsStaffRated] = useState(false);

  const initialTime = data?.interfaces && data?.interfaces?.interface1?.timerInSec;

  const [countDownTime, setCountDownTime] = useState(initialTime);
  const [timerKey, setTimerKey] = useState(0); // Key to reset timer

  useEffect(() => {
    if (data) {
      setCountDownTime(data?.timer);
    }
  }, [data]);

  const resetTimer = () => {
    setCountDownTime(initialTime);
    setTimerKey((prevKey) => prevKey + 1); // Increment key to reset timer
  };

  const [getInterfaceDetails, { isLoading }] = useLazyGetInterfacesDetailsQuery();

  useEffect(() => {
    const fetchInterfaceDetails = async () => {
      try {
        const res = await getInterfaceDetails(searchParams.get('store')).unwrap();
        if (!res?.interfaces?.interface1?.status) {
          navigate(`/rate-experience?store=${searchParams.get('store')}`);
        }
      } catch (error) {
        console.error('Error fetching interface details:', error);
      }
    };

    fetchInterfaceDetails();
  }, [getInterfaceDetails, searchParams, navigate]);

  // Don't render the component if status is false
  if (!data?.interfaces?.interface1?.status) {
    return null;
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 4 }}>
        {isLoading ? (
          <Box py={5} textAlign="center">
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <StaffRatingSlider
              setIsStaffRated={setIsStaffRated}
              interfaceDetails={data?.interfaces?.interface1}
              interfaces={data?.interfaces}
              resetTimer={resetTimer}
            />
            <Barcode
              isStaffRated={isStaffRated}
              interfaceDetails={data?.interfaces?.interface1}
              countDownTime={countDownTime} // Pass countdown details
              timerKey={timerKey}
            />
          </>
        )}
      </Container>
      {/* {open && (
        <StaffModal title="Add Staff Member" acceptBtnText="Add" open={open} setOpen={setOpen} />
      )} */}
    </>
  );
}
