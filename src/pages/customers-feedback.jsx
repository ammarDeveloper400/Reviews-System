/* eslint-disable react/no-unescaped-entities */
import { Helmet } from 'react-helmet-async';

import { CustomersFeedback } from 'src/sections/customers-feedback/view';

// ----------------------------------------------------------------------

export default function CustomersFeedbackPage() {
  return (
    <>
      <Helmet>
        <title> Customer's Feedback | Review My Service </title>
      </Helmet>

      <CustomersFeedback />
    </>
  );
}
