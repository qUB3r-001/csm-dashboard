/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiSolidEraser } from 'react-icons/bi';
import { CgPathCrop } from 'react-icons/cg';
import { GrRotateLeft } from 'react-icons/gr';
import { MdOutlinePanTool } from 'react-icons/md';
import { PiBroomDuotone } from 'react-icons/pi';
import { TbChartGridDots } from 'react-icons/tb';
import { useImageEditor } from '@hooks/useImageEditor';
import Footer from '@components/Footer';
import ActionButton from './ActionButton';
import LayerSelector from './LayerSelector';
import OpacitySlider from './OpacitySlider';
import SessionHeader from './SessionHeader';

function Dashboard() {
  const {
    containerRef,
    canvasRef,
    imageRef,
    opacityValue,
    isMaskGenerated,
    markedDots,
    panOffset,
    isObjectLayer,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    togglePan,
    toggleMarking,
    undoMarkedDots,
    toggleLayer,
    toggleEraser,
    clearAllDots,
    toggleMaskGenerated,
    changeOpacityValue,
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
        <SimpleGrid
          columns={[null, null, 1, 2]}
          height="max-content"
          spacing="4"
          position="absolute"
          top="6"
          left="6"
        >
          <ActionButton icon={TbChartGridDots} handleClick={toggleMarking} />
          <ActionButton icon={GrRotateLeft} handleClick={undoMarkedDots} />
          <ActionButton icon={BiSolidEraser} handleClick={toggleEraser} />
          <ActionButton icon={PiBroomDuotone} handleClick={clearAllDots} />
          <ActionButton icon={CgPathCrop} handleClick={toggleMaskGenerated} />
          <ActionButton icon={MdOutlinePanTool} handleClick={togglePan} />
        </SimpleGrid>

        <OpacitySlider
          handleChange={changeOpacityValue}
          opacityValue={opacityValue}
        />

        <LayerSelector
          isObjectLayer={isObjectLayer}
          handleChange={toggleLayer}
        />
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
