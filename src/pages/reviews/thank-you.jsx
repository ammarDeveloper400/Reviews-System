import { Helmet } from 'react-helmet-async';

// import { BlogView } from 'src/sections/blog/view';
// import { RateStaffView } from 'src/sections/reviews/Rating-staff/rate-staff/view';
import { ThankYouView } from 'src/sections/reviews/thank-you/view';

// ----------------------------------------------------------------------

export default function ThankYouPage() {
  return (
    <>
      <Helmet>
        <title> Thanks | RMS </title>
      </Helmet>

      <ThankYouView />
    </>
  );
}
