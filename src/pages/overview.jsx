import { Helmet } from 'react-helmet-async';

import { Overview } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function OverviewPage() {
  return (
    <>
      <Helmet>
        <title> Overview | Review My Service </title>
      </Helmet>

      <Overview />
    </>
  );
}
