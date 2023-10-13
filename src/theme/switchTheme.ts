import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const doubleColor = definePartsStyle({
  // define the part you're going to style
  container: {},
  thumb: {},
  track: {
    bg: 'red.500',
    _checked: {
      bg: 'green.500',
    },
  },
});

const switchTheme = defineMultiStyleConfig({ variants: { doubleColor } });

export default switchTheme;
