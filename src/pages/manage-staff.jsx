import { Helmet } from 'react-helmet-async';

import { ManageStaff } from 'src/sections/manage-staff/view';

// ----------------------------------------------------------------------

export default function ManageStaffPage() {
  return (
    <>
      <Helmet>
        <title> Manage Staff | Review My Service </title>
      </Helmet>

      <ManageStaff />
    </>
  );
}
