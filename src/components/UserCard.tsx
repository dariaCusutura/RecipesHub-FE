import {
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { User } from "../hooks/useUsers";
import { VscAccount } from "react-icons/vsc";
import UserMenuButton from "./UserMenuButton";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const theme = useTheme();
  const color = theme.colors.accent;

  return (
    <Card padding="10px" borderRadius={10} direction="row" overflow="hidden">
      <CardBody>
        <Flex justifyContent="space-between">
          <HStack marginBlock={3}>
            <VscAccount size={35} color={color} />
            <Heading size="lg" color={"accent"}>
              {user.name}
            </Heading>
          </HStack>
          <UserMenuButton user={user} />
        </Flex>
        <Text>email: {user.email}</Text>
        <Text>Admin: {user.isAdmin ? "yes" : "no"}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
