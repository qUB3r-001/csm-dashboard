import { Box, Flex, Icon, Select, Spacer } from '@chakra-ui/react';
import { CSMLogo } from '@components/common';
import { BiBell, BiSolidUser } from 'react-icons/bi';

function Topbar() {
  return (
    <Flex
      borderRadius="lg"
      p="4"
      m="4"
      alignItems="center"
      gap="6"
      borderWidth="1px"
      borderColor="white"
      bg="whiteAlpha.600"
    >
      <CSMLogo />
      <Spacer color="transparent" />
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
