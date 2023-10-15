import { Button, Icon, SimpleGrid } from '@chakra-ui/react';
import { GrRotateLeft } from 'react-icons/gr';
import { BiSolidEraser } from 'react-icons/bi';
import { MdOutlineDeleteSweep, MdOutlinePanTool } from 'react-icons/md';
import { PiBroomDuotone } from 'react-icons/pi';
import { CgPathCrop } from 'react-icons/cg';
import { TbChartGridDots } from 'react-icons/tb';
import { IconType } from 'react-icons';

interface ActionButtonProps {
  icon: IconType;
  handleClick: () => void;
}

function ActionButton({ icon, handleClick }: ActionButtonProps) {
  return (
    <Button variant="actionButton" onClick={handleClick}>
      <Icon as={icon} fontSize="20" />
    </Button>
  );
}

export default ActionButton;
