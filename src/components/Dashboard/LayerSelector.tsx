import { Switch, Text, VStack } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';

function LayerSelector() {
  const { isMaskGenerated, isObjectLayer, toggleObjectLayer } =
    useImageEditor();

  return (
    <VStack
      position="absolute"
      right="6"
      top="6"
      gap="4"
      p="4"
      width="28"
      opacity={!isMaskGenerated ? '1' : '0.2'}
      pointerEvents={!isMaskGenerated ? 'inherit' : 'none'}
    >
      <Switch
        color="transparent"
        variant="doubleColor"
        size="lg"
        onChange={toggleObjectLayer}
        isChecked={isObjectLayer}
      />
      <Text fontWeight="semibold">
        {isObjectLayer ? 'Object' : 'Background'}
      </Text>
    </VStack>
  );
}

export default LayerSelector;
