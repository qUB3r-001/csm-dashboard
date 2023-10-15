/* eslint-disable react/require-default-props */
import { Button, Icon, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import { MdOutlineSpaceDashboard, MdPlaylistPlay } from 'react-icons/md';
import { PiCubeFocus } from 'react-icons/pi';

interface SidebarItemProps {
  icon: IconType;
  label: string;
}

type SidebarLinkItemProps = SidebarItemProps & {
  href: string;
};

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

function SidebarLinkItem({ icon, label, href }: SidebarLinkItemProps) {
  return (
    <Link href={href} isExternal width="full">
      <Button
        variant="sidebarButton"
        justifyContent={['center', 'center', 'center', 'start']}
      >
        <Icon as={icon} fontSize="20" />
        <Text fontWeight="medium" display={['none', 'none', 'none', 'block']}>
          {label}
        </Text>
      </Button>
    </Link>
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
      <SidebarLinkItem
        icon={PiCubeFocus}
        label="Submit Feedback"
        href="https://docs.google.com/forms/d/e/1FAIpQLSf1Kw7wDDunRf_8CHbMRMd22jARr3Y9uaMvQCOl64U95lzbuQ/viewform?usp=sf_link"
      />
    </VStack>
  );
}

export default Sidebar;
