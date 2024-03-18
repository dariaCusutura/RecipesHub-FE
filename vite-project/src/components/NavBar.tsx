import { HStack, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
import MyAccountMenu from "./MyAccountMenu";
import useEmail from "../hooks/useEmail";

interface Props {
  Logout: () => void;
  submitInput: (result: string) => void;
  manageClick: () => void;
}

const NavBar = ({ Logout, submitInput, manageClick }: Props) => {
  const email = useEmail();
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <SearchBar submitInput={(result) => submitInput(result)} manageClick={manageClick} />
      <MyAccountMenu logout={Logout} email={email}/>
    </HStack>
  );
};

export default NavBar;
