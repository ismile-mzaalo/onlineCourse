import { Flex, Heading } from "@chakra-ui/react";
const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="Black"
      w="100%"
      top="0"
      pos="fixed"
      zIndex="2"
    >
      <Flex align="center" mr="5">
        <Heading
          as="cite"
          color="blue.500"
          fontWeight="bold"
          size="lg"
          letterSpacing="md"
          _hover={{ color: "gray.500", textDecor: "none" }}
        >
          LABELBLIND
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;
