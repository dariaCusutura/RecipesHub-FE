import {
  Box,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { Recipe } from "../hooks/useRecipes";
import { useEffect, useRef, useState } from "react";

interface Props {
  submitInput: (result: string) => void;
  manageClick: () => void;
  recipes: Recipe[];
}

const SearchBar = ({ submitInput, manageClick, recipes }: Props) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const resultsBoxRef = useRef(null);

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
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsBoxRef.current &&
        !resultsBoxRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setResults([]); // Close results box
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box position={"relative"} width={"100%"}>
      <InputGroup>
        <InputRightElement
          children={
            input.length === 0 ? (
              <IoSearchOutline />
            ) : (
              <IoClose onClick={clearInput} style={{ cursor: "pointer" }} />
            )
          }
        />
        <Input
          width={"100%"}
          id="SearchRecipe"
          placeholder="Search a recipe..."
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
          onClick={manageClick}
        />
      </InputGroup>
      {results.length !== 0 && (
        <Box
          ref={resultsBoxRef}
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
              style={{ cursor: "pointer" }}
              bg={"gray.800"}
              marginBlock={1}
              marginRight={1}
              marginLeft={1}
              key={result.name + "search"}
              onClick={() => {
                submitInput(result.name);
                clearInput();
              }}
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
