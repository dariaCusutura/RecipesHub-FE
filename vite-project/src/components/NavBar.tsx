import { HStack, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
import MyAccountMenu from "./MyAccountMenu";
import useUserData from "../hooks/useUserData";


interface Props {
  Logout: () => void;
  submitInput: (result: string) => void;
  manageClick: () => void;
}

const NavBar = ({ Logout, submitInput, manageClick }: Props) => {
  const {email, name} = useUserData();
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
