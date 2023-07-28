import { Box, Grid, Link, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Apis } from "../api/backendApi";
import Course from "../components/Course";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getCourse() {
    try {
      const { data } = await axios.get(Apis.GetCourse);
      setCourses(data);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userData);

    getCourse();
  }, []);
  return (
    <>
      {user.isAdmin ? (
        <>
          <Flex m={3}>
            <Button onClick={() => navigate("/createCourse")}>
              Click here to Create course +
            </Button>
          </Flex>
          <p>-- click on course to create and Assign lectures --</p>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            gap="8"
          >
            {courses.map((i) => (
              <Course key={i._id} course={i} />
            ))}
          </Grid>
        </>
      ) : (
        <Heading as="h1" mb="8" fontSize="3xl">
          Login
        </Heading>
      )}
    </>
  );
};

export default Dashboard;
