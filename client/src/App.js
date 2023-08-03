import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./screens/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Flex
        as="main"
        direction="column"
        mt="72px"
        minH="xl"
        py="6"
        px="6"
        bgColor="blackAlpha.900"
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
