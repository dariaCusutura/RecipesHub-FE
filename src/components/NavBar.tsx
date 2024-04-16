import { HStack, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
import MyAccountMenu from "./MyAccountMenu";
import { Recipe } from "../hooks/useRecipes";
import { User } from "../hooks/useUsers";

interface Props {
  Logout: () => void;
  submitInput: (result: Recipe | User) => void;
  email: string;
  name: string;
  isAdmin: boolean;
  mode: string;
  _id: number;
}

const NavBar = ({
  Logout,
  submitInput,
  email,
  name,
  isAdmin,
  mode,
  _id,
}: Props) => {
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <SearchBar submitInput={(result) => submitInput(result)} mode={mode} />
      <MyAccountMenu
        logout={Logout}
        email={email}
        name={name}
        isAdmin={isAdmin}
        _id={_id}
      />
    </HStack>
  );
};

export default NavBar;
