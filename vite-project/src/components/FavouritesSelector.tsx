import { Button } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  manageClick: () => void;
}

const FavouritesSelector = ({ manageClick }: Props) => {
  return (
    <Button
      width={160}
      justifyContent={"left"}
      onClick={() => manageClick()}
      leftIcon={<FaRegHeart />}
    >
      {" "}
      Favorites{" "}
    </Button>
  );
};

export default FavouritesSelector;
