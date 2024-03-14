import {
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import img from "./NoImg.jpg";
import { Recipe } from "../hooks/useRecipes";
import HeartButton from "./HeartButton";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card padding="10px" borderRadius={10} direction="row" overflow="hidden">
      <Image borderRadius={10} src={img} boxSize="170px" />
      <CardBody>
        <HStack justifyContent="space-between" paddingBottom={1}>
          <Heading>{recipe.name}</Heading>
          <HeartButton recipe={recipe} />
        </HStack>
        <Divider marginBottom={1} />
        <Tooltip label={recipe.ingredients.join(", ")} placement="bottom-start" offset={[0, 2]} fontSize={15}>
          <Text>Ingredients: {recipe.ingredients.length}</Text>
        </Tooltip>
        <Text>Category: {recipe.category}</Text>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
