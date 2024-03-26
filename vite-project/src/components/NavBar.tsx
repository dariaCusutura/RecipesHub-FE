import { HStack, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
import MyAccountMenu from "./MyAccountMenu";

interface Props {
  Logout: () => void;
  submitInput: (result: string) => void;
  manageClick: () => void;
  email: string;
  name: string;
}

const NavBar = ({ Logout, submitInput, manageClick, email, name }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <SearchBar
        submitInput={(result) => submitInput(result)}
        manageClick={manageClick}
      />
      <MyAccountMenu logout={Logout} email={email} name={name} />
    </HStack>
  );
};

export default NavBar;
