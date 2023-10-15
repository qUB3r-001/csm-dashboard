import { HStack, Tag, Text } from '@chakra-ui/react';

function SessionHeader() {
  return (
    <HStack justify="center" gap="4">
      <Text fontWeight="semibold">SESSION_1687955097_5347443</Text>
      <Tag colorScheme="blue" rounded="full" fontWeight="medium" size="lg">
        Read2SimCompeleted
      </Tag>
    </HStack>
  );
}

export default SessionHeader;
