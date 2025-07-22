import { Helmet } from 'react-helmet-async';

import { ManageStores } from 'src/sections/manage-stores/view';

// ----------------------------------------------------------------------

export default function ManageStoresPage() {
  return (
    <>
      <Helmet>
        <title> Manage Stores | Review My Service </title>
      </Helmet>

      <ManageStores />
    </>
  );
}
