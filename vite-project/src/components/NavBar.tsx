import { HStack, Image, Input } from "@chakra-ui/react";
import logo from "./logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <Input placeholder="Search a recipe..." />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
