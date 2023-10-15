import { Button, Icon, SimpleGrid } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';
import { IconType } from 'react-icons';
import { BiSolidEraser } from 'react-icons/bi';
import { CgPathCrop } from 'react-icons/cg';
import { GrRotateLeft } from 'react-icons/gr';
import { MdOutlinePanTool } from 'react-icons/md';
import { PiBroomDuotone } from 'react-icons/pi';
import { TbChartGridDots } from 'react-icons/tb';

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

function ActionButtonList() {
  const {
    togglePan,
    toggleMarking,
    undoMarkedDots,
    toggleEraser,
    clearAllDots,
    toggleMaskGenerated,
  } = useImageEditor();

  return (
    <SimpleGrid
      columns={[null, null, 1, 2]}
      height="max-content"
      spacing="4"
      position="absolute"
      top="6"
      left="6"
    >
      <ActionButton icon={TbChartGridDots} handleClick={toggleMarking} />
      <ActionButton icon={GrRotateLeft} handleClick={undoMarkedDots} />
      <ActionButton icon={BiSolidEraser} handleClick={toggleEraser} />
      <ActionButton icon={PiBroomDuotone} handleClick={clearAllDots} />
      <ActionButton icon={CgPathCrop} handleClick={toggleMaskGenerated} />
      <ActionButton icon={MdOutlinePanTool} handleClick={togglePan} />
    </SimpleGrid>
  );
}

export default ActionButtonList;
