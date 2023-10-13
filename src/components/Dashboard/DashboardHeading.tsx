import { HStack, Tag, Text } from '@chakra-ui/react';

function DashboardHeading() {
  return (
    <HStack justify="center" gap="4">
      <Text fontWeight="semibold">SESSION_192389128391_12931923</Text>
      <Tag colorScheme="blue" rounded="full">
        Read2SimCompeleted
      </Tag>
    </HStack>
  );
}

export default DashboardHeading;
