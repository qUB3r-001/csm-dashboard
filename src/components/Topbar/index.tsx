import { Box, Flex, Icon, Select, Spacer } from '@chakra-ui/react';
import { CSMLogo } from '@components/common';
import { BiBell, BiSolidUser } from 'react-icons/bi';

function Topbar() {
  return (
    <Flex
      border="1px"
      borderColor="white"
      borderRadius="md"
      p="4"
      m="6"
      outline="1px"
      alignItems="center"
      gap="6"
      bg="whiteAlpha.700"
    >
      <CSMLogo />
      <Spacer />
      <Box>
        <Select placeholder="Instructions" variant="topbarSelect">
          <option>Capture instructions</option>
          <option>Usage instructions</option>
        </Select>
      </Box>
      <Icon as={BiBell} fontSize="32px" bg="#f8f8f8" rounded="full" p="1" />
      <Icon
        as={BiSolidUser}
        fontSize="32px"
        bg="#f8f8f8"
        rounded="full"
        p="1"
      />
    </Flex>
  );
}

export default Topbar;
