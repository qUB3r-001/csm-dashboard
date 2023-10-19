/* eslint-disable react/require-default-props */
import { Button, Icon, SimpleGrid } from '@chakra-ui/react';
import { useImageEditor } from '@hooks/useImageEditor';
import { IconType } from 'react-icons';
import { BiSolidEraser } from 'react-icons/bi';
import { CgPathCrop } from 'react-icons/cg';
import { GrRotateLeft } from 'react-icons/gr';
import { MdOutlineDeleteOutline, MdOutlinePanTool } from 'react-icons/md';
import { PiBroomDuotone } from 'react-icons/pi';
import { TbChartGridDots } from 'react-icons/tb';

interface ActionButtonProps {
  icon: IconType;
  handleClick: () => void;
  isDisabled?: boolean;
}

function ActionButton({
  icon,
  handleClick,
  isDisabled = false,
}: ActionButtonProps) {
  return (
    <Button
      variant="actionButton"
      onClick={handleClick}
      isDisabled={isDisabled}
      size={['sm', 'lg']}
    >
      <Icon as={icon} fontSize="20" />
    </Button>
  );
}

function ActionButtonList() {
  const {
    isMaskGenerated,
    deleteImageUpload,
    togglePan,
    toggleMarking,
    undoMarkedDots,
    toggleEraser,
    clearAllDots,
    toggleMaskGenerated,
  } = useImageEditor();

  return (
    <SimpleGrid
      columns={[7, 4, 2]}
      height="max-content"
      spacing="4"
      position="absolute"
      top="6"
      left="6"
    >
      <ActionButton
        icon={TbChartGridDots}
        handleClick={toggleMarking}
        isDisabled={isMaskGenerated}
      />
      <ActionButton
        icon={GrRotateLeft}
        handleClick={undoMarkedDots}
        isDisabled={isMaskGenerated}
      />
      <ActionButton
        icon={BiSolidEraser}
        handleClick={toggleEraser}
        isDisabled={isMaskGenerated}
      />
      <ActionButton
        icon={PiBroomDuotone}
        handleClick={clearAllDots}
        isDisabled={isMaskGenerated}
      />
      <ActionButton icon={CgPathCrop} handleClick={toggleMaskGenerated} />
      <ActionButton
        icon={MdOutlinePanTool}
        handleClick={togglePan}
        isDisabled={isMaskGenerated}
      />
      <ActionButton
        icon={MdOutlineDeleteOutline}
        handleClick={deleteImageUpload}
      />
    </SimpleGrid>
  );
}

export default ActionButtonList;
