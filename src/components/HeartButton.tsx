import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconButton, useTheme } from "@chakra-ui/react";
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
        `http://localhost:3000/recipes/liked/${recipe._id}`,
        { recipe: recipe._id, liked: favArray.includes(recipe._id) },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
      });
    setLiked(!liked);
    updateFavArray();
  };
  const theme = useTheme();
  const color = theme.colors.darkest;

  return (
    <IconButton
      aria-label="heart"
      bgColor="rgba(164, 193, 225, 0.2)"
      icon={
        favArray.includes(recipe._id) ? (
          <FaHeart color={color} />
        ) : (
          <FaRegHeart color={color} />
        )
      }
      onClick={() => manageClick()}
    />
  );
};

export default HeartButton;
