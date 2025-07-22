import { Helmet } from 'react-helmet-async';

import { Dashboard } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Review My Service </title>
      </Helmet>

      <Dashboard />
    </>
  );
}
