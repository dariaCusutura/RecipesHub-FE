import { HStack, Image, Input } from "@chakra-ui/react";
import logo from "./logo.png";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between">
      <Image src={logo} boxSize="60px" />
      <Input placeholder="Search a recipe..." />;
    </HStack>
  );
};

export default NavBar;
