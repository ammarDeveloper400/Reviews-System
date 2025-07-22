/* eslint-disable perfectionist/sort-imports */
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router />
      <ToastContainer autoClose={500} toastStyle={{ fontSize: '14px', fontFamily: 'Poppins' }} />
    </ThemeProvider>
  );
}
