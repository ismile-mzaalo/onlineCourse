import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import CreateCourseScreen from "./screens/CreateCourseScreen";
import CreateLectureScreen from "./screens/CreateLectureScreen";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Flex
        as="main"
        direction="column"
        mt="72px"
        minH="xl"
        py="6"
        px="6"
        bgColor="WhiteAlpha 900"
      >
        <Routes>
          <Route path="/" element={<LoginScreen />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/createCourse" element={<CreateCourseScreen />}></Route>
          <Route path="/course/:id" element={<CreateLectureScreen />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
