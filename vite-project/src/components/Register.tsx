import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3000/register",
        { email: email, password: password },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
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
          <FormControl paddingBlock={3} onSubmit={(e) => e.preventDefault()}>
            <FormLabel>Email adress</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {/* <FormControl paddingBlock={3} onSubmit={(e) => handleSubmit(e)}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" />
          </FormControl> */}
          <Button type="submit" onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Text paddingBlock={3}>
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
