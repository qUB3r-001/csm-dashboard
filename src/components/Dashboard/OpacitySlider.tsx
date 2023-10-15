import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

function OpacitySlider() {
  return (
    <Box
      width="44"
      position="absolute"
      bg="gray.50"
      border="2px"
      borderColor="gray.200"
      rounded="lg"
      right="6"
      bottom="6"
      p="4"
    >
      <Text
        textAlign="center"
        fontWeight="semibold"
        px="4"
        py="2"
        fontSize="sm"
      >
        Mask Opacity
      </Text>
      <Slider aria-label="slider-ex-1" min={0} max={99}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export default OpacitySlider;
