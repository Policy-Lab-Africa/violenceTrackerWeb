import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';

const customTheme = extendTheme({
  colors,
  ...typography,
});

export default customTheme;
