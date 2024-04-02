import {
  Button,
  HStack,
  Heading,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrUserSettings } from "react-icons/gr";

interface Props {
  name: string;
  email: string;
}

const ManageAccount = ({ name, email }: Props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/users/updatePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data || "An error occurred");
      if (
        error.response?.data === "Access denied." ||
        error.response?.data === "Invalid token"
      ) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  return (
    <>
      <MenuItem paddingLeft={4} onClick={onOpen}>
        <HStack spacing={1}>
          <GrUserSettings size={20} />
          <Text>Manage Account</Text>
        </HStack>
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={30} marginTop={3}>
              Manage Account
            </ModalHeader>
            <ModalCloseButton marginTop={3} />
            <ModalBody>
              <HStack
                spacing={5}
                marginBottom={5}
                justifyContent={"space-between"}
              >
                <Text fontSize={18}>Email</Text>
                <Input value={email} id="email" readOnly width={320} />
              </HStack>
              <HStack
                spacing={5}
                marginBottom={5}
                justifyContent={"space-between"}
              >
                <Text fontSize={18}>Name</Text>
                <Input value={name} id="name" readOnly width={320} />
              </HStack>
              <Heading fontSize={20} marginBottom={5}>
                Change password
              </Heading>
              <form>
                <HStack justifyContent={"space-between"} marginBottom={5}>
                  <Text fontSize={17}>Current password</Text>
                  <Input
                    id="old"
                    type={"password"}
                    width={250}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      e.preventDefault();
                    }}
                  />
                </HStack>
                <HStack justifyContent={"space-between"} marginBottom={5}>
                  <Text fontSize={17}>New password</Text>
                  <Input
                    id="new"
                    type={"password"}
                    width={250}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      e.preventDefault();
                    }}
                  />
                </HStack>
              </form>
              {error && <Text color={"red"}>{error}</Text>}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={"green"} onClick={handleSubmit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ManageAccount;
