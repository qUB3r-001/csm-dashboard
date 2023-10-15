import { Box, Flex } from '@chakra-ui/react';
import { BgSvgBottom, BgSvgTop } from '@components/common';
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
      <Box position="absolute" top="0" left="0" width="full" zIndex={-10}>
        <BgSvgTop />
      </Box>

      <Box position="absolute" bottom="0" left="0" width="full" zIndex={-10}>
        <BgSvgBottom />
      </Box>

      {children}
    </Flex>
  );
}

export default LandingPageLayout;
