import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { VscAccount } from "react-icons/vsc";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
    logout: () => void;
    email: string;
}

const MyAccountMenu = ({logout, email} : Props) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<VscAccount size={25} />}
        px={8}
        paddingStart={2}
        marginEnd={4}
      >
        My Account
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
            <MenuItem id="email">{email}</MenuItem>
        </MenuGroup>
        <MenuDivider/>
        <MenuItem id="logout" onClick={logout}>Log Out</MenuItem>
        <MenuItem id="colormode"><ColorModeSwitch/></MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyAccountMenu;
