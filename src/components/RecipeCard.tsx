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
} from "@chakra-ui/react";
import img from "./NoImg.jpg";
import { Recipe } from "../hooks/useRecipes";
import HeartButton from "./HeartButton";
import React from "react";
import RecipeMenuButton from "./RecipeMenuButton";
import { BsDot } from "react-icons/bs";

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
    function timeSince(dateParam: Date | string): string {
      const date = new Date(dateParam);
      const seconds = Math.floor(
        (new Date().getTime() - date.getTime()) / 1000
      );
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      let interval = seconds / 31536000; // 60 * 60 * 24 * 365

      if (interval > 1) {
        return `${
          months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
      }
      interval = seconds / 2592000; // 60 * 60 * 24 * 30
      if (interval > 1) {
        return `${months[date.getMonth()]} ${date.getDate()}`;
      }
      interval = seconds / 86400; // 60 * 60 * 24
      if (interval > 1) {
        return Math.floor(interval) > 6
          ? `${months[date.getMonth()]} ${date.getDate()}`
          : Math.floor(interval) + "d";
      }
      interval = seconds / 3600; // 60 * 60
      if (interval > 1) {
        return Math.floor(interval) + "h";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + "m";
      }
      return Math.floor(seconds) + "s";
    }
    const displayDate = timeSince(recipe.date);

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
              <Heading>{recipe.name}</Heading>
              <HStack>
                <Button
                  color="thirdColor"
                  variant={"link"}
                  marginBottom={1}
                  fontSize={15}
                  onClick={() => selectAuthor(recipe.author)}
                >
                  {recipe.author === name ? "by you" : `by  ${recipe.author}`}
                </Button>
                <BsDot />
                <Text>{displayDate}</Text>
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
            label={recipe.ingredients.join(", ")}
            placement="bottom-start"
            offset={[0, 2]}
            fontSize={15}
          >
            <Text color="thirdColor">
              Ingredients: {recipe.ingredients.length}
            </Text>
          </Tooltip>
          <Text color="thirdColor">Category: {recipe.category}</Text>
        </CardBody>
      </Card>
    );
  }
);

export default RecipeCard;
