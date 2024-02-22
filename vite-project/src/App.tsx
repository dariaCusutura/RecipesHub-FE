import { Grid, GridItem, List, ListItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipesGrid from "./components/RecipesGrid";
import CategorySelector from "./components/CategorySelector";
import { useState } from "react";
import AllRecipesSelector from "./components/AllRecipesSelector";

function App() {
  const [path, setPath] = useState("/recipes");
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
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
          <List paddingLeft={2} spacing={2}>
            <ListItem>
              <AllRecipesSelector />
            </ListItem>
            <ListItem>
              <CategorySelector
                onSelectCategory={(category) => {
                  setPath("/recipes/" + category.toLowerCase());
                }}
              />
            </ListItem>
          </List>
        </GridItem>
      </Show>
      <GridItem area="main">
        <RecipesGrid path={path} />
      </GridItem>
    </Grid>
  );
}

export default App;
