import { Helmet } from 'react-helmet-async';

import InterfaceSettings from 'src/sections/interface-settings/view/interface-settings';

// ----------------------------------------------------------------------

export default function InterfaceSettingsPage() {
  return (
    <>
      <Helmet>
        <title> Interface Settings | Review My Service </title>
      </Helmet>

      <InterfaceSettings />
    </>
  );
}
