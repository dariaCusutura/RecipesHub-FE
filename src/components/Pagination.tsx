import { Button, Flex, Text } from "@chakra-ui/react";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";

interface Props {
  changePage: (direction: string) => void;
  page: number;
  totalCardsCount: number;
  displayedCardsCount: number;
}

const Pagination = ({
  changePage,
  page,
  totalCardsCount,
  displayedCardsCount,
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
          displayedCardsCount !== 5 ||
          totalCardsCount === (page + 1) * 5
        }
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
