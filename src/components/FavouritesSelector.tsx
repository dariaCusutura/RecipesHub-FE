import { Button } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  manageClick: () => void;
}

const FavouritesSelector = ({ manageClick }: Props) => {
  return (
    <Button
      variant="primary"
      width={160}
      justifyContent={"left"}
      onClick={() => manageClick()}
      leftIcon={<FaRegHeart size={19} />}
    >
      {" "}
      Favorites{" "}
    </Button>
  );
};

export default FavouritesSelector;