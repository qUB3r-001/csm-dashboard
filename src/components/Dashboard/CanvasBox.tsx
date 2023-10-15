import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

interface CanvasBoxProps {
  imageUrl: string;
}

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const INITIAL_IMAGE_SCALE = 0.8;

function CanvasBox({ imageUrl }: CanvasBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  function loadImageOnCanvas(url: string) {
    if (canvasRef.current) {
      canvasContextRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasContextRef.current;

      ctx!.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // load image after first page load in origin dimensions
      const loadedImage = new Image();
      loadedImage.src = url;

      loadedImage.onload = () => {
        const initialImageHeight = INITIAL_IMAGE_SCALE * CANVAS_HEIGHT;
        const initialImageWidth =
          (initialImageHeight * loadedImage.width) / loadedImage.height;

        const initialImageLeftPos = (CANVAS_WIDTH - initialImageWidth) / 2;
        const initialImageTopPos = (CANVAS_HEIGHT - initialImageHeight) / 2;

        ctx!.drawImage(
          loadedImage,
          initialImageLeftPos,
          initialImageTopPos,
          initialImageWidth,
          initialImageHeight,
        );
      };
    }
  }

  useEffect(() => {
    // initialize
    loadImageOnCanvas(imageUrl);
  }, []);

  return (
    <Box
      height="max-content"
      width="max-content"
      border="1px"
      borderColor="gray.300"
      rounded="lg"
    >
      <canvas ref={canvasRef} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />
    </Box>
  );
}

export default CanvasBox;
