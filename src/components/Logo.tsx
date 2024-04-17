import { Heading } from "@chakra-ui/react";

interface Props {
  size: string;
}

const Logo = ({size}: Props) => {
  return (
    <Heading
      paddingLeft={2}
      paddingTop={3}
      color={"thirdColor"}
      bgColor={"background"}
      sx={{
        fontSize: size !== "" ? size : "40px",
        fontWeight: "bold",
        textShadow: "5px 3px 0px rgba(0, 0, 0, 0.4)",
        letterSpacing: "2px",
        paddingBottom: "2px",
        marginBottom: "20px",
      }}
      _hover={{
        color: "accent",
        transition: "0.7s",
        textShadow: "5px 3px 0px rgba(0, 0, 0, 0.6)",
      }}
    >
      RecipesHub
    </Heading>
  );
};

export default Logo;
