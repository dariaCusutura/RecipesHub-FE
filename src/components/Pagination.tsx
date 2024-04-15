import { Button, Flex, Text } from "@chakra-ui/react";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { Recipe } from "../hooks/useRecipes";

interface Props {
  changePage: (direction: string) => void;
  page: number;
  totalRecipesCount: number;
  displayedRecipesCount: number;
  displayRecipes: Recipe[];
}

const Pagination = ({
  changePage,
  page,
  totalRecipesCount,
  displayedRecipesCount,
  displayRecipes,
}: Props) => {
  return (
    <Flex placeContent={"center"} paddingBottom={5} paddingTop={3}>
      <Button
        isDisabled={page === 0}
        variant="primary"
        leftIcon={<MdOutlineArrowBackIosNew size={20} />}
        marginRight={1.5}
        onClick={() => changePage("prev")}
      >
        Prev
      </Button>
      <Text fontSize={25}>{page + 1}</Text>
      <Button
        variant="primary"
        rightIcon={<MdArrowForwardIos size={20} />}
        onClick={() => changePage("next")}
        marginLeft={1.5}
        isDisabled={
          displayedRecipesCount !== 5 ||
          totalRecipesCount === (page + 1) * 5 ||
          displayRecipes.length < 5
        }
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
