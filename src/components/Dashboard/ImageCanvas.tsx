import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

function ImageCanvas() {
  const [imageUrl, setImageUrl] = useState('https://i.imgur.com/VQWyTaJ.jpeg');

  return (
    <Flex
      bg="white"
      flex="1"
      height="full"
      p="6"
      position="relative"
      justifyContent="center"
      alignItems="center"
    >
      <CanvasBox imageUrl={imageUrl} />
    </Flex>
  );
}

export default ImageCanvas;
