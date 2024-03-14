import { Button, HStack, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
// import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
  Logout: () => void;
  submitInput: (result: string) => void;
}

const NavBar = ({ Logout, submitInput }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <SearchBar submitInput={(result) => submitInput(result)} />
      {/* <ColorModeSwitch /> */}
      <Button onClick={Logout}>Log out</Button>
    </HStack>
  );
};

export default NavBar;
