import { Box, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import RecipesGrid from "../components/RecipesGrid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import useRecipes from "../hooks/useRecipes";
import Aside from "../components/Aside";
import useUserData from "../hooks/useUserData";
import Pagination from "../components/Pagination";

export interface RecipesQuery {
  category: string;
  author: string;
  page: number;
  ingredients: string[];
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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [page, setPage] = useState(0);
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );

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
      const newIngr = isSelected
        ? prevSelectedIngredients.filter(
            (item) => item !== ingredient.toLowerCase()
          )
        : [...prevSelectedIngredients, ingredient.toLowerCase()];

      setRecipesQuery({ ...recipesQuery, ingredients: newIngr });
      return newIngr;
    });
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
    <Box bg="background">
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
            mode="recipes"
            _id={_id}
            users={[]}
            isAdmin={isAdmin}
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
              setPage={(page) => setPage(page)}
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
            isAdmin={isAdmin}
            name={name}
            result={searchResult}
            recipes={recipes}
            error={error}
            isLoading={isLoading}
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
      <Pagination
        changePage={(direction) => {
          setPage((prevPage) => {
            const nextPage = direction === "next" ? prevPage + 1 : prevPage - 1;
            setRecipesQuery({ ...recipesQuery, page: nextPage });
            return nextPage;
          });
        }}
        page={page}
        totalRecipesCount={totalRecipesCount}
        displayedRecipesCount={recipes?.length}
      />
      <Toaster position="bottom-center" />
    </Box>
  );
}

export default RecipesPage;
