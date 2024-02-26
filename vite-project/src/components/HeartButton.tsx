import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";

const HeartButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <IconButton
      aria-label="heart"
      icon={clicked === false ? <FaRegHeart /> : <FaHeart />}
      onClick={() => setClicked(!clicked)}
    />
  );
};

export default HeartButton;
