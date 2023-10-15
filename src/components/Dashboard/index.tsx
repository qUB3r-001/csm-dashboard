/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { MarkedDots, Point } from '@typings/index';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import { GrRotateLeft } from 'react-icons/gr';
import { MdOutlinePanTool } from 'react-icons/md';
import { PiBroomDuotone } from 'react-icons/pi';
import { TbChartGridDots } from 'react-icons/tb';
import ActionButton from './ActionButton';
import LayerSelector from './LayerSelector';

import SessionHeader from './SessionHeader';

function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [lastMousePos, setLastMousePos] = useState<Point>({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState<Point>({ x: 100, y: 100 });

  const [isPanningEnabled, setIsPanningEnabled] = useState<boolean>(false);
  const [isMarkingEnabled, setIsMarkingEnabled] = useState<boolean>(false);
  const [isObjectLayer, setIsObjectLayer] = useState<boolean>(true);

  const [markedDots, setMarkedDots] = useState<MarkedDots[]>([]);

  const handleMouseDown = (e: MouseEvent) => {
    console.log('click down');

    setIsMousePressed(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });

    if (isMarkingEnabled) {
      const isInsideImageX =
        e.clientX -
          canvasRef.current!.getBoundingClientRect().left -
          panOffset.x <
          300 &&
        e.clientX -
          canvasRef.current!.getBoundingClientRect().left -
          panOffset.x >
          0;

      const isInsideImageY =
        e.clientY -
          canvasRef.current!.getBoundingClientRect().top -
          panOffset.y <
          (300 * imageRef.current!.height) / imageRef.current!.width &&
        e.clientY -
          canvasRef.current!.getBoundingClientRect().top -
          panOffset.y >
          0;

      if (isInsideImageX && isInsideImageY) {
        setMarkedDots((prev) => [
          ...prev,
          {
            x:
              e.clientX -
              canvasRef.current!.getBoundingClientRect().left -
              panOffset.x,
            y:
              e.clientY -
              canvasRef.current!.getBoundingClientRect().top -
              panOffset.y,
            loc: isObjectLayer ? 'OBJECT' : 'BACKGROUND',
          },
        ]);
      } else {
        console.log('clicked outside image');
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isMousePressed && isPanningEnabled) {
      console.log('pan');
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      const newPanOffset: Point = {
        x: panOffset.x + dx,
        y: panOffset.y + dy,
      };

      setPanOffset(newPanOffset);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const togglePan = () => {
    setIsPanningEnabled((prev) => !prev);
  };

  const toggleMarking = () => {
    setIsMarkingEnabled((prev) => !prev);
  };

  const undoMarkedDots = () => {
    setMarkedDots((prev) => prev.slice(0, -1));
  };

  const toggleLayer = () => {
    setIsObjectLayer((prev) => !prev);
  };

  const clearAllDots = () => {
    setMarkedDots([]);
  };

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
      }
    }
  }, [panOffset, markedDots]);

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
          <ActionButton icon={MdOutlinePanTool} handleClick={togglePan} />
          <ActionButton icon={TbChartGridDots} handleClick={toggleMarking} />
          <ActionButton icon={GrRotateLeft} handleClick={undoMarkedDots} />
          <ActionButton icon={PiBroomDuotone} handleClick={clearAllDots} />
        </SimpleGrid>

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
    </Flex>
  );
}

export default Dashboard;
