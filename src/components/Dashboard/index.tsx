import { Box, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import ActionButtonList from './ActionButtonList';

import DashboardHeading from './DashboardHeading';
import LayerSelector from './LayerSelector';
import MaskOpacitySlider from './MashOpacitySlider';

function Dashboard() {
  const [opactiySliderValue, setOpacitySliderValue] = useState(50);

  return (
    <Flex flex="1" p="4" direction="column" gap="6">
      <DashboardHeading />

      <Flex
        bg="white"
        flex="1"
        height="full"
        p="6"
        position="relative"
        justifyContent="center"
        alignItems="center"
      >
        <ActionButtonList />
        <LayerSelector />
        <MaskOpacitySlider
          opactiySliderValue={opactiySliderValue}
          setOpacitySliderValue={setOpacitySliderValue}
        />
        <Box position="relative">
          <Image
            opacity={opactiySliderValue / 100}
            src="https://m.media-amazon.com/images/I/61eOTYKD+9L.jpg"
            boxSize="lg"
            alt="Uploaded image"
            objectFit="contain"
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
