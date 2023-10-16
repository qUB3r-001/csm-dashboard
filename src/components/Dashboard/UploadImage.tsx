import { Box, Button, Input } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';
import { useState } from 'react';

function UploadImage() {
  const { handleImageUpload } = useImageEditor();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <Box
      width="72"
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: 'translate(-50%, -50%)' }}
      textAlign="center"
    >
      <Input
        placeholder="Paste URL of the image"
        size={['sm']}
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl || ''}
      />
      <Button onClick={() => handleImageUpload(imageUrl!)} size="sm" m="4">
        Upload
      </Button>
    </Box>
  );
}
export default UploadImage;
