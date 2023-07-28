import React from "react";
import { Spinner, Flex, Text } from "@chakra-ui/react";

const Loader = (props) => {
  return (
    <>
      <Flex direction="column" alignItems="center" justifyContent="center">
        {props.message && <Text fontSize="xs">{props.message}</Text>}
        <Spinner
          m="5"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          label="Loading, Please wait..."
        />
      </Flex>
    </>
  );
};

export default Loader;
