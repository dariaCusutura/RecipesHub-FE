import { Button, MenuItem } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  manageClick: () => void;
  isSmall: boolean;
}

const FavouritesSelector = ({ manageClick, isSmall }: Props) => {
  return (
    <>
      {isSmall ? (
        <MenuItem
          width={160}
          onClick={() => manageClick()}
          icon={<FaRegHeart size={19} />}
        >
          Favorites
        </MenuItem>
      ) : (
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
      )}
    </>
  );
};

export default FavouritesSelector;
