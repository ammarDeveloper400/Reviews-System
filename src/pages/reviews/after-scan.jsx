import { Helmet } from 'react-helmet-async';

import { AfterScanRatingView } from 'src/sections/reviews/Rating-staff/after-scan-rating/view';

// import { BlogView } from 'src/sections/blog/view';
// import { RateStaffView } from 'src/sections/reviews/rate-staff/view';

// ----------------------------------------------------------------------

export default function AfterScanPage() {
  return (
    <>
      <Helmet>
        <title> After Scan | RMS </title>
      </Helmet>

      <AfterScanRatingView />
    </>
  );
}
