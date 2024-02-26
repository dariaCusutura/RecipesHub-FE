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

const Register = () => {
  const [values, setValues] = useState({ email: "", password: "" });
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
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </FormControl>
          <FormControl paddingBlock={3} onSubmit={(e) => e.preventDefault()}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" />
          </FormControl>
          <Button>Submit</Button>
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
