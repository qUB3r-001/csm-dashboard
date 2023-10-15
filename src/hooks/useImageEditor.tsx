import { MarkedDots, Point } from '@typings/index';
import { addPoints, findInteriorOfPointInArray } from '@utils/2dSpaceUtils';
import axios from 'axios';
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
  containerRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  imageRef: MutableRefObject<HTMLImageElement | null>;
  opacityValue: number;
  isMaskGenerated: boolean;
  isMarkingEnabled: boolean;
  isPanningEnabled: boolean;
  isEraserEnabled: boolean;
  markedDots: MarkedDots[];
  panOffset: Point;
  viewPortTL: Point;
  scale: number;
  isObjectLayer: boolean;
  maskedImageUrl: string | null;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseScroll: (e: WheelEvent) => void;
  togglePan: () => void;
  toggleMarking: () => void;
  undoMarkedDots: () => void;
  toggleObjectLayer: () => void;
  toggleEraser: () => void;
  clearAllDots: () => void;
  toggleMaskGenerated: () => void;
  changeOpacityValue: (currValue: number) => void;
}

const ImageEditorContext = createContext<ImageEditorContextProps>(
  {} as ImageEditorContextProps,
);

export function ImageEditorProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [maskedImageUrl, setMaskedImageUrl] = useState<string | null>(null);

  const [scale, setScale] = useState<number>(1);
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [viewPortTL, setViewPortTL] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [panOffset, setPanOffset] = useState<Point>({ x: 150, y: 50 });
  const [isObjectLayer, setIsObjectLayer] = useState<boolean>(true);

  const [isPanningEnabled, setIsPanningEnabled] = useState<boolean>(false);
  const [isMarkingEnabled, setIsMarkingEnabled] = useState<boolean>(false);
  const [isEraserEnabled, setIsEraserEnabled] = useState<boolean>(false);
  const [isMaskGenerated, setIsMaskGenerated] = useState<boolean>(false);

  const [opacityValue, setOpacityValue] = useState<number>(99);
  const [markedDots, setMarkedDots] = useState<MarkedDots[]>([]);

  // mouse based events
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      console.log('click down');

      setIsMousePressed(true);
      setMousePos({ x: e.clientX, y: e.clientY });

      if (isMarkingEnabled) {
        console.log('point marked', scale);
        const isInsideImageX =
          (e.clientX - canvasRef.current!.getBoundingClientRect().left) /
            scale -
            panOffset.x <
            300 &&
          (e.clientX - canvasRef.current!.getBoundingClientRect().left) /
            scale -
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
                (e.clientX - canvasRef.current!.getBoundingClientRect().left) /
                  scale -
                panOffset.x,
              y:
                (e.clientY - canvasRef.current!.getBoundingClientRect().top) /
                  scale -
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
      scale,
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
        const dx = e.clientX - mousePos.x;
        const dy = e.clientY - mousePos.y;
        const newPanOffset: Point = {
          x: panOffset.x + dx,
          y: panOffset.y + dy,
        };

        setPanOffset(newPanOffset);
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [
      isMousePressed,
      isPanningEnabled,
      mousePos.x,
      mousePos.y,
      panOffset.x,
      panOffset.y,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  const handleMouseScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      if (isPanningEnabled) {
        const zoom = 1 - e.deltaY / 1000;
        const viewPortTLDelta: Point = {
          x: (mousePos.x / scale) * (1 - 1 / zoom),
          y: (mousePos.y / scale) * (1 - 1 / zoom),
        };
        const newViewPortTL = addPoints(viewPortTL, viewPortTLDelta);

        setScale(scale * zoom);
        setViewPortTL(newViewPortTL);
      }
    },
    [isPanningEnabled, mousePos.x, mousePos.y, scale, viewPortTL],
  );

  // action button based toggle events
  const togglePan = useCallback(() => {
    setIsPanningEnabled((prev) => !prev);
    setIsEraserEnabled(false);
    setIsMarkingEnabled(false);
  }, []);

  const toggleMarking = useCallback(() => {
    setIsPanningEnabled(false);
    setIsEraserEnabled(false);
    setIsMarkingEnabled((prev) => !prev);
  }, []);

  const toggleEraser = useCallback(() => {
    setIsPanningEnabled(false);
    setIsEraserEnabled((prev) => !prev);
    setIsMarkingEnabled(false);
  }, []);

  const toggleMaskGenerated = useCallback(async () => {
    setIsMaskGenerated((prev) => !prev);
    setIsPanningEnabled(false);
    setIsEraserEnabled(false);
    setIsMarkingEnabled(false);

    if (!isMaskGenerated) {
      const sendDataForSegmentationMask = async () => {
        const response = await axios.post('/api/compute-mask', {
          data: JSON.stringify({
            markedDots,
            imageData: {
              height: imageRef.current!.height,
              width: imageRef.current!.width,
              imageCanvasWidth: 300,
              imageCanvasHeight:
                (300 * imageRef.current!.height) / imageRef.current!.width,
              currentCanvasScale: scale,
            },
          }),
        });

        setMaskedImageUrl(response.data.maskedUrl);
        return response;
      };

      sendDataForSegmentationMask();
    }
  }, [isMaskGenerated, markedDots, scale]);

  const undoMarkedDots = useCallback(() => {
    setMarkedDots((prev) => prev.slice(0, -1));
  }, []);

  const clearAllDots = useCallback(() => {
    setMarkedDots([]);
  }, []);

  // switch to toggle layer for marking dots
  const toggleObjectLayer = useCallback(() => {
    setIsObjectLayer((prev) => !prev);
  }, []);

  // mask opacity slider
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
      scale,
      viewPortTL,
      maskedImageUrl,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseScroll,
      togglePan,
      toggleMarking,
      undoMarkedDots,
      toggleObjectLayer,
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
      scale,
      viewPortTL,
      maskedImageUrl,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseScroll,
      togglePan,
      toggleMarking,
      undoMarkedDots,
      toggleObjectLayer,
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
