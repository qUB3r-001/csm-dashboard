import { Switch, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

function LayerSelector() {
  const [isObjectLayer, setIsObjectLayer] = useState(true);

  return (
    <VStack position="absolute" right="6" top="6" gap="4" p="4" width="28">
      <Switch
        variant="doubleColor"
        size="lg"
        onChange={() => setIsObjectLayer((prev) => !prev)}
        isChecked={isObjectLayer}
      />
      <Text fontWeight="semibold">
        {isObjectLayer ? 'Object' : 'Background'}
      </Text>
    </VStack>
  );
}

export default LayerSelector;
