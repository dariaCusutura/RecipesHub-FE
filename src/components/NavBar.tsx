import { HStack, useBreakpointValue } from "@chakra-ui/react";
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
  const isSmall = useBreakpointValue({ base: true, lg: false });

  return (
    <HStack width={"100%"} padding="5px">
      {!isSmall && <Logo size="" onClick={() => {}} />}
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
