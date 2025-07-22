import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

export default function LandingLayout({ children }) {
  const [ setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: "50%",
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
      <Footer/>
    </>
  );
}

LandingLayout.propTypes = {
  children: PropTypes.node,
};
