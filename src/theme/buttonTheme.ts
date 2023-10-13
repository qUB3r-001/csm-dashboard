import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sidebarButton = defineStyle({
  p: '6',
  bg: 'whiteAlpha.100',
  width: 'full',
  rounded: 'xl',
  gap: '4',
  _hover: {
    bg: 'blackAlpha.100',
  },
});

const actionButton = defineStyle({
  bg: 'white',
  border: '1px',
  borderColor: 'gray.300',
  rounded: 'xl',
  aspectRatio: '1',
  _hover: {
    bg: 'blackAlpha.100',
  },
});

const buttonTheme = defineStyleConfig({
  variants: { sidebarButton, actionButton },
});

export default buttonTheme;
