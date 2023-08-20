import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#212121',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        h1: {},
        h2: {
          color: grey[800],
        },
        h3: {
          color: grey[700],
          fontSize: '1.7rem',
        },
        h4: {},
        h5: {},
        h6: {},
        paragraph: {
          color: grey[500],
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#1d1e26',
    },
    primary: {
      main: '#9C27B0',
    },
    secondary: {
      main: '#7C4DFF',
    },
    // error: {
    //   main: red[900],
    // },
  },
});

export default theme;
