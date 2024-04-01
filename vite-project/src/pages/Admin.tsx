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
  const [searchResult, setSearchResult] = useState("");
  const [recipesQuery, setRecipesQuery] = useState<RecipesQuery>(
    {} as RecipesQuery
  );
  const { recipes, error, isLoading } = useRecipes({ path }, recipesQuery);
  const { name, email, isAdmin } = useUserData();
  const users = useUsers();

  const manageLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

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
        <GridItem area="main">
          <Flex justifyContent={"space-around"}>
            <Tabs isFitted>
              <TabList mb="1em">
                <Tab>Manage Users</Tab>
                <Tab width={800}>Manage Recipes</Tab>
              </TabList>
              <TabPanels>
                <TabPanel key={1}>
                  <List>
                    {users.map((user) => (
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
                    result={searchResult}
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
                      setSearchResult("");
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
