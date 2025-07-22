import { Helmet } from 'react-helmet-async';

import { SettingsAndNotifications } from 'src/sections/settings-and-notifications/view';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Settings and Notifications | Review My Service </title>
      </Helmet>

      <SettingsAndNotifications />
    </>
  );
}
