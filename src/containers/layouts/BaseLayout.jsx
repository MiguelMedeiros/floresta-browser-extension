import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../../../utils/theme';
import { Box } from '@mui/material';

const BaseLayout = ({ children }) => {
  return (
    <Box>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <ThemeProvider theme={theme}>
        <Box>{children}</Box>
      </ThemeProvider>
    </Box>
  );
};

export default BaseLayout;
