import {
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Show,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import RecipesGrid from "../components/RecipesGrid";
import CategorySelector from "../components/CategorySelector";
import { useEffect, useState } from "react";
import AllRecipesSelector from "../components/AllRecipesSelector";
import FavouritesSelector from "../components/FavouritesSelector";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import IngredientsSelector from "../components/IngredientsSelector";
import AddRecipe from "../components/AddRecipe";
import useUserData from "../hooks/useUserData";
import { Toaster } from "react-hot-toast";
import useRecipes from "../hooks/useRecipes";

export interface RecipesQuery {
  category: string;
  author: string;
}

function RecipesPage() {
  const { name, email } = useUserData();
  const ingredients = [
    "Eggs",
    "Milk",
    "Rice",
    "Flour",
    "Chocolate",
    "Cheese",
    "Chicken",
    "Potatoes",
  ];
  const [path, setPath] = useState("/recipes");
  const [heading, setHeading] = useState("All Recipes");
  const [selectedIngredients, setSelectedIngr] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const { recipes, error, isLoading } = useRecipes({ path }, recipesQuery);

  const handleSelectIngredientsChange = (ingredient) => {
    const isSelected = selectedIngredients.includes(ingredient.toLowerCase());
    if (isSelected) {
      // If ingredient is already selected, remove it from the array
      setSelectedIngr(
        selectedIngredients.filter((item) => item !== ingredient.toLowerCase())
      );
    } else {
      // If ingredient is not selected, add it to the array
      setSelectedIngr([...selectedIngredients, ingredient.toLowerCase()]);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) navigate("/login");
      else {
        await axios.post("http://localhost:3000").then((res) => {
          if (!res.status) {
            removeCookie("jwt");
            navigate("/login");
          }
        });
      }
    };
    verifyUser();
  }, [cookie, removeCookie, navigate]);

  const manageLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar
          recipes={recipes}
            email={email}
            name={name}
            Logout={() => manageLogout()}
            submitInput={(result) => setSearchResult(result)}
            manageClick={() => {
              setHeading("");
              setPath("/recipes");
              setRecipesQuery({} as RecipesQuery);
            }}
          />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" marginY={5}>
            <List paddingLeft={3} spacing={4}>
              <ListItem>
                <AllRecipesSelector
                  onSelectAll={() => {
                    setRecipesQuery({} as RecipesQuery);
                    setPath("/recipes");
                    setHeading("All Recipes");
                    setSearchResult("");
                  }}
                />
              </ListItem>
              <ListItem>
                <FavouritesSelector
                  manageClick={() => {
                    setPath("/recipes/favorites/list");
                    setRecipesQuery({} as RecipesQuery);
                    setHeading("My Favorite Recipes");
                    setSearchResult("");
                  }}
                />
              </ListItem>
              <ListItem>
                <CategorySelector
                  onSelectCategory={(category) => {
                    setHeading(category + " " + "Recipes");
                    setPath("/recipes");
                    setRecipesQuery({ ...recipesQuery, category });
                    setSearchResult("");
                  }}
                />
              </ListItem>
              <ListItem>
                <IngredientsSelector
                  ingredients={ingredients}
                  selectedIngredients={selectedIngredients}
                  setSelectedIngr={handleSelectIngredientsChange}
                />
              </ListItem>
              <ListItem>
                <AddRecipe name={name} />
              </ListItem>
            </List>
          </GridItem>
        </Show>
        <GridItem area="main">
          <Heading marginY={3}>{heading}</Heading>
          <RecipesGrid
            name={name}
            result={searchResult}
            recipes={recipes}
            error={error}
            isLoading={isLoading}
            selectedIngredients={selectedIngredients}
            selectAuthor={(author) => {
              setHeading(
                author === name ? "My Recipes" : "Recipes by " + author
              );
              setPath("/recipes");
              setRecipesQuery({ ...recipesQuery, author });
              setSearchResult("");
            }}
          />
        </GridItem>
      </Grid>
      <Toaster position="bottom-center" />
    </>
  );
}

export default RecipesPage;
