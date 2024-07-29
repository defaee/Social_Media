import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import RegisterPage from "./components/templates/register";

const theme = createTheme({
  palette: {
    text: { primary: "#0B0E1B" },
    background: { default: "#F3F4FA" },
    primary: { main: "#4F59BA" },
    secondary: { main: "#B597D6" },
    success: { main: "#B36FC7" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 800,
      lg: 1200,
      xl: 1700,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>hi</h1>} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
