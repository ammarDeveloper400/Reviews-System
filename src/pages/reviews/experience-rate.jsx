import { Helmet } from 'react-helmet-async';

// import { RateMoreStaffView } from 'src/sections/reviews/Rating-staff/rate-more-staff/view';
import { RateExperienceView } from 'src/sections/reviews/rating-experience/experience-rate/view';

// import { BlogView } from 'src/sections/blog/view';
// import { RateStaffView } from 'src/sections/reviews/rate-staff/view';

// ----------------------------------------------------------------------

export default function RateExperiencePage() {
  return (
    <>
      <Helmet>
        <title> Rate Experience | RMS </title>
      </Helmet>

      <RateExperienceView />
    </>
  );
}
