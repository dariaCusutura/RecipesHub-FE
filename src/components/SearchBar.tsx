import {
  Box,
  Card,
  CardBody,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { Recipe } from "../hooks/useRecipes";
import { useEffect, useRef, useState } from "react";
import { User } from "../hooks/useUsers";
import axios from "axios";

interface Props {
  submitInput: (result: Recipe | User) => void;
  mode: string;
}

const SearchBar = ({ submitInput, mode }: Props) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const resultsBoxRef = useRef(null);

  useEffect(() => {
    mode !== "users"
      ? axios
          .get(`http://localhost:3000/recipes/search?search=${input}`)
          .then((res) => {
            setResults(res.data);
          })
          .catch((err) => console.log(err.response.data))
      : axios
          .get(`http://localhost:3000/users/search?search=${input}`)
          .then((res) => {
            setResults(res.data);
          })
          .catch((err) => console.log(err.response.data));
    if (input.length === 0) setResults([]);
  }, [input, mode]);

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

  useEffect(() => {
    setInput("");
    setResults([]);
    inputRef.current.value = "";
    inputRef.current.focus();
  }, [mode]);

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
          placeholder={mode !== "users" ? "Search recipe..." : "Search user..."}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
      </InputGroup>
      {results.length !== 0 && input !== "" && (
        <Box
          ref={resultsBoxRef}
          top={"100%"}
          width={"100%"}
          marginTop={1}
          borderRadius={"4px"}
          position={"absolute"}
          zIndex="999"
          bg={"background"}
        >
          {results &&
            results.map((result) => (
              <Card
                style={{ cursor: "pointer" }}
                marginBlock={1}
                marginRight={1}
                marginLeft={1}
                key={result.name + "search"}
                onClick={() => {
                  submitInput(result);
                  clearInput();
                }}
              >
                <CardBody>
                  <Heading fontSize={19} color={"thirdColor"}>
                    {result.name}
                  </Heading>
                  {mode === "users" && <Text>{result.email}</Text>}
                  {mode === "recipesAdmin" && <Text>by {result.author}</Text>}
                </CardBody>
              </Card>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
