import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

interface MashOpacitySliderProps {
  opactiySliderValue: number;
  setOpacitySliderValue: any;
}

function MaskOpacitySlider({
  opactiySliderValue,
  setOpacitySliderValue,
}: MashOpacitySliderProps) {
  return (
    <Box
      width="44"
      position="absolute"
      bg="gray.50"
      border="2px"
      borderColor="gray.200"
      rounded="lg"
      right="6"
      bottom="10"
      p="4"
    >
      <Text textAlign="center" fontWeight="semibold" px="4" py="2">
        Mask Opacity
      </Text>
      <Slider
        aria-label="slider-ex-1"
        min={0}
        max={99}
        defaultValue={opactiySliderValue}
        onChange={(value) => setOpacitySliderValue(value)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export default MaskOpacitySlider;
