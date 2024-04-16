import { Recipe } from "../hooks/useRecipes";
import { Heading, List, ListItem } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import RecipesSkeletons from "./RecipesSkeletons";
import React, { useEffect, useState } from "react";
import apiRecipe from "../services/api-recipe";

interface Props {
  recipes: Recipe[];
  error: string;
  isLoading: boolean;
  selectAuthor: (author: string) => void;
  name: string;
  isAdmin: boolean;
  mode: string;
}

const RecipesGrid = React.memo(
  ({
    recipes,
    mode,
    error,
    isLoading,
    selectAuthor,
    name,
    isAdmin,
  }: Props) => {
    const [favArray, setFavArray] = useState<number[]>([]);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      apiRecipe
        .get<number[]>("/recipes/favorites/array")
        .then((res) => {
          setFavArray(res.data);
        })
        .catch((err) => console.log(err.message));
    }, [liked]);

    const skeletons = [1, 2, 3];

    if (error) {
      return (
        <Heading marginY={3} size="lg" key={error} color={"thirdColor"}>
          {error}
        </Heading>
      );
    } else
      return (
        <List marginY={3}>
          {/* show skeletons when loading */}
          {isLoading &&
            skeletons.map((skeleton) => (
              <ListItem paddingRight={5} marginY={3} key={skeleton}>
                <RecipesSkeletons />
              </ListItem>
            ))}
          {/* show recipes */}
          {recipes?.map((recipe) => (
            <ListItem paddingRight={5} marginY={3} key={recipe?._id}>
              {recipe && (
                <RecipeCard
                  isAdmin={isAdmin}
                  mode={mode}
                  favArray={favArray}
                  name={name}
                  recipe={recipe}
                  selectAuthor={() => selectAuthor(recipe.author)}
                  updateFavArray={() => setLiked(!liked)}
                />
              )}
            </ListItem>
          ))}
        </List>
      );
  }
);

export default RecipesGrid;
