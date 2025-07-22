import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, CircularProgress } from '@mui/material';

import {
  useGetInterfacesDetailsQuery,
  useLazyGetInterfacesDetailsQuery,
} from 'src/services/get-reviews/interfacesDetails';

import Barcode from '../barcode';
import ExperienceRatingSlider from '../experience-slider';

export default function RateExperienceView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetInterfacesDetailsQuery(searchParams.get('store'));

  const [getInterfaceDetails, { isLoading }] = useLazyGetInterfacesDetailsQuery();

  useEffect(() => {
    const fetchInterfaceDetails = async () => {
      try {
        const res = await getInterfaceDetails(searchParams.get('store')).unwrap();
        if (!res?.interfaces?.interface2?.status) {
          navigate(`/social-media?store=${searchParams.get('store')}`);
        }
      } catch (error) {
        console.error('Error fetching interface details:', error);
      }
    };

    fetchInterfaceDetails();
  }, [getInterfaceDetails, searchParams, navigate]);

  // Don't render the component if status is false
  if (!data?.interfaces?.interface2?.status) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ pb: '24px' }}>
      {isLoading ? (
        <Box py={5} textAlign="center">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          <ExperienceRatingSlider
            interfaces={data?.interfaces}
            interfaceDetails={data?.interfaces?.interface2}
          />
          <Barcode interfaceDetails={data?.interfaces?.interface2} />
        </>
      )}
    </Container>
  );
}
