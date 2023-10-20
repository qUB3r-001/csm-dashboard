/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';
import Footer from '@components/Footer';
import LayerSelector from './LayerSelector';
import OpacitySlider from './OpacitySlider';
import SessionHeader from './SessionHeader';
import ActionButtonList from './ActionButtonsList';
import UploadImage from './UploadImage';

function Dashboard() {
  const {
    containerRef,
    canvasRef,
    imageRef,
    maskedImageUrl,
    opacityValue,
    isMaskGenerated,
    markedDots,
    panOffset,
    scale,
    uploadImageUrl,
    setupInitialOffsetAndScale,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseScroll,
  } = useImageEditor();

  // load the image from url
  // render in the center of the canvas
  useEffect(() => {
    if (containerRef.current) {
      const containerElem = containerRef.current;
      const canvasElem = canvasRef.current;
      containerElem.addEventListener('wheel', handleMouseScroll, {
        passive: false,
      });

      if (canvasElem) {
        const ctx = canvasElem.getContext('2d')!;
        canvasElem.height = containerRef.current.clientHeight;
        canvasElem.width = containerRef.current.clientWidth;

        if (uploadImageUrl) {
          const loadImage = new Image();
          loadImage.src = uploadImageUrl;
          const { startingImageWidth, startingImageHeight } =
            setupInitialOffsetAndScale(canvasElem, loadImage);

          if (!imageRef.current) {
            console.log('first paint', loadImage.complete);

            if (loadImage.complete) {
              loadImage.onload = () => {
                console.log('image redrawn', loadImage.complete);
                imageRef.current = loadImage;

                ctx.drawImage(
                  loadImage,
                  panOffset.x,
                  panOffset.y,
                  startingImageWidth,
                  startingImageHeight,
                );
              };
            } else {
              ctx.fillStyle = 'black';
              ctx.fillText(
                'Loading...',
                canvasElem.width / 2,
                canvasElem.height / 2,
              );
            }
          } else {
            console.log('second paint');

            ctx.scale(scale, scale);

            ctx.drawImage(
              imageRef.current,
              panOffset.x,
              panOffset.y,
              startingImageWidth,
              startingImageHeight,
            );

            markedDots.map((dot) => {
              ctx.fillStyle = dot.loc === 'OBJECT' ? '#42CF00' : '#DC3545';
              ctx.beginPath();
              ctx.arc(
                dot.x + panOffset.x, // render correctly instead of updating state
                dot.y + panOffset.y,
                10,
                0,
                Math.PI * 2,
              );
              ctx.fill();
            });

            // top left of the canvas to the offset amount
          }
        }

        if (isMaskGenerated && maskedImageUrl) {
          const maskedImage = new Image();
          maskedImage.src = maskedImageUrl;

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
          };
        }
      }

      return () => {
        containerElem.removeEventListener('wheel', handleMouseScroll);
      };
    }
  }, [
    scale,
    panOffset,
    markedDots,
    isMaskGenerated,
    opacityValue,
    containerRef,
    canvasRef,
    imageRef,
    uploadImageUrl,
    maskedImageUrl,
    handleMouseScroll,
    setupInitialOffsetAndScale,
  ]);

  return (
    <Flex flex="1" p="4" direction="column" gap="6">
      <SessionHeader />

      <Flex flex="1" bg="white" position="relative" ref={containerRef}>
        <ActionButtonList />

        <OpacitySlider />

        <LayerSelector />

        {uploadImageUrl ? (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          />
        ) : (
          <UploadImage />
        )}
      </Flex>

      <Footer />
    </Flex>
  );
}

export default Dashboard;
