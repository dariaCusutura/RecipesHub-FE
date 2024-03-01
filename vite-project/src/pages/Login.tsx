import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    await axios
      .post(
        "http://localhost:3000/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .catch((err) => setError(err.response.data))
      .then((res) => {
        if (res !== undefined && (res as AxiosResponse).status === 200)
          navigate("/");
      });
  };
  return (
    <Box position="relative" h="400px">
      <AbsoluteCenter axis="both">
        <Container
          paddingBlock={4}
          borderRadius="4px"
          bg={"#202020"}
          maxW="2xl"
          centerContent={true}
        >
          <Heading size="lg">Login</Heading>
          <FormControl
            paddingBlock={3}
            onSubmit={(e) => e.preventDefault()}
            isInvalid={error !== ""}
          >
            <FormLabel htmlFor="LoginEmail">Email adress </FormLabel>
            <Input
              type="email"
              id="LoginEmail"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel htmlFor="LoginPassword" paddingTop={3}>
              Password
            </FormLabel>
            <Input
              placeholder="Password"
              id="LoginPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <Text paddingBlock={3}>
            Not a member?{" "}
            <Link color="gray.500" href="/register">
              Register
            </Link>
          </Text>
        </Container>
      </AbsoluteCenter>
    </Box>
  );
};

export default Login;
