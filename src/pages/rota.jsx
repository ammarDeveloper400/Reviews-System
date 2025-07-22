import { Helmet } from 'react-helmet-async';

import { Rota } from 'src/sections/rota/view';

// ----------------------------------------------------------------------

export default function RotaPage() {
  return (
    <>
      <Helmet>
        <title> Rota | Review My Service </title>
      </Helmet>

      <Rota />
    </>
  );
}
