import { SimpleGrid } from '@chakra-ui/react';
import { ActionButton } from '@components/common';
import { GrRotateLeft } from 'react-icons/gr';
import { BiSolidEraser } from 'react-icons/bi';
import { MdOutlinePanTool } from 'react-icons/md';
import { PiBroomDuotone } from 'react-icons/pi';
import { CgPathCrop } from 'react-icons/cg';
import { TbChartGridDots } from 'react-icons/tb';

function ActionButtonList() {
  return (
    <SimpleGrid
      columns={[null, null, 1, 2]}
      height="max-content"
      spacing="4"
      position="absolute"
      left="6"
      top="6"
    >
      <ActionButton icon={TbChartGridDots} />
      <ActionButton icon={GrRotateLeft} />
      <ActionButton icon={BiSolidEraser} />
      <ActionButton icon={PiBroomDuotone} />
      <ActionButton icon={CgPathCrop} />
      <ActionButton icon={MdOutlinePanTool} />
    </SimpleGrid>
  );
}

export default ActionButtonList;
