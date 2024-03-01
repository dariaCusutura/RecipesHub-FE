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

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    await axios
      .post(
        "http://localhost:3000/register",
        { email: email, password: password },
        {
          withCredentials: true,
        }
      )
      .catch((res) => {
        setError(res.response.data);
      })
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
          <Heading size="lg">Register</Heading>
          <FormControl
            paddingBlock={3}
            onSubmit={(e) => e.preventDefault()}
            isInvalid={error !== ""}
          >
            <FormLabel htmlFor="RegisterEmail">Email adress </FormLabel>
            <Input
              id="RegisterEmail"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel htmlFor="RegisterPassword" paddingTop={3}>
              Password{" "}
            </FormLabel>
            <Input
              id="RegisterPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          <Button marginTop={3} type="submit" onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Text marginTop={3}>
            Already have an account?{" "}
            <Link color="gray.500" href="/login">
              Login
            </Link>
          </Text>
        </Container>
      </AbsoluteCenter>
    </Box>
  );
};

export default Register;
