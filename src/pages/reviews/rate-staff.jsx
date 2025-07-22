import { Helmet } from 'react-helmet-async';

// import { BlogView } from 'src/sections/blog/view';
import { RateStaffView } from 'src/sections/reviews/Rating-staff/rate-staff/view';

// ----------------------------------------------------------------------

export default function RateStaffPage() {
  return (
    <>
      <Helmet>
        <title> Rate the Staff | RMS </title>
      </Helmet>

      <RateStaffView />
    </>
  );
}
