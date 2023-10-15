import { Box, Input } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';

function UploadImage() {
  const { handleImageUpload, uploadImageUrl } = useImageEditor();

  return (
    <Box
      width="72"
      position="absolute"
      top="50%"
      left="50%"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Input
        placeholder="Paste URL of the image"
        onChange={handleImageUpload}
        value={uploadImageUrl || ''}
      />
    </Box>
  );
}
export default UploadImage;
