import FormContainer from "../components/FormContainer";
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Apis } from "../api/backendApi";

const CreateCourseScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDiscription] = useState("");

  async function createCourse() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        Apis.CreateCourse,
        {
          name,
          level,
          description,
        },
        config
      );
      if (data) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    createCourse();
  };
  return (
    <>
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            create course
          </Heading>

          <form onSubmit={submitHandler}>
            <FormControl id="name" isRequired>
              <FormLabel>Name :-</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="Level" isRequired>
              <FormLabel>Level :-</FormLabel>
              <Input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="discription" isRequired>
              <FormLabel>Discription :-</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDiscription(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <Button type="submit" colorScheme="teal" mt="4">
              submit
            </Button>
          </form>
        </FormContainer>
      </Flex>
    </>
  );
};

export default CreateCourseScreen;
