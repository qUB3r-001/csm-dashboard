import { Box, Flex } from '@chakra-ui/react';
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
      <Box
        position="absolute"
        width="full"
        height="full"
        top="0"
        left="0"
        bgGradient="linear(to-b, teal.100, white, white, white, teal.100)"
        opacity="0.75"
        zIndex={-10}
        overflow="visible"
      />

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
