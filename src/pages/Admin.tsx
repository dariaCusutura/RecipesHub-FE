import {
  Box,
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
import useRecipes, { Recipe } from "../hooks/useRecipes";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipesQuery } from "./RecipesPage";
import axios from "axios";
import useUserData from "../hooks/useUserData";
import RecipesGrid from "../components/RecipesGrid";
import { Toaster } from "react-hot-toast";
import useUsers, { User } from "../hooks/useUsers";
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
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>([]);
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [mode, setMode] = useState("users");
  const [, setHeading] = useState("All Recipes");
  const { recipes, error, isLoading, totalRecipesCount } = useRecipes(
    { path },
    recipesQuery
  );
  const { name, email, isAdmin, _id } = useUserData();
  const { users, totalUsersCount } = useUsers({ page: 0 });

  const manageLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  useEffect(() => {
    setDisplayRecipes(recipes);
  }, [recipes, totalRecipesCount]);

  useEffect(() => {
    setDisplayUsers(users);
  }, [users, totalUsersCount]);

  return (
    <Box bg="background">
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
            isAdmin={isAdmin}
            email={email}
            name={name}
            Logout={() => manageLogout()}
            submitInput={(result) =>
              mode === "recipes"
                ? setDisplayRecipes([result] as Recipe[])
                : setDisplayUsers([result] as User[])
            }
          />
        </GridItem>
        <GridItem area="main">
          <Flex justifyContent={"space-around"}>
            <Tabs isFitted>
              <TabList mb="1em">
                <Tab
                  onClick={() => {
                    setMode("users");
                    setDisplayUsers(users);
                  }}
                >
                  Manage Users
                </Tab>
                <Tab
                  width={800}
                  onClick={() => {
                    setMode("recipes");
                    setDisplayRecipes(recipes);
                  }}
                >
                  Manage Recipes
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel key={1}>
                  <List>
                    {displayUsers.map((user) => (
                      <ListItem key={user._id} paddingRight={5} marginY={3}>
                        <UserCard user={user} />
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
                <TabPanel key={2}>
                  <RecipesGrid
                    mode="admin"
                    isAdmin={isAdmin}
                    name={name}
                    recipes={displayRecipes}
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
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </GridItem>
      </Grid>
      <Toaster position="bottom-center" />
    </Box>
  );
};

export default Admin;
