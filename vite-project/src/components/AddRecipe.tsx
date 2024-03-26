import {
  Button,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import img from "./NoImg.jpg";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { LuPlusSquare } from "react-icons/lu";
import toast from "react-hot-toast";

interface Props {
  name: string;
}

const AddRecipe = ({ name }: Props) => {
  const [recipeName, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageAddress, setImageAddress] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = ["Sweet", "Savoury"];

  const manageSave = async () => {
    await axios
      .post(
        "http://localhost:3000/recipes",
        {
          name: recipeName,
          category: category,
          ingredients: ingredients === "" ? 0 : ingredients.split(","),
          image: imageAddress !== "" ? imageAddress : img,
          author: name,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      })
      .then((res) => {
        if (res !== undefined && (res as AxiosResponse).status === 200) {
          onClose();
          toast.success("Recipe Saved");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        width={160}
        justifyContent={"left"}
        leftIcon={<LuPlusSquare size={19} />}
      >
        Add recipe
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setError("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={25} marginTop={3}>
            Add a new recipe
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              id="Name"
              placeholder="Recipe name"
              marginBottom={5}
              onChange={(e) => {
                setName(e.target.value);
                e.preventDefault();
              }}
            />
            <Input
              id="Ingredients"
              placeholder="Ingredients"
              marginBottom={5}
              onChange={(e) => {
                setIngredients(e.target.value);
                e.preventDefault();
              }}
            />
            <Input
              id="Image"
              placeholder="Image address (optional)"
              marginBottom={5}
              onChange={(e) => {
                setImageAddress(e.target.value);
                e.preventDefault();
              }}
            />
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<BsChevronDown />}
                marginBottom={5}
              >
                {category !== "" ? category : "Select category"}
              </MenuButton>
              <MenuList>
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => {
                      setCategory(category);
                      setError("");
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {error && <Text color={"red"}>{error}</Text>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={manageSave} colorScheme="green">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRecipe;
