import { Button, MenuItem } from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";

interface Props {
  selectMyRecipes: () => void;
  isSmall: boolean;
}

const MyRecipesSelector = ({ selectMyRecipes, isSmall }: Props) => {
  return (
    <>
      {isSmall ? (
        <MenuItem
          onClick={() => selectMyRecipes()}
          icon={<VscAccount size={19} />}
        >
          My Recipes
        </MenuItem>
      ) : (
        <Button
          variant="primary"
          width={160}
          justifyContent={"left"}
          onClick={() => selectMyRecipes()}
          leftIcon={<VscAccount size={19} />}
        >
          {" "}
          My Recipes{" "}
        </Button>
      )}
    </>
  );
};

export default MyRecipesSelector;
