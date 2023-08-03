import { Grid, Link, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Message from "../components/Message";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function getUsers() {
    try {
      const users = JSON.parse(localStorage.getItem("Users"));
      if (users) {
        setUsers(users);
        return;
      }
      const { data } = await axios.get(
        "http://www.mocky.io/v2/5d1ef97d310000552febe99d"
      );

      setUsers(data);
      localStorage.setItem("Users", JSON.stringify(data));
    } catch (err) {
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

  return (
    <>
      {error && <Message type="error">{error}</Message>}
      <Grid
        templateColumns={{
          sm: "1fr",
          lg: "1fr 1fr",
        }}
        gap="8"
      >
        {users.map((i) => (
          <Card key={i._id} user={i} />
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
