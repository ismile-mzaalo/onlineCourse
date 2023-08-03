import {
  Box,
  Link,
  Flex,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Card = ({ user }) => {
  const likeHandler = () => {
    const users = JSON.parse(localStorage.getItem("Users"));

    users.forEach((i) => {
      if (i._id === user._id) {
        i.likes = 1 + +i.likes;
      }
    });
    localStorage.setItem("Users", JSON.stringify(users));
    window.location.reload();
  };
  return (
    <Box
      // maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      bgColor="black"
      transition="all"
      _hover={{ shadow: "md" }}
    >
      <Flex py="5" px="4" direction="column" justifyContent="space-between">
        <Flex>
          <Image
            src={user.image}
            alt="No Image"
            minH="50px"
            objectFit="cover"
          />
          <Heading as="h4" fontSize="lg" mb="3" color="white">
            {user.author}
          </Heading>
        </Flex>
        <Link as={RouterLink} to={user.url} _hover={{ textDecor: "none" }}>
          <Text fontSize="sm" color="blue.600">
            {user.text}
          </Text>
        </Link>
        <Flex justifyContent="space-between" p="0.1">
          <Button fontSize="sm" onClick={() => likeHandler()}>
            {user.likes || 0} Like
          </Button>
          <Text fontSize="sm" color="white">
            {user.retweets || 0} Retweet
          </Text>
          <Text fontSize="sm" color="white">
            {user.replies || 0} Replies
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Card;
