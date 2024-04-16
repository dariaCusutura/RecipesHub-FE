import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    background: "#314357",
    secondColor: "#456672",
    cardColor: "#3E5668",
    thirdColor: "#e3b587",
    forthColor: "#c98c70",
    accent: "#D4974A",
    darkest: "#142E4B"
  },
  components: {
    Button: {
      variants: {
        primary: {
          boxShadow: "5px 12px 12px 0 rgba(0,0,0,0.1)",
          bg: "thirdColor",
          // border: "1.5px solid",
          // borderColor: "black",
          color: "background",
          _hover: {
            bg: "accent",
            boxShadow: "5px 12px 12px 0 rgba(0,0,0,0.3)",
            transition: "0.7s",
          },
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "thirdColor",
          boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.5)",
          paddingRight: "2",
          paddingLeft: "2",
        },
        item: {
          bg: "thirdColor",
          color: "background",
          borderRadius: "3",
          fontWeight: "500",
          _hover: {
            bg: "accent",
            transition: "0.7s",
          },
        },
        divider: {
          bg: "accent",
          borderWidth: "2px",
          marginTop: "-0.4",
          marginBottom: "-0.4",
        },
      },
    },
    Modal: {
      baseStyle: {
        header: { bg: "background", borderRadius: "4" },
        body: { bg: "background" },
        footer: { bg: "background", borderRadius: "4" },
      },
    },
    Input: {
      variants: {
        backgroundFix: {
          field: {
            _placeholder: {
              color: "thirdColor",
            },
            boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.2)",
            border: "2px solid",
            borderColor: "thirdColor",
            bg: "background",
            color: "thirdColor",
            _hover: {
              borderColor: "accent",
              boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.5)",
              transition: "0.7s"
            },
          },
        },
        loginFix: {
          field: {
            _placeholder: {
              color: "thirdColor",
            },
            boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.2)",
            border: "2px solid",
            borderColor: "thirdColor",
            bg: "cardColor",
            color: "thirdColor",
            _hover: {
              borderColor: "accent",
              boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.5)",
              transition: "0.7s"
            },
          },
        },
      },
      defaultProps: {
        variant: "backgroundFix",
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "cardColor",
          boxShadow: "5px 5px 12px 0 rgba(0,0,0,0.5)",
        },
      },
    },
    Text: {
      baseStyle: {
        color: "thirdColor",
      }
    },
    Tooltip: {
      baseStyle: {
        bg: "thirdColor",
        color: "background"
      }
    },
  },
});

export default theme;
