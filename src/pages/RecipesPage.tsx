import {
  Box,
  Grid,
  GridItem,
  Heading,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import RecipesGrid from "../components/RecipesGrid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import useRecipes, { Recipe } from "../hooks/useRecipes";
import Aside from "../components/Aside";
import useUserData from "../hooks/useUserData";
import Pagination from "../components/Pagination";
import { User } from "../hooks/useUsers";
import pattern from "../components/pattern.svg";

export interface RecipesQuery {
  category: string;
  author: string;
  page: number;
  ingredients: string[];
}

function RecipesPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, , removeCookie] = useCookies([]);
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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [page, setPage] = useState(0);
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[] | User[]>([]);

  const { recipes, error, isLoading, totalRecipesCount } = useRecipes(
    { path },
    recipesQuery
  );
  const { name, email, isAdmin, _id } = useUserData();

  const handleSelectIngredientsChange = (ingredient) => {
    setSelectedIngredients((prevSelectedIngredients) => {
      const isSelected = prevSelectedIngredients.includes(
        ingredient.toLowerCase()
      );
      const newSelectedIngredients = isSelected
        ? prevSelectedIngredients.filter(
            (item) => item !== ingredient.toLowerCase()
          )
        : [...prevSelectedIngredients, ingredient.toLowerCase()];
      setPage(0);
      setRecipesQuery({
        ...recipesQuery,
        ingredients: newSelectedIngredients,
        page: 0,
      });
      return newSelectedIngredients;
    });
  };

  const manageLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  useEffect(() => {
    setDisplayRecipes(recipes);
  }, [recipes]);
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
  const navItemWidth = useBreakpointValue({ base: "100%", lg: "100%" });
  const mainTemplate = useBreakpointValue({
    base: `"nav" "main"`,
    lg: `"nav nav" "aside main"`,
  });
  const asideDisplay = useBreakpointValue({ base: "none", lg: "block" });

  return (
    <Box
      bgImage={`url(${pattern})`}
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed"
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="100vw"
      m={0}
      p={0}
      overflowY="auto"
    >
      <Grid
        templateAreas={mainTemplate}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav" width={navItemWidth}>
          <NavBar
            mode="recipes"
            _id={_id}
            isAdmin={isAdmin}
            email={email}
            name={name}
            Logout={() => manageLogout()}
            submitInput={(result) => setDisplayRecipes([result] as Recipe[])}
          />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" display={asideDisplay}>
            <Aside
              setPage={(page) => setPage(page)}
              setPath={(path) => setPath(path)}
              setHeading={(heading) => setHeading(heading)}
              setDisplayRecipes={() => setDisplayRecipes(recipes)}
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
        <GridItem area="main" marginLeft={{base: "10px"}}>
          <Heading marginY={3} color={"thirdColor"}>
            {heading}
          </Heading>
          <RecipesGrid
            isAdmin={isAdmin}
            mode="user"
            name={name}
            recipes={displayRecipes as Recipe[]}
            error={error}
            isLoading={isLoading}
            selectAuthor={(author) => {
              setHeading(
                author === name ? "My Recipes" : "Recipes by " + author
              );
              setPath("/recipes");
              setRecipesQuery({ ...recipesQuery, author });
            }}
          />
        </GridItem>
      </Grid>
      <Pagination
        changePage={(direction) => {
          setPage((prevPage) => {
            const nextPage = direction === "next" ? prevPage + 1 : prevPage - 1;
            setRecipesQuery({ ...recipesQuery, page: nextPage });
            return nextPage;
          });
        }}
        page={page}
        totalCardsCount={totalRecipesCount}
        displayedCardsCount={displayRecipes.length}
      />
      <Toaster position="bottom-center" />
    </Box>
  );
}

export default RecipesPage;
