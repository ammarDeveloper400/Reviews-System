/* eslint-disable react/prop-types */
/* eslint-disable import/no-duplicates */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import ReviewLayout from 'src/layouts/dashboard';
import DashboardLayout from 'src/layouts/dashboard';
import ReviewsLayout from 'src/layouts/review-staff';
import LandingLayout from 'src/layouts/landing-layout';

import Loadable from 'src/components/loader/Loadable';
// import SocialMediaPage from 'src/pages/reviews/social-media';

export const Dashboard = Loadable(lazy(() => import('src/pages/dashboard')));
export const Overview = Loadable(lazy(() => import('src/pages/overview')));
export const StaffOnShift = Loadable(lazy(() => import('src/pages/staff-on-shift')));
export const StaffPerformance = Loadable(lazy(() => import('src/pages/staff-performance')));
export const StorePerformance = Loadable(lazy(() => import('src/pages/store-performance')));
export const CustomersFeedback = Loadable(lazy(() => import('src/pages/customers-feedback')));
export const Rota = Loadable(lazy(() => import('src/pages/rota')));
export const ManageStaff = Loadable(lazy(() => import('src/pages/manage-staff')));
export const ManageStores = Loadable(lazy(() => import('src/pages/manage-stores')));
export const MySubscription = Loadable(lazy(() => import('src/pages/my-subscription')));
export const SettingsAndNotifications = Loadable(
  lazy(() => import('src/pages/settings-and-notifications'))
);
export const InterfaceSettings = Loadable(lazy(() => import('src/pages/interface-settings')));

export const PaymentSuccessPage = Loadable(lazy(() => import('src/pages/payment/payment-success')));
export const PaymentFailedPage = Loadable(lazy(() => import('src/pages/payment/payment-failed')));

export const BlogPage = Loadable(lazy(() => import('src/pages/blog')));
export const BlogPostsPage = Loadable(lazy(() => import('src/pages/landing/blog-posts')));

export const UserPage = Loadable(lazy(() => import('src/pages/user')));
export const LoginPage = Loadable(lazy(() => import('src/pages/login')));
export const ProductsPage = Loadable(lazy(() => import('src/pages/products')));
export const Page404 = Loadable(lazy(() => import('src/pages/page-not-found')));

//
export const ContactUsPage = Loadable(lazy(() => import('src/pages/landing/contact-us')));
export const TermsConditionPage = Loadable(
  lazy(() => import('src/pages/landing/terms-conditions-page'))
);
export const IndexPage = Loadable(lazy(() => import('src/pages/landing/home')));

// .........................Review Layout.........................
export const RateStaffPage = Loadable(lazy(() => import('src/pages/reviews/rate-staff')));
// export const RateMoreStaffPage = Loadable(lazy(() => import('src/pages/reviews/rate-more-staff')));
export const AfterScanPage = Loadable(lazy(() => import('src/pages/reviews/after-scan')));
export const RateExperiencePage = Loadable(lazy(() => import('src/pages/reviews/experience-rate')));
export const AfterScanExperiencePage = Loadable(
  lazy(() => import('src/pages/reviews/after-scan-experience'))
);
export const AfterScanVisitPage = Loadable(
  lazy(() => import('src/pages/reviews/after-scan-social-media'))
);
export const SocialMediaPage = Loadable(lazy(() => import('src/pages/reviews/social-media')));
export const ThankYouPage = Loadable(lazy(() => import('src/pages/reviews/thank-you')));
export const AfterScanThankYouPage = Loadable(
  lazy(() => import('src/pages/reviews/after-scan-thank-you'))
);

// ----------------------------------------------------------------------

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

// function PublicRoute({ children }) {
//   const token = localStorage.getItem('token');
//   return token ? <Navigate to="/dashboard" /> : children;
// }

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: 'dashboard',
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: 'overview',
          element: (
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          ),
        },
        {
          path: 'staff-on-shift',
          element: (
            <PrivateRoute>
              <StaffOnShift />
            </PrivateRoute>
          ),
        },
        {
          path: 'staff-performance',
          element: (
            <PrivateRoute>
              <StaffPerformance />
            </PrivateRoute>
          ),
        },
        {
          path: 'store-performance',
          element: (
            <PrivateRoute>
              <StorePerformance />
            </PrivateRoute>
          ),
        },
        {
          path: 'customers-feedback',
          element: (
            <PrivateRoute>
              <CustomersFeedback />
            </PrivateRoute>
          ),
        },
        {
          path: 'rota',
          element: (
            <PrivateRoute>
              <Rota />
            </PrivateRoute>
          ),
        },
        {
          path: 'manage-staff',
          element: (
            <PrivateRoute>
              <ManageStaff />
            </PrivateRoute>
          ),
        },
        {
          path: 'manage-stores',
          element: (
            <PrivateRoute>
              <ManageStores />
            </PrivateRoute>
          ),
        },
        {
          path: 'my-subscription',
          element: (
            <PrivateRoute>
              <MySubscription />
            </PrivateRoute>
          ),
        },
        {
          path: 'settings-and-notifications',
          element: (
            <PrivateRoute>
              <SettingsAndNotifications />
            </PrivateRoute>
          ),
        },
        {
          path: 'interface-settings',
          element: (
            <PrivateRoute>
              <InterfaceSettings />
            </PrivateRoute>
          ),
        },
        {
          path: 'payment-success',
          element: (
            <PrivateRoute>
              <PaymentSuccessPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'payment-failed',
          element: (
            <PrivateRoute>
              <PaymentFailedPage />
            </PrivateRoute>
          ),
        },

        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },

    // Reviewlayout

    {
      element: (
        <ReviewsLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </ReviewsLayout>
      ),
      children: [
        { path: 'rate-staff', element: <RateStaffPage /> },
        // { path: 'rate-more-staff', element: <RateMoreStaffPage /> },
        { path: 'after-scan', element: <AfterScanPage /> },
        { path: 'rate-experience', element: <RateExperiencePage /> },
        { path: 'after-scan-experience', element: <AfterScanExperiencePage /> },
        { path: 'visit-social-media', element: <AfterScanVisitPage /> },
        { path: 'social-media', element: <SocialMediaPage /> },
        { path: 'thanks', element: <ThankYouPage /> },
        { path: 'after-scan-thanks', element: <AfterScanThankYouPage /> },
      ],
    },
    {
      element: (
        <LandingLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </LandingLayout>
      ),
      children: [
        { index: true, element: <IndexPage /> },
        { path: 'blog-posts', element: <BlogPostsPage /> },
        { path: 'contact-us', element: <ContactUsPage /> },
        { path: 'terms-conditions', element: <TermsConditionPage /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
