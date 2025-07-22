import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'Overview',
    path: '/overview',
    icon: icon('ic_overview'),
  },
  {
    title: 'Staff on Shift',
    path: '/staff-on-shift',
    icon: icon('ic_staff_on_shift'),
  },
  {
    title: 'Staff Performance',
    path: '/staff-performance',
    icon: icon('ic_staff_performance'),
  },
  {
    title: 'Store Performance',
    path: '/store-performance',
    icon: icon('ic_store_performance'),
  },
  {
    title: 'Customer’s Feedback',
    path: '/customers-feedback',
    icon: icon('ic_customer_feedback'),
  },
  {
    title: 'Rota',
    path: '/rota',
    icon: icon('ic_rota'),
  },
  {
    title: 'Interface Settings',
    path: '/interface-settings',
    icon: icon('ic_interface_settings'),
  },
  {
    title: 'Manage Staff',
    path: '/manage-staff',
    icon: icon('ic_manage_staff'),
  },
  {
    title: 'Manage Stores',
    path: '/manage-stores',
    icon: icon('ic_manage_store'),
  },
  {
    title: 'Settings & Notifications',
    path: '/settings-and-notifications',
    icon: icon('ic_settings'),
  },
  {
    title: 'My Subscription',
    path: '/my-subscription',
    icon: icon('ic_my_subscription'),
  },
];

export default navConfig;
