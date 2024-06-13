import { NotificationsOutlined, Search } from "@mui/icons-material"
import {
  Box,
  Button,
  IconButton,
  Typography,
  useScrollTrigger,
} from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"

import { useSnackbar } from "notistack"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import SideBar from "./SideBar"
import UserMenu from "./UserMenu"

const pages = [
  { name: "Home", to: "/" },
  { name: "Discover", to: "/discover" },
  { name: "Movie Release", to: "/movie-release" },
  { name: "Your Watchlist", to: "/watchlist" },
]

const Navbar = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const { window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  const { user, signInWithGoogle, logout } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      enqueueSnackbar("Error signing in", { variant: "error" })
    }
  }
  return (
    <AppBar
      elevation={0}
      sx={{ bgcolor: !trigger ? "transparent" : "#000000", transition: "0.5s" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "semibold",
              color: "#ffffff",
            }}
            component={Link}
            to="/"
          >
            TheMovieCentral
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              gap: 3,
              "& > *": {
                cursor: "pointer",
              },
            }}
          >
            {pages.map(({ name, to }) => (
              <Button
                key={name}
                sx={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  color: "#ffffff",
                }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={to}
                >
                  {name}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              "& > *": {
                cursor: "pointer",
              },
            }}
          >
            <IconButton
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
              }}
              component={Link}
              to="/search"
            >
              <Search />
            </IconButton>
            <IconButton
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              <NotificationsOutlined />
            </IconButton>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
              }}
            >
              {user ? (
                <UserMenu user={user} logout={logout} />
              ) : (
                <Button color="inherit" onClick={handleGoogleLogin}>
                  Sign In
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
              }}
            >
              <SideBar
                user={user}
                handleGoogleLogin={handleGoogleLogin}
                logout={logout}
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
