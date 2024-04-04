import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    background: "#314357",
    secondColor: "#456672",
    thirdColor: "#e3b587",
    forthColor: "#c98c70",
    accent: "#D4974A"
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "thirdColor",
          color: "background",
          _hover: {
            bg: "#D4974A",
            boxShadow:
              "5px 12px 12px 0 rgba(0,0,0,0.3)",
            transition: "0.7s",
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "thirdColor",
          boxShadow:
              "5px 5px 12px 0 rgba(0,0,0,0.5)"
        },
        item: {
          bg: "thirdColor",
          color: "background",
          borderRadius: "3",
          _hover: {
            bg: "#D4974A",
            transition: "0.7s",
          }
        }
      },
    },
  },
});

export default theme;
