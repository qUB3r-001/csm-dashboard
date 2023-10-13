import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

function LandingPageLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      height="100vh"
      width="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Box
        position="absolute"
        width="full"
        height="full"
        bgGradient="linear(to-b, teal.100, white, white, white, teal.100)"
        opacity="0.75"
        zIndex={-10}
        overflow="visible"
      />
      {children}
    </Flex>
  );
}

export default LandingPageLayout;
