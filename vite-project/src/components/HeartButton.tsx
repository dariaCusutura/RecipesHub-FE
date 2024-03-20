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
  const [favArray, setFavArray] = useState<number[]>([]);
  const [liked, setLiked] = useState(favArray.includes(recipe._id));
  useEffect(() => {
    apiRecipe
      .get<number[]>("/recipes/favorites/array")
      .then((res) => {
        setFavArray(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [liked]);

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
    marginTop={4}
      aria-label="heart"
      icon={favArray.includes(recipe._id) ? <FaHeart /> : <FaRegHeart />}
      onClick={() => manageClick()}
    />
  );
};

export default HeartButton;
