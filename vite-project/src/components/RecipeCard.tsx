import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import img from "./NoImg.jpg";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card padding="10px" borderRadius={10} direction="row" overflow="hidden">
      <Image borderRadius={10} src={img} boxSize="200px" />
      <CardBody>
        <Heading>{recipe.name}</Heading>
        <Text>Ingredients: {recipe.ingredients.length}</Text>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
