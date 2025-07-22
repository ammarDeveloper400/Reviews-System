import { Helmet } from 'react-helmet-async';

import { TermsConditionsView } from 'src/sections/landing/terms-conditions/view';

// ----------------------------------------------------------------------

export default function TermsConditionPage() {
  return (
    <>
      <Helmet>
        <title> Terms & Conditions | RMS </title>
      </Helmet>

      <TermsConditionsView />
    </>
  );
}
