import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "xl" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="lg"
      rounded="md"
      bgColor="WhiteAlpha 900"
      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
