import { Switch, Text, VStack } from '@chakra-ui/react';

interface LayerSelectorProps {
  handleChange: () => void;
  isObjectLayer: boolean;
}

function LayerSelector({ handleChange, isObjectLayer }: LayerSelectorProps) {
  return (
    <VStack position="absolute" right="6" top="6" gap="4" p="4" width="28">
      <Switch
        color="transparent"
        variant="doubleColor"
        size="lg"
        onChange={handleChange}
        isChecked={isObjectLayer}
      />
      <Text fontWeight="semibold">
        {isObjectLayer ? 'Object' : 'Background'}
      </Text>
    </VStack>
  );
}

export default LayerSelector;
