import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";
// import ColorModeSwitch from "./ColorModeSwitch";
import ManageAccount from "./ManageAccount";
import { MdLogout } from "react-icons/md";

interface Props {
  logout: () => void;
  email: string;
  name: string;
  isAdmin: boolean;
  _id: number;
}

const MyAccountMenu = ({ logout, email, name, isAdmin, _id }: Props) => {
  return (
    <Menu>
      <MenuButton
        variant="primary"
        as={Button}
        leftIcon={<VscAccount size={25} />}
        paddingRight={{ lg: "53px", md: "35px", base: "65px" }}
        paddingStart={2}
        marginEnd={{ lg: 4, md: -2.5, base: -4 }}
      >
        {isAdmin === true ? "Admin Account" : "My Account"}
      </MenuButton>
      <MenuList>
        <MenuGroup title={name} fontSize={17} color={"background"} />
        <MenuGroup title={email} fontSize={17} color={"background"} />
        <MenuDivider />
        <ManageAccount name={name} email={email} _id={_id} />
        <MenuItem id="logout" paddingLeft={4} onClick={logout}>
          <HStack spacing={1}>
            <MdLogout size={19} />
            <Text color={"background"}>Log Out</Text>
          </HStack>
        </MenuItem>
        {/* <MenuItem id="colormode" paddingLeft={4}>
          <ColorModeSwitch />
        </MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default MyAccountMenu;
