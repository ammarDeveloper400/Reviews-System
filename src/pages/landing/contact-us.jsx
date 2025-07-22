import { Helmet } from 'react-helmet-async';

// import { BlogView } from 'src/sections/blog/view';
import { ContactUsView } from 'src/sections/landing/contact-us/view';

// ----------------------------------------------------------------------

export default function ContactUsPage() {
  return (
    <>
      <Helmet>
        <title> Contact Us | RMS </title>
      </Helmet>

      <ContactUsView />
    </>
  );
}
