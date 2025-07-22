import { Helmet } from 'react-helmet-async';

// import { BlogView } from 'src/sections/blog/view';
// import { RateStaffView } from 'src/sections/reviews/Rating-staff/rate-staff/view';
import { SocialMediaView } from 'src/sections/reviews/social-media-scan/social-media/view';

// ----------------------------------------------------------------------

export default function SocialMediaPage() {
  return (
    <>
      <Helmet>
        <title> Social Media Reviews | RMS </title>
      </Helmet>

      <SocialMediaView />
    </>
  );
}
