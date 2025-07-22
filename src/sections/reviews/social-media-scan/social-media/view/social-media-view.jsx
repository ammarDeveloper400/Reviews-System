/* eslint-disable react-hooks/exhaustive-deps */
// import { faker } from '@faker-js/faker';

// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, CircularProgress } from '@mui/material';

import {
  useGetInterfacesDetailsQuery,
  useLazyGetInterfacesDetailsQuery,
} from 'src/services/get-reviews/interfacesDetails';

// import Barcode from './barcode';
import BarcodeTwo from '../barcode';
import SocialMediaSlider from '../social-media-slider';
// import StaffModal from '../barcode';

// ----------------------------------------------------------------------

export default function SocialMediaView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetInterfacesDetailsQuery(searchParams.get('store'));

  const [getInterfaceDetails, { isLoading }] = useLazyGetInterfacesDetailsQuery();

  useEffect(() => {
    const fetchInterfaceDetails = async () => {
      try {
        const res = await getInterfaceDetails(searchParams.get('store')).unwrap();
        if (!res?.interfaces?.interface3?.status) {
          navigate(`/thanks?store=${searchParams.get('store')}`);
        }
      } catch (error) {
        console.error('Error fetching interface details:', error);
      }
    };

    fetchInterfaceDetails();
  }, [getInterfaceDetails, searchParams, navigate]);

  // Don't render the component if status is false
  if (!data?.interfaces?.interface3?.status) {
    return null;
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: '32px' }}>
        {isLoading ? (
          <Box py={5} textAlign="center">
            <CircularProgress size={50} />
          </Box>
        ) : (
          <>
            <SocialMediaSlider interfaceDetails={data?.interfaces} />
            <BarcodeTwo interfaceDetails={data?.interfaces?.interface3} />
          </>
        )}
      </Container>
      {/* {open && (
        <StaffModal title="Add Staff Member" acceptBtnText="Add" open={open} setOpen={setOpen} />
      )} */}
    </>
  );
}
