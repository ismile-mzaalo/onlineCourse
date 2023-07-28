import { Box, Link, Flex, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link
      as={RouterLink}
      to={`/course/${course._id}`}
      _hover={{ textDecor: "none" }}
    >
      <Box
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        bgColor="gray"
        transition="all"
        _hover={{ shadow: "md" }}
      >
        <Flex py="5" px="4" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3">
            {course.name}
          </Heading>
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            {course.level}
          </Text>
          <Text fontSize="sm">{course.description}</Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default Course;
