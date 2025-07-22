import { Helmet } from 'react-helmet-async';

import { AfterScanThankYouView } from 'src/sections/reviews/after-scan-thank-you/view';

// import { BlogView } from 'src/sections/blog/view';
// import { RateStaffView } from 'src/sections/reviews/Rating-staff/rate-staff/view';

// ----------------------------------------------------------------------

export default function AfterScanThankYouPage() {
  return (
    <>
      <Helmet>
        <title> Thanks | RMS </title>
      </Helmet>

      <AfterScanThankYouView />
    </>
  );
}
