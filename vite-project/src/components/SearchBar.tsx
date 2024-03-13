import {
  Box,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import useRecipes from "../hooks/useRecipes";
import { RecipesQuery } from "../pages/RecipesPage";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const { recipes } = useRecipes({ path: "/recipes" }, {} as RecipesQuery);
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    setResults(
      recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(input.toLowerCase())
      )
    );
    if (input.length === 0) setResults([]);
  }, [input]);

  const clearInput = () => {
    setInput("");
    setResults([]);
  };

  return (
    <Box position={"relative"} width={"100%"}>
      <InputGroup>
        <InputRightElement
          children={
            input.length === 0 ? (
              <IoSearchOutline />
            ) : (
              <IoClose onClick={clearInput} />
            )
          }
        />
        <Input
          width={"100%"}
          id="SearchRecipe"
          placeholder="Search a recipe..."
          onChange={(e) => setInput(e.target.value)}
        />
      </InputGroup>
      {results.length !== 0 && (
        <Box
          top={"100%"}
          width={"100%"}
          marginTop={1}
          borderRadius={"4px"}
          position={"absolute"}
          zIndex="999"
          bg={"gray.700"}
        >
          {results.map((result) => (
            <Card
              bg={"gray.800"}
              marginBlock={1}
              marginRight={1}
              marginLeft={1}
              key={result.name + "search"}
            >
              <CardBody>{result.name}</CardBody>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
