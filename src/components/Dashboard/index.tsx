/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useImageEditor } from '@hooks/useImageEditor';
import Footer from '@components/Footer';
import LayerSelector from './LayerSelector';
import OpacitySlider from './OpacitySlider';
import SessionHeader from './SessionHeader';
import ActionButtonList from './ActionButton';

function Dashboard() {
  const {
    containerRef,
    canvasRef,
    imageRef,
    opacityValue,
    isMaskGenerated,
    markedDots,
    panOffset,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useImageEditor();

  // load the image from url
  // render in the center of the canvas
  useEffect(() => {
    if (containerRef.current) {
      const canvasElem = canvasRef.current;

      if (canvasElem) {
        const ctx = canvasElem.getContext('2d')!;
        canvasElem.height = containerRef.current.clientHeight;
        canvasElem.width = containerRef.current.clientWidth;

        const loadImage = new Image();
        loadImage.src = 'https://i.imgur.com/VQWyTaJ.jpeg';

        loadImage.onload = () => {
          const newImageWidth = 300;
          const newImageHeight = (300 * loadImage.height) / loadImage.width;
          console.log('image redrawn');
          ctx.drawImage(
            loadImage,
            panOffset.x,
            panOffset.y,
            newImageWidth,
            newImageHeight,
          );
          imageRef.current = loadImage;

          markedDots.map((dot) => {
            ctx.fillStyle = dot.loc === 'OBJECT' ? '#42CF00' : '#DC3545';
            ctx.beginPath();
            ctx.arc(
              dot.x + panOffset.x,
              dot.y + panOffset.y,
              10,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          });
        };

        if (isMaskGenerated) {
          const maskedImage = new Image();
          maskedImage.src = 'https://i.imgur.com/XKAdtN1.jpeg';

          maskedImage.onload = () => {
            const newMaskedImageWidth = 300;
            const newMaskedImageHeight =
              (300 * maskedImage.height) / maskedImage.width;
            console.log('masked image redrawn');
            ctx.globalAlpha = opacityValue / 100;
            ctx.drawImage(
              maskedImage,
              panOffset.x,
              panOffset.y,
              newMaskedImageWidth,
              newMaskedImageHeight,
            );
            ctx.globalAlpha = 1;
            imageRef.current = loadImage;
          };
        }
      }
    }
  }, [
    panOffset,
    markedDots,
    isMaskGenerated,
    opacityValue,
    containerRef,
    canvasRef,
    imageRef,
  ]);

  return (
    <Flex flex="1" p="4" direction="column" gap="6">
      <SessionHeader />

      <Flex flex="1" bg="white" position="relative" ref={containerRef}>
        <ActionButtonList />

        <OpacitySlider />

        <LayerSelector />

        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </Flex>

      <Footer />
    </Flex>
  );
}

export default Dashboard;
