import { Button, HStack, Image, Input } from "@chakra-ui/react";
import logo from "./logo.png";
// import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
  Logout: () => void;
}

const NavBar = ({ Logout }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <Input id="SearchRecipe" placeholder="Search a recipe..." />
      {/* <ColorModeSwitch /> */}
      <Button onClick={Logout}>Log out</Button>
    </HStack>
  );
};

export default NavBar;
