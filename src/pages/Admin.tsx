import {
  Box,
  Divider,
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
import pattern from "../components/pattern.svg";

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
              mode !== "users"
                ? setDisplayRecipes([result] as Recipe[])
                : setDisplayUsers([result] as User[])
            }
          />
        </GridItem>
        <GridItem area="main">
          <Flex justifyContent={"space-around"}>
            <Tabs isFitted>
              <TabList>
                <Tab
                  _hover={{
                    color: "accent",
                    boxShadow: "5px 12px 12px 0 rgba(0,0,0,0.3)",
                    transition: "0.7s",
                  }}
                  _selected={{
                    color: "accent",
                    boxShadow: "5px 12px 12px 0 rgba(0,0,0,0.3)",
                    transition: "0.7s",
                  }}
                  bgColor={"cardColor"}
                  borderRadius={5}
                  fontSize={25}
                  color={"thirdColor"}
                  onClick={() => {
                    setMode("users");
                    setDisplayUsers(users);
                  }}
                >
                  Manage Users
                </Tab>
                <Divider orientation="vertical" variant={"primary"} />
                <Tab
                  _hover={{
                    color: "accent",
                    boxShadow: "5px 12px 12px 0 rgba(0,0,0,0.3)",
                    transition: "0.7s",
                  }}
                  _selected={{
                    color: "accent",
                    boxShadow: "5px 12px 12px 0 rgba(0,0,0,0.3)",
                    transition: "0.7s",
                  }}
                  bgColor={"cardColor"}
                  borderRadius={5}
                  fontSize={25}
                  color={"thirdColor"}
                  width={800}
                  onClick={() => {
                    setMode("recipesAdmin");
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
