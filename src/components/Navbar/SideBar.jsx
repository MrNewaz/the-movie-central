import { LoginOutlined } from "@mui/icons-material"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { Avatar, Button, IconButton, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const navItems = [
  { name: "Home", to: "/" },
  { name: "Discover", to: "/discover" },
  { name: "Movie Release", to: "/movie-release" },
  { name: "Your Watchlist", to: "/watchlist" },
]

const SideBar = ({ user, handleGoogleLogin, logout }) => {
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev)
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "semibold",
            color: "#ffffff",
            my: 2,
            px: 2,
          }}
        >
          TheMovieCentral
        </Typography>

        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                "& .active": {
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <ListItemButton
                component={NavLink}
                to={item.to}
                sx={{ width: "100%" }}
              >
                {item.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            p: 2,
          }}
        >
          {user ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{ width: 26, height: 26 }}
                  alt={user?.displayName || user?.email}
                  src={user?.photoURL}
                />
                {user?.displayName || user?.email}
              </Box>
              <IconButton color="error">
                <LogoutIcon onClick={logout} />
              </IconButton>
            </Box>
          ) : (
            <Button
              startIcon={<LoginOutlined />}
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box>
      <IconButton size="large" onClick={handleDrawerToggle}>
        <MenuIcon color="secondary" />
      </IconButton>
      <SwipeableDrawer
        variant="temporary"
        open={open}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={() => handleDrawerToggle(false)}
        onOpen={() => handleDrawerToggle(true)}
      >
        {drawer}
      </SwipeableDrawer>
    </Box>
  )
}
export default SideBar
