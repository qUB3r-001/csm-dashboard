import { MarkedDots, Point } from '@typings/index';
import { findInteriorOfPointInArray } from '@utils/2dSpaceUtils';
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

interface SetupOffsetAndScaleResponse {
  startingImagePosx: number;
  startingImagePosy: number;
  startingImageWidth: number;
  startingImageHeight: number;
}

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
  scale: number;
  isObjectLayer: boolean;
  uploadImageUrl: string | null;
  maskedImageUrl: string | null;
  tlPos: Point;
  setupInitialOffsetAndScale: (
    canvasElem: HTMLCanvasElement,
    loadImage: HTMLImageElement,
  ) => SetupOffsetAndScaleResponse;
  handleImageUpload: (url: string) => void;
  deleteImageUpload: () => void;
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
  const [uploadImageUrl, setUploadImageUrl] = useState<string | null>(
    'https://i.imgur.com/VQWyTaJ.jpeg',
  );
  const [maskedImageUrl, setMaskedImageUrl] = useState<string | null>(null);

  const [scale, setScale] = useState<number>(1);
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });

  const [tlPos, setTlPos] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [panOffset, setPanOffset] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [isObjectLayer, setIsObjectLayer] = useState<boolean>(true);

  const [isPanningEnabled, setIsPanningEnabled] = useState<boolean>(false);
  const [isMarkingEnabled, setIsMarkingEnabled] = useState<boolean>(false);
  const [isEraserEnabled, setIsEraserEnabled] = useState<boolean>(false);
  const [isMaskGenerated, setIsMaskGenerated] = useState<boolean>(false);

  const [opacityValue, setOpacityValue] = useState<number>(99);
  const [markedDots, setMarkedDots] = useState<MarkedDots[]>([]);

  const setupInitialOffsetAndScale = useCallback(
    (canvasElem: HTMLCanvasElement, loadImage: HTMLImageElement) => {
      const startingImageWidth = 300;
      const startingImageHeight = (300 * loadImage.height) / loadImage.width;
      const startingImagePosx = canvasElem.width / 2 - startingImageWidth / 2;
      const startingImagePosy = canvasElem.height / 2 - startingImageHeight / 2;

      if (!imageRef.current) {
        setPanOffset({
          x: startingImagePosx,
          y: startingImagePosy,
        });
      }

      return {
        startingImagePosx,
        startingImagePosy,
        startingImageWidth,
        startingImageHeight,
      };
    },
    [],
  );

  const handleImageUpload = useCallback((url: string) => {
    setUploadImageUrl(url);
  }, []);

  const deleteImageUpload = useCallback(() => {
    setUploadImageUrl(null);
    setMaskedImageUrl(null);
    setMarkedDots([]);
    setMousePos({ x: 0, y: 0 });
    setPanOffset({ x: 150, y: 50 });
    setMousePos({ x: 0, y: 0 });
    setIsMousePressed(false);
    setOpacityValue(99);
    setScale(1);
  }, []);

  // mouse based events
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      console.log('click down', panOffset);

      setIsMousePressed(true);
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });

      const relativeMousePos: Point = {
        x:
          (e.clientX - canvasRef.current!.getBoundingClientRect().left) /
            scale -
          panOffset.x,
        y:
          (e.clientY - canvasRef.current!.getBoundingClientRect().top) / scale -
          panOffset.y,
      };

      if (isMarkingEnabled) {
        const isInsideImageX =
          relativeMousePos.x < 300 && relativeMousePos.x > 0;

        const isInsideImageY =
          relativeMousePos.y <
            (300 * imageRef.current!.height) / imageRef.current!.width &&
          relativeMousePos.y > 0;

        if (isInsideImageX && isInsideImageY) {
          setMarkedDots((prev) => [
            ...prev,
            {
              x: relativeMousePos.x,
              y: relativeMousePos.y,
              realX:
                (e.clientX - canvasRef.current!.getBoundingClientRect().left) /
                  scale -
                panOffset.x,
              realY:
                (e.clientY - canvasRef.current!.getBoundingClientRect().top) /
                  scale -
                panOffset.y,
              loc: isObjectLayer ? 'OBJECT' : 'BACKGROUND',
            },
          ]);
        } else {
          console.log('clicked outside image', relativeMousePos);
        }
      }

      if (isEraserEnabled) {
        console.log('erase point');
        setMarkedDots(
          findInteriorOfPointInArray(markedDots, {
            x:
              (e.clientX - canvasRef.current!.getBoundingClientRect().left) /
                scale -
              panOffset.x,
            y:
              (e.clientY - canvasRef.current!.getBoundingClientRect().top) /
                scale -
              panOffset.y,
          }),
        );
      }
    },
    [
      panOffset,
      scale,
      isMarkingEnabled,
      isEraserEnabled,
      isObjectLayer,
      markedDots,
    ],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMousePressed && isPanningEnabled) {
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
    [isMousePressed, isPanningEnabled, mousePos.x, mousePos.y, panOffset],
  );

  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);

  const handleMouseScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      if (isPanningEnabled) {
        console.log('mouse scroll', tlPos);
        const zoom = 1 - e.deltaY / 1000;

        setScale(scale * zoom);

        setTlPos({
          x: e.clientX - canvasRef.current!.getBoundingClientRect().x,
          y: e.clientY - canvasRef.current!.getBoundingClientRect().y,
        });
      }
    },
    [isPanningEnabled, scale, tlPos],
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
      uploadImageUrl,
      maskedImageUrl,
      tlPos,
      setupInitialOffsetAndScale,
      handleImageUpload,
      deleteImageUpload,
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
      uploadImageUrl,
      maskedImageUrl,
      tlPos,
      setupInitialOffsetAndScale,
      handleImageUpload,
      deleteImageUpload,
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
