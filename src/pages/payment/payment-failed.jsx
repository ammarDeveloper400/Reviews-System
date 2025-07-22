import { Helmet } from 'react-helmet-async';

import PaymentFailed from 'src/sections/subscription/payment/payment-failed';

// ----------------------------------------------------------------------

export default function PaymentFailedPage() {
  return (
    <>
      <Helmet>
        <title> Payment Failed | RMS </title>
      </Helmet>

      <PaymentFailed />
    </>
  );
}
