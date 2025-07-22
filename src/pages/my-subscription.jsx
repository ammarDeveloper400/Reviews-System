import { Helmet } from 'react-helmet-async';

import { MySubscription } from 'src/sections/subscription/view';

// ----------------------------------------------------------------------

export default function MySubscriptionPage() {
  return (
    <>
      <Helmet>
        <title> My Subscription | Review My Service </title>
      </Helmet>

      <MySubscription />
    </>
  );
}
