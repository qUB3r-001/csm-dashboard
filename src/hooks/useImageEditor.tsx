import { MarkedDots, Point } from '@typings/index';
import { findInteriorOfPointInArray } from '@utils/2dSpaceUtils';
import {
  createContext,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';

interface ImageEditorContextProps {
  containerRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  imageRef: MutableRefObject<HTMLImageElement | null>;
  opacityValue: number;
  isMaskGenerated: boolean;
  isMarkingEnabled: boolean;
  isPanningEnabled: boolean;
  isEraserEnabled: boolean;
  markedDots: MarkedDots[];
  panOffset: Point;
  isObjectLayer: boolean;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  togglePan: () => void;
  toggleMarking: () => void;
  undoMarkedDots: () => void;
  toggleLayer: () => void;
  toggleEraser: () => void;
  clearAllDots: () => void;
  toggleMaskGenerated: () => void;
  changeOpacityValue: (currValue: number) => void;
}

const ImageEditorContext = createContext<ImageEditorContextProps>(
  {} as ImageEditorContextProps,
);

export function ImageEditorProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [lastMousePos, setLastMousePos] = useState<Point>({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState<Point>({ x: 150, y: 50 });
  const [isObjectLayer, setIsObjectLayer] = useState<boolean>(true);

  const [isPanningEnabled, setIsPanningEnabled] = useState<boolean>(false);
  const [isMarkingEnabled, setIsMarkingEnabled] = useState<boolean>(false);
  const [isEraserEnabled, setIsEraserEnabled] = useState<boolean>(false);
  const [isMaskGenerated, setIsMaskGenerated] = useState<boolean>(false);

  const [opacityValue, setOpacityValue] = useState<number>(99);
  const [markedDots, setMarkedDots] = useState<MarkedDots[]>([]);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      console.log('click down');

      setIsMousePressed(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });

      if (isMarkingEnabled) {
        console.log('point marked');
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

      if (isEraserEnabled) {
        console.log('erase point');
        setMarkedDots(
          findInteriorOfPointInArray(markedDots, {
            x:
              e.clientX -
              canvasRef.current!.getBoundingClientRect().left -
              panOffset.x,
            y:
              e.clientY -
              canvasRef.current!.getBoundingClientRect().top -
              panOffset.y,
          }),
        );
      }
    },
    [
      isEraserEnabled,
      isMarkingEnabled,
      isObjectLayer,
      markedDots,
      panOffset.x,
      panOffset.y,
    ],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
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
    },
    [
      isMousePressed,
      isPanningEnabled,
      lastMousePos.x,
      lastMousePos.y,
      panOffset.x,
      panOffset.y,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  const togglePan = useCallback(() => {
    setIsPanningEnabled((prev) => !prev);
  }, []);

  const toggleMarking = useCallback(() => {
    setIsMarkingEnabled((prev) => !prev);
  }, []);

  const undoMarkedDots = useCallback(() => {
    setMarkedDots((prev) => prev.slice(0, -1));
  }, []);

  const toggleLayer = useCallback(() => {
    setIsObjectLayer((prev) => !prev);
  }, []);

  const toggleEraser = useCallback(() => {
    setIsEraserEnabled((prev) => !prev);
  }, []);

  const clearAllDots = useCallback(() => {
    setMarkedDots([]);
  }, []);

  const toggleMaskGenerated = useCallback(() => {
    setIsMaskGenerated((prev) => !prev);
  }, []);

  const changeOpacityValue = useCallback(
    (currValue: number) => {
      if (isMaskGenerated) {
        setOpacityValue(currValue);
      }
    },
    [isMaskGenerated],
  );

  const imageEditorProviderValue = useMemo(
    () => ({
      containerRef,
      canvasRef,
      imageRef,
      opacityValue,
      isMaskGenerated,
      isMarkingEnabled,
      isPanningEnabled,
      isEraserEnabled,
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
    }),
    [
      containerRef,
      canvasRef,
      imageRef,
      opacityValue,
      isMaskGenerated,
      isMarkingEnabled,
      isPanningEnabled,
      isEraserEnabled,
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
    ],
  );

  return (
    <ImageEditorContext.Provider value={imageEditorProviderValue}>
      {children}
    </ImageEditorContext.Provider>
  );
}

export const useImageEditor = () => useContext(ImageEditorContext);

export default ImageEditorProvider;
