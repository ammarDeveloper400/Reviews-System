import { Helmet } from 'react-helmet-async';

import { HomePageView } from 'src/sections/landing/home/view';


// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> RMS | Home </title>
      </Helmet>

      <HomePageView />
    </>
  );
}
