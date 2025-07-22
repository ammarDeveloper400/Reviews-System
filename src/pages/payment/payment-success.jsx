import { Helmet } from 'react-helmet-async';

import PaymentSuccess from 'src/sections/subscription/payment/payment-success';

// ----------------------------------------------------------------------

export default function PaymentSuccessPage() {
  return (
    <>
      <Helmet>
        <title> Payment Success | RMS </title>
      </Helmet>

      <PaymentSuccess />
    </>
  );
}
