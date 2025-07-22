import { Container } from '@mui/material';

// import { useGetTermsQuery } from 'src/services/landing-pages';

// ----------------------------------------------------------------------

export default function TermsConditionsView() {
  // const { data, isLoading } = useGetTermsQuery();

  return (
    <Container maxWidth="lg">
      {/* <Box py={{ md: '54px', xs: '30px' }}>
        <Typography fontSize="40px" fontWeight={700} textAlign="center">
          Terms & Conditions
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box sx={{ mt: 6 }} dangerouslySetInnerHTML={{ __html: data?.term?.content }} />
        )}
      </Box> */}
    </Container>
  );
}
