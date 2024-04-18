import { Heading } from "@chakra-ui/react";

interface Props {
  size: string;
  onClick: () => void;
}

const Logo = ({ size, onClick }: Props) => {
  return (
    <Heading
      paddingLeft={2}
      paddingTop={3}
      color={"thirdColor"}
      bgColor={"background"}
      opacity={0.95}
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
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      RecipesHub
    </Heading>
  );
};

export default Logo;
