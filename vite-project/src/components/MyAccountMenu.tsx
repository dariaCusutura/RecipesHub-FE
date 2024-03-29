import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
  logout: () => void;
  email: string;
  name: string;
  isAdmin: boolean;
}

const MyAccountMenu = ({ logout, email, name, isAdmin }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<VscAccount size={25} />}
        px={8}
        paddingStart={2}
        marginEnd={4}
      >
        {isAdmin === true ? "Admin Account" : "My Account"}
      </MenuButton>
      <MenuList>
        <MenuGroup title={name} fontSize={17} />
        <MenuGroup title={email} fontSize={17} />
        <MenuDivider />
        <MenuItem id="logout" paddingLeft={4} onClick={logout}>
          Log Out
        </MenuItem>
        <MenuItem id="colormode" paddingLeft={4}>
          <ColorModeSwitch />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyAccountMenu;
