import { Facebook, Google, Instagram, Twitter } from "@mui/icons-material"
import { Container, IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Footer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        py: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>Privacy</Typography>
        <Typography sx={{ fontSize: "14px" }}>Term of service</Typography>
        <Typography sx={{ fontSize: "14px" }}>Language</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton>
          <Instagram
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
        <IconButton>
          <Facebook
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
        <IconButton>
          <Twitter
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
        <IconButton>
          <Google
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
      </Box>
      <Typography align="center" sx={{ fontSize: "14px" }}>
        © {new Date().getFullYear()}
      </Typography>
    </Container>
  )
}

export default Footer
