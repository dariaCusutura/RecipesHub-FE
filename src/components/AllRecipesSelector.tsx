import { Button } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";

interface Props {
  onSelectAll: () => void;
}

const AllRecipesSelector = ({ onSelectAll }: Props) => {
  return (
    <Button
      variant="primary"
      width={160}
      justifyContent={"left"}
      leftIcon={<IoHomeOutline size={19} />}
      onClick={() => onSelectAll()}
    >
      All recipes
    </Button>
  );
};

export default AllRecipesSelector;