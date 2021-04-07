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

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Vazir',
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

export default theme;
