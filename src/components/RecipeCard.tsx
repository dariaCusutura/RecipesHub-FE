import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  Tooltip,
  useTheme
} from "@chakra-ui/react";
import img from "./NoImg.jpg";
import { Recipe } from "../hooks/useRecipes";
import HeartButton from "./HeartButton";
import React from "react";
import RecipeMenuButton from "./RecipeMenuButton";
import { BsDot } from "react-icons/bs";
import PostDate from "./PostDate";

interface Props {
  recipe: Recipe;
  selectAuthor: (author: string) => void;
  name: string;
  favArray: number[];
  isAdmin: boolean;
  updateFavArray: () => void;
}

const RecipeCard = React.memo(
  ({
    recipe,
    selectAuthor,
    name,
    favArray,
    updateFavArray,
    isAdmin,
  }: Props) => {
    const theme = useTheme();
    const color = theme.colors.thirdColor;
    
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
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Heading color={"accent"}>{recipe.name}</Heading>
              <HStack>
                <PostDate recipe={recipe} />
                <BsDot color={color} />
                <Button
                  color="thirdColor"
                  variant={"link"}
                  fontSize={15}
                  onClick={() => selectAuthor(recipe.author)}
                >
                  {recipe.author === name ? "by you" : `by  ${recipe.author}`}
                </Button>
              </HStack>
            </Box>
            <Box
              display="flex"
              alignItems="revert"
              flexDirection="column"
              height={75}
              paddingTop={isAdmin ? 7 : recipe.author === name ? 0 : 7}
            >
              {(recipe.author === name || isAdmin) && (
                <RecipeMenuButton recipe={recipe} />
              )}
              {!isAdmin && (
                <HeartButton
                  recipe={recipe}
                  favArray={favArray}
                  updateFavArray={() => updateFavArray()}
                />
              )}
            </Box>
          </Flex>
          <Divider marginBottom={1} />
            <Tooltip
              label={recipe.ingredients?.join(", ")}
              placement="bottom-start"
              offset={[0, 2]}
              fontSize={15}
            >
              <Text>Ingredients: {recipe.ingredients?.length}</Text>
            </Tooltip>
          <Text>Category: {recipe.category}</Text>
        </CardBody>
      </Card>
    );
  }
);

export default RecipeCard;
