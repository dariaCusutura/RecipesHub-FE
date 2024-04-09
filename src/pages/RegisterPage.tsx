import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { MdOutlineEmail } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies([]);
  if (cookie.jwt) removeCookie("jwt");
  const handleSubmit = async () => {
    await axios
      .post(
        "http://localhost:3000/register",
        { name: name, email: email, password: password },
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
          <form
            onSubmit={(e) => {
              handleSubmit();
              e.preventDefault();
            }}
          >
            <FormControl
              paddingBlock={3}
              onSubmit={(e) => e.preventDefault()}
              isInvalid={error !== ""}
            >
              <InputGroup marginBottom={5}>
                <InputLeftElement>
                  <VscAccount size={20} />
                </InputLeftElement>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
              <InputGroup marginBottom={5}>
                <InputLeftElement>
                  <MdOutlineEmail size={20} />
                </InputLeftElement>
                <Input
                  id="RegisterEmail"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement>
                  <RiLockPasswordLine size={20} />
                </InputLeftElement>
                <Input
                  id="RegisterPassword"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </InputGroup>
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <Button marginTop={3} type="submit" width="100%">
              Submit
            </Button>
          </form>
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