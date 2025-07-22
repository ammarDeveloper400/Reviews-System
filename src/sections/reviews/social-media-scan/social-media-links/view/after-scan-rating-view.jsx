import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Container, CircularProgress } from '@mui/material';

import {
  useGetInterfacesDetailsQuery,
  useLazyGetInterfacesDetailsQuery,
} from 'src/services/get-reviews/interfacesDetails';

import SocialMediaVisitSlider from 'src/sections/reviews/social-media-scan/social-media-links/social-media-links-slider';

export default function AfterScanVisitView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetInterfacesDetailsQuery(searchParams.get('store'));

  const [getInterfaceDetails, { isLoading }] = useLazyGetInterfacesDetailsQuery();

  useEffect(() => {
    const fetchInterfaceDetails = async () => {
      try {
        const res = await getInterfaceDetails(searchParams.get('store')).unwrap();
        if (!res?.interfaces?.interface3?.status) {
          navigate(`/after-scan-thanks?store=${searchParams.get('store')}`);
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
    <Container maxWidth="xl" sx={{ pb: '32px' }}>
      {isLoading ? (
        <Box py={5} textAlign="center">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <SocialMediaVisitSlider />
      )}
    </Container>
  );
}
