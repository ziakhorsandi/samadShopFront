import { createMuiTheme } from '@material-ui/core/styles';

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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [vazir],
      },
    },
  },
});

export default theme;
