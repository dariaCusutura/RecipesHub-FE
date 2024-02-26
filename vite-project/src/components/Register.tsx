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

const Register = () => {
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
          <Heading size="lg">Register Account</Heading>
          <FormControl paddingBlock={3}>
            <FormLabel>Email adress</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl paddingBlock={3}>
            <FormLabel>Password</FormLabel>
            <Input />
          </FormControl>
          <Button>Submit</Button>
          <Text paddingBlock={3}>
            Already have an account?{" "}
            <Link color="gray.400" href="/login">
              Login
            </Link>
          </Text>
        </Container>
      </AbsoluteCenter>
    </Box>
  );
};

export default Register;
