import { Button } from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";

interface Props {
  selectMyRecipes: () => void;
}

const MyRecipesSelector = ({ selectMyRecipes }: Props) => {
  return (
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
  );
};

export default MyRecipesSelector;
