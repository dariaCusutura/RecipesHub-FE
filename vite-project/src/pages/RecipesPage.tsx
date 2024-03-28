import { Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import RecipesGrid from "../components/RecipesGrid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import useUserData from "../hooks/useUserData";
import { Toaster } from "react-hot-toast";
import useRecipes from "../hooks/useRecipes";
import Aside from "../components/Aside";

export interface RecipesQuery {
  category: string;
  author: string;
}

function RecipesPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) {
        return navigate("/login");
      } else {
        await axios.post("http://localhost:3000").then((res) => {
          if (!res.status) {
            removeCookie("jwt");
            return navigate("/login");
          }
        });
      }
    };
    verifyUser();
  }, [cookie, removeCookie, navigate]);

  const [path, setPath] = useState("/recipes");
  const [heading, setHeading] = useState("All Recipes");
  const [selectedIngredients, setSelectedIngr] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );

  const { name, email } = useUserData();
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

  const manageLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

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
            <Aside
              setPath={(path) => setPath(path)}
              setHeading={(heading) => setHeading(heading)}
              setSearchResult={(result) => setSearchResult(result)}
              setRecipesQuery={(query) => setRecipesQuery(query)}
              handleSelectIngredientsChange={(ingredient) =>
                handleSelectIngredientsChange(ingredient)
              }
              recipesQuery={recipesQuery}
              ingredients={ingredients}
              name={name}
              selectedIngredients={selectedIngredients}
            />
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
