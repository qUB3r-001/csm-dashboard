import { Flex, Tag, Text } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';

function SessionHeader() {
  const { isMaskGenerated, uploadImageUrl } = useImageEditor();

  return (
    <Flex
      justify="center"
      gap="4"
      fontSize={['sm', null, 'inherit']}
      direction={['column', 'row']}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontWeight="semibold">SESSION_1687955097_5347443</Text>
      {uploadImageUrl && (
        <Tag colorScheme="blue" rounded="full" fontWeight="medium" width="max">
          {isMaskGenerated ? 'Read2SimCompeleted' : 'Read2SimPending'}
        </Tag>
      )}
    </Flex>
  );
}

export default SessionHeader;
