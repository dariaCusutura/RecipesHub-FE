import {
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import useRecipes from "../hooks/useRecipes";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipesQuery } from "./RecipesPage";
import axios from "axios";
import useUserData from "../hooks/useUserData";
import RecipesGrid from "../components/RecipesGrid";
import { Toaster } from "react-hot-toast";
import useUsers from "../hooks/useUsers";
import UserCard from "../components/UserCard";

const Admin = () => {
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
  const [, setHeading] = useState("All Recipes");
  const [recipeSearchResult, setRecipeSearchResult] = useState("");
  const [userSearchResult, setUserSearchResult] = useState("");
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );
  const [mode, setMode] = useState("users");
  const { recipes, error, isLoading } = useRecipes({ path }, recipesQuery);
  const { name, email, isAdmin, _id } = useUserData();
  const users = useUsers();

  const manageLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const filteredUsers =
    userSearchResult !== ""
      ? users.filter((user) => user.name === userSearchResult)
      : users;

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "main main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar
            _id={_id}
            mode={mode}
            users={users}
            isAdmin={isAdmin}
            recipes={recipes}
            email={email}
            name={name}
            Logout={() => manageLogout()}
            submitInput={(result) =>
              mode === "recipes"
                ? setRecipeSearchResult(result)
                : setUserSearchResult(result)
            }
            manageClick={() => {
              setHeading("");
              setPath("/recipes");
              setRecipesQuery({} as RecipesQuery);
            }}
          />
        </GridItem>
        <GridItem area="main">
          <Flex justifyContent={"space-around"}>
            <Tabs isFitted>
              <TabList mb="1em">
                <Tab
                  onClick={() => {
                    setMode("users");
                    setRecipeSearchResult("");
                  }}
                >
                  Manage Users
                </Tab>
                <Tab
                  width={800}
                  onClick={() => {
                    setMode("recipes");
                    setUserSearchResult("");
                  }}
                >
                  Manage Recipes
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel key={1}>
                  <List>
                    {filteredUsers.map((user) => (
                      <ListItem key={user._id} paddingRight={5} marginY={3}>
                        <UserCard user={user} />
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
                <TabPanel key={2}>
                  <RecipesGrid
                    isAdmin={isAdmin}
                    name={name}
                    result={recipeSearchResult}
                    recipes={recipes}
                    error={error}
                    selectedIngredients={[]}
                    isLoading={isLoading}
                    selectAuthor={(author) => {
                      setHeading(
                        author === name ? "My Recipes" : "Recipes by " + author
                      );
                      setPath("/recipes");
                      setRecipesQuery({ ...recipesQuery, author });
                      setRecipeSearchResult("");
                    }}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </GridItem>
      </Grid>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Admin;
