import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import Vazir from './assets/fonts/Vazir.ttf';

const vazir = {
  // fontFamily: 'Vazir',
  // fontStyle: 'normal',
  // fontDisplay: 'swap',
  // fontWeight: 400,
  src: `local('Vazir'),
    url(${Vazir}) format('ttf')
  `,
};
const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazir',
    h2: {
      fontFamily: 'Vazir',
      fontSize: '1.1rem',
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '1rem',
      },
      // [defaultTheme.breakpoints.down('sm')]: {
      //   fontSize: '0.8rem',
      // },
    },
  },
  palette: {
    primary: {
      main: teal[500],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [vazir],
      },
    },
  },
});
// theme.typography.h6 = {};

export default theme;
