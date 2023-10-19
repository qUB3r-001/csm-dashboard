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
    mousePos,
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
          const transformPoint = ctx
            .getTransform()
            .invertSelf()
            .transformPoint({
              x: mousePos.x - canvasElem.getBoundingClientRect().left,
              y: mousePos.y - canvasElem.getBoundingClientRect().top,
            });
          console.log(transformPoint);

          if (!imageRef.current) {
            loadImage.onload = () => {
              console.log('image redrawn');
              ctx.drawImage(
                loadImage,
                panOffset.x,
                panOffset.y,
                startingImageWidth,
                startingImageHeight,
              );
            };
          } else {
            ctx.scale(scale, scale);

            ctx.drawImage(
              loadImage,
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
          imageRef.current = loadImage;
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
    mousePos.x,
    mousePos.y,
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
