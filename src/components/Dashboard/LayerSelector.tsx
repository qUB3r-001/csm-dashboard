import { Switch, Text, VStack } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';

function LayerSelector() {
  const { isObjectLayer, toggleObjectLayer } = useImageEditor();

  return (
    <VStack position="absolute" right="6" top="6" gap="4" p="4" width="28">
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
