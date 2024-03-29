import { HStack, Image } from "@chakra-ui/react";
import logo from "./logo.png";
import SearchBar from "./SearchBar";
import MyAccountMenu from "./MyAccountMenu";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  Logout: () => void;
  submitInput: (result: string) => void;
  manageClick: () => void;
  email: string;
  name: string;
  recipes: Recipe[];
  isAdmin: boolean;
}

const NavBar = ({
  Logout,
  submitInput,
  manageClick,
  email,
  name,
  recipes,
  isAdmin,
}: Props) => {
  return (
    <HStack justifyContent="space-between" padding="5px">
      <Image src={logo} boxSize="60px" />
      <SearchBar
        recipes={recipes}
        submitInput={(result) => submitInput(result)}
        manageClick={manageClick}
      />
      <MyAccountMenu
        logout={Logout}
        email={email}
        name={name}
        isAdmin={isAdmin}
      />
    </HStack>
  );
};

export default NavBar;
