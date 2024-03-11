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

export interface RecipesQuery {
  category: string;
}

function RecipesPage() {
  const [path, setPath] = useState("/recipes");
  const [heading, setHeading] = useState("");
  const [selectedIngredients, setSelectedIngr] = useState([]);
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const ingredients = ["Eggs", "Milk", "Water", "Salt", "Rice"];

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
        <NavBar Logout={() => manageLogout()} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" marginY={3}>
          <List paddingLeft={3} spacing={4}>
            <ListItem>
              <AllRecipesSelector
                onSelectAll={() => {
                  setRecipesQuery({} as RecipesQuery);
                  setPath("/recipes");
                  setHeading("");
                }}
              />
            </ListItem>
            <ListItem>
              <FavouritesSelector
                manageClick={() => {
                  setPath("/recipes/favorites/list");
                  setRecipesQuery({} as RecipesQuery);
                  setHeading("Favorite");
                }}
              />
            </ListItem>
            <ListItem>
              <CategorySelector
                onSelectCategory={(category) => {
                  setHeading(category);
                  setPath("/recipes");
                  setRecipesQuery({ ...recipesQuery, category });
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
          </List>
        </GridItem>
      </Show>
      <GridItem area="main">
        <Heading marginY={3}>{"My" + " " + heading + " " + "Recipes"}</Heading>
        <RecipesGrid
          path={path}
          recipesQuery={recipesQuery}
          selectedIngredients={selectedIngredients}
        />
      </GridItem>
    </Grid>
  );
}

export default RecipesPage;
