import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px, 1fr",
      }}
    >
      <GridItem area="nav" bg="orange.300">
        nav bar
      </GridItem>
      <GridItem area="main" bg="pink.300">
        main
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="blue.300">
          aside
        </GridItem>
      </Show>
    </Grid>
  );
}

export default App;
