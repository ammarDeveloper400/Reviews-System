import Container from '@mui/material/Container';

import ContactForm from '../form';

// ----------------------------------------------------------------------

export default function ContactUsView() {
  return (
    <Container maxWidth="lg" sx={{ my: { md: '70px', xs: '30px' } }}>
      <ContactForm />
    </Container>
  );
}
