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
  selectedIngredients: string[];
  result: string;
  selectAuthor: (author: string) => void;
  name: string;
  isAdmin: boolean;
}

const RecipesGrid = React.memo(
  ({
    recipes,
    error,
    isLoading,
    selectedIngredients,
    result,
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

    // Function to check if a recipe contains all selected ingredients
    const hasAllIngredients = (recipeIngredients: string[]) => {
      return selectedIngredients.every((ingredient) =>
        recipeIngredients.includes(ingredient)
      );
    };
    // Filter recipes based on conditions
    const filteredRecipes = result
      ? recipes.filter((recipe) => recipe.name === result)
      : selectedIngredients.length !== 0
      ? recipes.filter((recipe) => hasAllIngredients(recipe.ingredients))
      : recipes;
    const skeletons = [1, 2, 3];

    if (error) {
      return (
        <Heading marginY={3} size="lg" key={error}>
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
          {filteredRecipes.map((recipe) => (
            <ListItem paddingRight={5} marginY={3} key={recipe._id}>
              <RecipeCard
                isAdmin={isAdmin}
                favArray={favArray}
                name={name}
                recipe={recipe}
                selectAuthor={() => selectAuthor(recipe.author)}
                updateFavArray={() => setLiked(!liked)}
              />
            </ListItem>
          ))}
        </List>
      );
  }
);

export default RecipesGrid;
