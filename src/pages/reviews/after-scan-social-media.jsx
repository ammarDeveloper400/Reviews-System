import { Helmet } from 'react-helmet-async';

// import { AfterScanRatingView } from 'src/sections/reviews/Rating-staff/after-scan-rating/view';
import AfterScanVisitView from 'src/sections/reviews/social-media-scan/social-media-links/view/after-scan-rating-view';

// import { BlogView } from 'src/sections/blog/view';
// import { RateStaffView } from 'src/sections/reviews/rate-staff/view';

// ----------------------------------------------------------------------

export default function AfterScanVisitPage() {
  return (
    <>
      <Helmet>
        <title> Social Media | RMS </title>
      </Helmet>

      <AfterScanVisitView />
    </>
  );
}
