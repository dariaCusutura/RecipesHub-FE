import {
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import img from "./NoImg.jpg";
import { Recipe } from "../hooks/useRecipes";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card padding="10px" borderRadius={10} direction="row" overflow="hidden">
      <Image borderRadius={10} src={img} boxSize="170px" />
      <CardBody>
        <HStack justifyContent="space-between">
          <Heading paddingBottom={1}>{recipe.name}</Heading>
          <IconButton aria-label="heart" icon={<FaRegHeart />}></IconButton>
        </HStack>
        <Divider marginBottom={1} />
        <Text>Ingredients: {recipe.ingredients.length}</Text>
        <Text>Category: {recipe.category}</Text>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
