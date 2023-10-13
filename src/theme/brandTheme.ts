import { extendTheme } from '@chakra-ui/react';
import buttonTheme from './buttonTheme';
import selectTheme from './selectTheme';
import switchTheme from './switchTheme';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
    default: `'Poppins', sans-serif`,
  },
  components: {
    Switch: switchTheme,
    Button: buttonTheme,
    Select: selectTheme,
  },
});

export default theme;
