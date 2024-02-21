import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import RecipesGrid from "./components/RecipesGrid";
import CategorySelector from "./components/CategorySelector";

function App() {
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
        <CategorySelector />
        <RecipesGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
