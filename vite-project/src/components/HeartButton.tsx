import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Recipe } from "../hooks/useRecipes";
import axios from "axios";
import apiRecipe from "../services/api-recipe";

interface Props {
  recipe: Recipe;
}

const HeartButton = ({ recipe }: Props) => {
  const [liked, setLiked] = useState(false);
  const [favArray, setFavArray] = useState<number[]>([]);
  useEffect(() => {
    apiRecipe
      .get<number[]>("/recipes/favorites/array")
      .then((res) => setFavArray(res.data))
      .catch((err) => console.log(err.message));
  }, [favArray]);
  const manageClick = async () => {
    setLiked(!liked);
    await axios
      .put(
        "http://localhost:3000/liked",
        { recipe: recipe._id, liked: liked },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
        console.log(recipe._id);
      });
  };

  return (
    <IconButton
      aria-label="heart"
      icon={favArray.includes(recipe._id) ? <FaHeart /> : <FaRegHeart />}
      onClick={() => manageClick()}
    />
  );
};

export default HeartButton;
