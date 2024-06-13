import { CssBaseline } from "@mui/material"
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import AppRoutes from "./Routes"

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
