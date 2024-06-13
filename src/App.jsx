import { CssBaseline } from "@mui/material"

import ThemeProvider from "@mui/material/styles/ThemeProvider"
import createTheme from "@mui/material/styles/createTheme"
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes"
import AppRoutes from "./Routes"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#00925D",
      },
      secondary: {
        main: "#ffffff",
      },
      background: {
        default: "#000000",
      },
    },
    typography: {
      fontFamily: "Rubik",
      button: {
        textTransform: "none",
      },
    },
  })
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <Navbar />
      <AppRoutes />
      <Footer />
    </ThemeProvider>
  )
}

export default App
