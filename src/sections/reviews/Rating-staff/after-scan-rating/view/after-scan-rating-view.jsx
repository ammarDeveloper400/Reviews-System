// import { faker } from '@faker-js/faker';

// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

import { useEffect } from 'react';
// import Barcode from './barcode';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, Container, CircularProgress } from '@mui/material';

import {
  useGetInterfacesDetailsQuery,
  useLazyGetInterfacesDetailsQuery,
} from 'src/services/get-reviews/interfacesDetails';

import AfterScanSlider from '../after-scan-rating-slider';

// import BarcodeTwo from '../barcodeTwo';
// import AfterScanSlider from '../../../../../components/after-scan-rating-slider';
// import StaffModal from '../barcode';

// ----------------------------------------------------------------------

export default function AfterScanView() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { data } = useGetInterfacesDetailsQuery(searchParams.get('store'));

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
            <AfterScanSlider
              interfaces={data?.interfaces}
              interfaceDetails={data?.interfaces?.interface1}
            />
            {data?.interfaces?.interface2?.status && (
              <Box display="flex" justifyContent="center" mt="60px">
                <Button
                  LinkComponent={Link}
                  to={`/after-scan-experience?store=${searchParams.get('store')}`}
                  variant="contained"
                  sx={{
                    background: '#FFC500',
                    color: '#000',
                    fontSize: '18px',
                    fontWeight: 400,
                    px: '30px',
                    ':hover': { background: '#FFC500' },
                    gap: '10px',
                  }}
                >
                  Move to Your Experience
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M8.293 2.29279C8.48053 2.10532 8.73484 2 9 2C9.26516 2 9.51947 2.10532 9.707 2.29279L14.207 6.79279C14.3945 6.98031 14.4998 7.23462 14.4998 7.49979C14.4998 7.76495 14.3945 8.01926 14.207 8.20679L9.707 12.7068C9.5184 12.8889 9.2658 12.9897 9.0036 12.9875C8.7414 12.9852 8.49059 12.88 8.30518 12.6946C8.11977 12.5092 8.0146 12.2584 8.01233 11.9962C8.01005 11.734 8.11084 11.4814 8.293 11.2928L11 8.49979H1.5C1.23478 8.49979 0.98043 8.39443 0.792893 8.20689C0.605357 8.01936 0.5 7.765 0.5 7.49979C0.5 7.23457 0.605357 6.98022 0.792893 6.79268C0.98043 6.60514 1.23478 6.49979 1.5 6.49979H11L8.293 3.70679C8.10553 3.51926 8.00021 3.26495 8.00021 2.99979C8.00021 2.73462 8.10553 2.48031 8.293 2.29279Z"
                      fill="black"
                    />
                  </svg>
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      {/* {open && (
        <StaffModal title="Add Staff Member" acceptBtnText="Add" open={open} setOpen={setOpen} />
      )} */}
    </>
  );
}
