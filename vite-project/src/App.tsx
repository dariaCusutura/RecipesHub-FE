import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipesGrid from "./components/RecipesGrid";
import CategorySelector from "./components/CategorySelector";
import { useState } from "react";

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
        <GridItem area="aside" bg="blue.300"></GridItem>
      </Show>
      <GridItem area="main">
        <CategorySelector
          onSelectCategory={(category) => {
            setPath("/recipes/" + category.toLowerCase());
          }}
        />
        <RecipesGrid path={path} />
      </GridItem>
    </Grid>
  );
}

export default App;
