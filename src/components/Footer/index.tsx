import { Flex, Text } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';

function Footer() {
  const {
    isEraserEnabled,
    isMarkingEnabled,
    isPanningEnabled,
    isMaskGenerated,
  } = useImageEditor();

  return (
    <Flex
      borderTop="2px"
      height="28"
      borderColor="gray.200"
      justify="center"
      align="center"
    >
      <Text as="samp" color="gray.400" textAlign="center">
        {isEraserEnabled &&
          'Eraser tool is enabled. Click on the marked dots to remove them from the image.'}
        {isMarkingEnabled &&
          'Marking tool is enabled. Click on the image to create dots to highlight the parts of object and background. (Tip: use the layer selector switch to toggle between type of dots)'}
        {isPanningEnabled &&
          'Panning tool is enabled. Hold left mouse button to pan the image inside the canvas.'}
        {isMaskGenerated &&
          'Preview the generated mask. No other operation is allowed except opacity slider'}
      </Text>
    </Flex>
  );
}

export default Footer;
