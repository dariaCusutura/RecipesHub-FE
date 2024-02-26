import React from "react";
import Register from "../components/Register";
import { AbsoluteCenter, Box } from "@chakra-ui/react";

const RegisterPage = () => {
  return (
    <Box position="relative" h="300px">
      <AbsoluteCenter axis="both">
        <Register />
      </AbsoluteCenter>
    </Box>
  );
};

export default RegisterPage;
