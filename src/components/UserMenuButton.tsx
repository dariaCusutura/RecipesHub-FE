import { Menu, MenuButton, MenuList, useTheme } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import DeleteButton from "./DeleteButton";
import { Recipe } from "../hooks/useRecipes";
import { User } from "../hooks/useUsers";

interface Props {
  user: User;
}

const UserMenuButton = ({ user }: Props) => {
  const theme = useTheme();
  const color = theme.colors.darkest;
  return (
    <Menu>
      <MenuButton marginBottom={1} borderRadius="9999px" alignSelf="center">
        <HiOutlineDotsHorizontal size={25} color={color} />
      </MenuButton>
      <MenuList marginTop={-2} marginRight={-2}>
        <DeleteButton
          recipe={{} as Recipe}
          mode="user"
          user={user}
          deleteMyAccount={false}
        />
      </MenuList>
    </Menu>
  );
};

export default UserMenuButton;
