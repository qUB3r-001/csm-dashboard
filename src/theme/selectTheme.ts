import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const topbarSelect = definePartsStyle({
  field: {
    bg: 'none',
  },
});

const selectTheme = defineMultiStyleConfig({ variants: { topbarSelect } });

export default selectTheme;
