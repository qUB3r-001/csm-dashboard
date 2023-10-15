import { Button, Icon } from '@chakra-ui/react';
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
