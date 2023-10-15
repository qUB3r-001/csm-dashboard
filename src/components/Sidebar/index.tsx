import { Button, Icon, Spacer, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import { MdOutlineSpaceDashboard, MdPlaylistPlay } from 'react-icons/md';
import { PiCubeFocus } from 'react-icons/pi';

interface SidebarItemProps {
  icon: IconType;
  label: string;
}

function SidebarItem({ icon, label }: SidebarItemProps) {
  return (
    <Button
      variant="sidebarButton"
      justifyContent={['center', 'center', 'center', 'start']}
    >
      <Icon as={icon} fontSize="20" />
      <Text fontWeight="medium" display={['none', 'none', 'none', 'block']}>
        {label}
      </Text>
    </Button>
  );
}

function Sidebar() {
  return (
    <VStack
      p="4"
      width={['24', '24', '24', '80']}
      borderRight="2px"
      borderColor="gray.200"
      align="start"
      gap="4"
    >
      <SidebarItem icon={MdOutlineSpaceDashboard} label="Overview" />
      <SidebarItem icon={MdPlaylistPlay} label="Video Segmentation" />
      <Spacer />
      <SidebarItem icon={PiCubeFocus} label="Submit Feedback" />
    </VStack>
  );
}

export default Sidebar;
