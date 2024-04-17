import {  HStack, useBreakpointValue } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import MyAccountMenu from "./MyAccountMenu";
import { Recipe } from "../hooks/useRecipes";
import { User } from "../hooks/useUsers";
import Logo from "./Logo";

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
  const isLogoVisible = useBreakpointValue({ base: false, lg: true });
  return (
    <HStack justifyContent="space-between" padding="5px">
      {isLogoVisible && <Logo size="" />}
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
