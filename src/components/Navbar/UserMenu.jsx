import { KeyboardArrowDown, LoginOutlined } from "@mui/icons-material"
import { Avatar, IconButton, ListItemIcon, Tooltip } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"

export default function UserMenu({ user, logout }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title={user?.displayName || user?.email}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            sx={{ width: 26, height: 26 }}
            alt={user?.displayName || user?.email}
            src={user?.photoURL}
          />
          <KeyboardArrowDown />
        </IconButton>
      </Tooltip>

      <Menu
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          i
          onClick={() => {
            logout()
            handleClose()
          }}
        >
          <ListItemIcon>
            <LoginOutlined color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
