import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Apis } from "../api/backendApi";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    try {
      setError(false);
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        Apis.UserLogin,
        { name, password },
        config
      );

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      setLoading(false);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    login(name, password);
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Login
        </Heading>

        {error && <Message type="error">{error}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="email" isRequired>
            <FormLabel>User Name</FormLabel>
            <Input
              type="text"
              placeholder="enter your user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
            Login
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default LoginScreen;
