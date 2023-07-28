import axios from "axios";
import {
  Flex,
  Grid,
  Image,
  Heading,
  Input,
  Spacer,
  Text,
  Button,
  Divider,
  Select,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Apis } from "../api/backendApi";
import { useParams } from "react-router-dom";
import Message from "../components/Message";

const CreateLectureScreen = () => {
  const { id: courseId } = useParams();

  const [users, SetUsers] = useState([]);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");

  const [sucess, setSucess] = useState("");
  const [error, setError] = useState(false);

  async function getUsers() {
    try {
      const { data } = await axios.get(Apis.GetUsers);
      SetUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateLecture() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${Apis.CreateLecture + courseId}`,
        { name, date, userId },
        config
      );
      setSucess(data.message);
    } catch (err) {
      console.error(err);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    updateLecture();
  };
  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Create lecture and assign to user
        </Heading>
        {error && <Message type="error">{error}</Message>}
        {sucess && <Message type="success">{sucess}</Message>}
        <form onSubmit={submitHandler}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="enter your lecture name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              placeholder="select lecture date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="user" isRequired>
            <FormLabel>User</FormLabel>
            <Select
              placeholder="select lecturer"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              {users.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <Spacer h="3" />

          <Button type="submit" colorScheme="teal" mt="4">
            create & assign
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default CreateLectureScreen;
