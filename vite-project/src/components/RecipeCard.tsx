import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import img from "./NoImg.jpg";
import { Recipe } from "../hooks/useRecipes";
import HeartButton from "./HeartButton";
import React from "react";

interface Props {
  recipe: Recipe;
  selectAuthor: (author: string) => void;
}

const RecipeCard = React.memo(({ recipe, selectAuthor }: Props) => {
  return (
    <Card padding="10px" borderRadius={10} direction="row" overflow="hidden">
      <Image
        borderRadius={10}
        src={recipe.image ? recipe.image : img}
        boxSize="170px"
        htmlWidth="100%"
        htmlHeight="100%"
        objectFit="cover"
      />
      <CardBody marginBlock={-5}>
        <HStack justifyContent="space-between">
          <VStack alignItems="flex-start">
            <Heading marginBottom={-1}>{recipe.name}</Heading>
            <Button
              variant={"link"}
              marginBottom={1}
              fontSize={15}
              onClick={() => selectAuthor(recipe.author)}
            >
              by {recipe.author}
            </Button>
          </VStack>
          <HeartButton recipe={recipe} />
        </HStack>
        <Divider marginBottom={1} />
        <Tooltip
          label={recipe.ingredients.join(", ")}
          placement="bottom-start"
          offset={[0, 2]}
          fontSize={15}
        >
          <Text>Ingredients: {recipe.ingredients.length}</Text>
        </Tooltip>
        <Text>Category: {recipe.category}</Text>
      </CardBody>
    </Card>
  );
});

export default RecipeCard;
