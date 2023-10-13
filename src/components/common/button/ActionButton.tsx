import { Button, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ActionButtonProps {
  icon: IconType;
}

function ActionButton({ icon }: ActionButtonProps) {
  return (
    <Button variant="actionButton">
      <Icon as={icon} fontSize="20" />
    </Button>
  );
}

export default ActionButton;
