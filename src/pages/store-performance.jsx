import { Helmet } from 'react-helmet-async';

import { StorePerformance } from 'src/sections/store-performance/view';

// ----------------------------------------------------------------------

export default function StorePerformancePage() {
  return (
    <>
      <Helmet>
        <title> Store Performance | Review My Service </title>
      </Helmet>

      <StorePerformance />
    </>
  );
}
