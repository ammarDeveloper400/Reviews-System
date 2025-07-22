import { Helmet } from 'react-helmet-async';

import { StaffPerformance } from 'src/sections/staff-performance/view';

// ----------------------------------------------------------------------

export default function StaffPerformancePage() {
  return (
    <>
      <Helmet>
        <title> Staff Performance | Review My Service </title>
      </Helmet>

      <StaffPerformance />
    </>
  );
}
