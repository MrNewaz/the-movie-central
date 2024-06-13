import { FavoriteBorderOutlined } from "@mui/icons-material"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { imagePosterPath } from "../../services/api"

const LatestCard = ({ item }) => {
  return (
    <Box component={Link} to={`/movie/${item?.id}`}>
      <Box
        sx={{
          position: "relative",
          "& img": {
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "16px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.2))",
          },
        }}
      >
        <img src={imagePosterPath + item?.poster_path} alt={item.title} />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
          >
            <Typography gutterBottom>{item?.title || item?.name}</Typography>

            <Typography
              align="left"
              sx={{
                fontSize: "12px",
                fontWeight: "medium",
                color: "#9CA4AB",
              }}
            >
              ⭐ {item.vote_average.toFixed(1)} | Movie
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 2,
          }}
        >
          <FavoriteBorderOutlined />
        </Box>
      </Box>
    </Box>
  )
}

export default LatestCard
