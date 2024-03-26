import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { Recipe } from "../hooks/useRecipes";
import axios from "axios";

interface Props {
  recipe: Recipe;
  favArray: number[];
  updateFavArray: () => void;
}

const HeartButton = ({ recipe, favArray, updateFavArray }: Props) => {
  const [liked, setLiked] = useState(favArray.includes(recipe._id));

  const manageClick = async () => {
    await axios
      .put(
        "http://localhost:3000/liked",
        { recipe: recipe._id, liked: favArray.includes(recipe._id) },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
      });
    setLiked(!liked);
  };

  return (
    <IconButton
      aria-label="heart"
      icon={favArray.includes(recipe._id) ? <FaHeart /> : <FaRegHeart />}
      onClick={() => {
        manageClick();
        updateFavArray();
      }}
    />
  );
};

export default HeartButton;
