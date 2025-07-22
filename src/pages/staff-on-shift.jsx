import { Helmet } from 'react-helmet-async';

import { StaffOnShift } from 'src/sections/staff-on-shift/view';

// ----------------------------------------------------------------------

export default function StaffOnShiftPage() {
  return (
    <>
      <Helmet>
        <title> Staff on shift | Review My Service </title>
      </Helmet>

      <StaffOnShift />
    </>
  );
}
