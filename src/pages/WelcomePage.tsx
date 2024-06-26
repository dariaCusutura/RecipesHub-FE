import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  VStack,
  Text,
  useTheme,
  useBreakpointValue,
} from "@chakra-ui/react";
import pattern from "../components/pattern.svg";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IoSearchOutline } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies([]);
  if (cookie.jwt) removeCookie("jwt");
  const theme = useTheme();
  const color = theme.colors.background;
  const marginBottom = useBreakpointValue({ base: 4, sm: 8, md: 12 });
  const size = useBreakpointValue({ base: "45px", md: "60px", lg: "60px" });

  return (
    <Box
      bgImage={`url(${pattern})`}
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed"
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="100vw"
      m={0}
      p={0}
      overflowY="auto"
    >
      <Grid templateAreas={`"nav" "main"`}>
        <GridItem area={"nav"}>
          <Flex padding="20px" justifyContent="flex-end">
            <Button
              variant={"primary"}
              marginRight={3}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant={"primary"}
              marginRight={3}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Flex>
        </GridItem>
        <Center>
          <GridItem
            area={"main"}
            marginTop={15}
            bgColor={"background"}
            opacity={0.95}
            marginBottom={marginBottom}
            placeItems="center"
            width="100%"
          >
            <VStack spacing={6}>
              <Heading
                textAlign="center"
                bgColor={"background"}
                fontSize={{ lg: "40px", md: "40px", base: "35px" }}
              >
                Welcome to
              </Heading>
              <Logo size={size} onClick={() => {}} />
              <Heading
                textAlign="center"
                bgColor={"background"}
                fontSize={{ lg: "40px", md: "40px", base: "35px" }}
              >
                Discover a world of delicious recipes <br /> and join our
                vibrant community of food enthusiasts
              </Heading>
            </VStack>
            <HStack
              spacing={{ lg: "12rem", md: "10rem", base: "2rem" }}
              justifyContent={"center"}
              marginTop={"5rem"}
            >
              <VStack>
                <Avatar
                  bg={"thirdColor"}
                  icon={<IoSearchOutline size={"2em"} color={color} />}
                  boxSize="4em"
                  _hover={{
                    bg: "accent",
                    transition: "0.9s",
                  }}
                />
                <Heading fontSize={{ lg: 25, md: 25, base: 20 }}>
                  <Text textAlign="center">Search new</Text>
                  <Text textAlign="center">recipes</Text>
                  <br />
                </Heading>
              </VStack>
              <VStack>
                <Avatar
                  bg={"thirdColor"}
                  icon={<FaBowlFood size={"2em"} color={color} />}
                  boxSize="4em"
                  _hover={{
                    bg: "accent",
                    transition: "0.9s",
                  }}
                />
                <Heading fontSize={{ lg: 25, md: 25, base: 20 }}>
                  <Text textAlign="center">Post your</Text>
                  <Text textAlign="center">favorite</Text>
                  <Text textAlign="center">recipes</Text>
                </Heading>
              </VStack>
              <VStack>
                <Avatar
                  bg={"thirdColor"}
                  icon={<FaUserFriends size={"2em"} color={color} />}
                  boxSize="4em"
                  _hover={{
                    bg: "accent",
                    transition: "0.9s",
                  }}
                />
                <Heading fontSize={{ lg: 25, md: 25, base: 20 }}>
                  <Text textAlign="center">Get inspired</Text>
                  <Text textAlign="center">by the</Text>
                  <Text textAlign="center">community</Text>
                </Heading>
              </VStack>
            </HStack>
          </GridItem>
        </Center>
      </Grid>
    </Box>
  );
};

export default WelcomePage;
