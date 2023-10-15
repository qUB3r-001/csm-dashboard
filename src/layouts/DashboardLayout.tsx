import { Box, Flex } from '@chakra-ui/react';
import { BgSvgBottom, BgSvgTop } from '@components/common';
import Sidebar from '@components/Sidebar';
import Topbar from '@components/Topbar';
import { ReactNode } from 'react';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      height="100vh"
      width="full"
      position="relative"
      direction="column"
      gap="6"
    >
      <Box position="absolute" top="0" left="0" width="full" zIndex={-10}>
        <BgSvgTop />
      </Box>

      <Box position="absolute" bottom="0" left="0" width="full" zIndex={-10}>
        <BgSvgBottom />
      </Box>

      <Topbar />
      <Flex flex="1">
        <Sidebar />
        <Flex direction="column" flex="1">
          <Flex flex="1">{children}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DashboardLayout;
