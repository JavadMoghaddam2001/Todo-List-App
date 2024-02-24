import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List/List";
import Add from "./pages/Add/Add";
import Layout from "./pages/Layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import mockServer from "./server/server";
import { useEffect } from "react";
function App() {
  //Calling mocking server Func
  useEffect(() => {
    mockServer();
  }, []);

  //Creating defualt theme for MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });
  return (
    //The Routes and Theme is applied here. for routing , The Header is static in both paths,so the Layout is used.
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<List />} />
            <Route path="/addtodo" element={<Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
