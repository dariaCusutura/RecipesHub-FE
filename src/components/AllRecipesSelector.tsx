import { Button, MenuItem } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";

interface Props {
  onSelectAll: () => void;
  isSmall: boolean;
}

const AllRecipesSelector = ({ onSelectAll, isSmall }: Props) => {
  return (
    <>
      {isSmall ? (
        <MenuItem
          width={160}
          onClick={() => onSelectAll()}
          icon={<IoHomeOutline size={19} />}
        >
          All recipes
        </MenuItem>
      ) : (
        <Button
          variant="primary"
          width={160}
          justifyContent={"left"}
          leftIcon={<IoHomeOutline size={19} />}
          onClick={() => onSelectAll()}
        >
          All recipes
        </Button>
      )}
    </>
  );
};

export default AllRecipesSelector;
