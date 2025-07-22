import { Helmet } from 'react-helmet-async';

import SuccessLoading from 'src/sections/subscription/payment/success-loading';

// ----------------------------------------------------------------------

export default function SuccessLoadingPage() {
  return (
    <>
      <Helmet>
        <title> Payment | RMS </title>
      </Helmet>

      <SuccessLoading />
    </>
  );
}
