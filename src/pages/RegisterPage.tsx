import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useTheme,
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
  const theme = useTheme();
  const color = theme.colors.thirdColor;

  return (
    <Box position="relative" h="400px" bgColor={"background"}>
      <AbsoluteCenter axis="both">
        <Container
          paddingBlock={4}
          borderRadius="4px"
          bg={"#202020"}
          maxW="2xl"
          centerContent={true}
          bgColor={"secondColor"}
          style={{ boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.5)" }}
        >
          <Heading size="lg" color={"accent"} marginBottom={5}>
            Register
          </Heading>
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
                  <VscAccount size={20} color={color} />
                </InputLeftElement>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  variant={"loginFix"}
                />
              </InputGroup>
              <InputGroup marginBottom={5}>
                <InputLeftElement>
                  <MdOutlineEmail size={20} color={color} />
                </InputLeftElement>
                <Input
                  id="RegisterEmail"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  variant={"loginFix"}
                />
              </InputGroup>
              <InputGroup marginBottom={3}>
                <InputLeftElement>
                  <RiLockPasswordLine size={20} color={color} />
                </InputLeftElement>
                <Input
                  id="RegisterPassword"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  variant={"loginFix"}
                />
              </InputGroup>
              {error && <Text color={"accent"}>{error}</Text>}
            </FormControl>
            <Button type="submit" width="100%" variant={"primary"}>
              Submit
            </Button>
          </form>
          <Text marginTop={3}>
            Already have an account?{" "}
            <Link href="/login" color="accent" fontWeight="bold">
              Login
            </Link>
          </Text>
        </Container>
      </AbsoluteCenter>
    </Box>
  );
};

export default Register;
