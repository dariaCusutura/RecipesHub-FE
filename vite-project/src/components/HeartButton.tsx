import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { Recipe } from "../hooks/useRecipes";
import axios from "axios";

interface Props {
  recipe: Recipe;
}


const HeartButton = ({recipe} : Props) => {
  const [liked, setLiked] = useState(false);
  const manageClick = async () => {
    setLiked(!liked);
    await axios.put("http://localhost:3000/liked", 
    {recipe: recipe._id, liked: liked}, {withCredentials: true})
    .catch((err) => {console.log(err); console.log(recipe._id)})
  }

  return (
    <IconButton
      aria-label="heart"
      icon={liked ? <FaHeart /> : <FaRegHeart />}
      onClick={() => manageClick()}
    />
  );
};

export default HeartButton;
