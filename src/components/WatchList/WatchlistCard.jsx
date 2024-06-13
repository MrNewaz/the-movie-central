import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { imagePosterPath } from "../../services/api"

const WatchlistCard = ({ item }) => {
  return (
    <Box
      component={Link}
      to={`/${item.type}/${item?.id}`}
      sx={{
        position: "relative",
        "& img": {
          width: "100%",
          height: "183px",
          objectFit: "cover",
          borderRadius: "16px",
        },
      }}
    >
      <img src={imagePosterPath + item?.poster_path} alt={item.title} />

      <Typography gutterBottom>{item?.title || item?.name}</Typography>

      <Typography
        align="left"
        sx={{
          fontSize: "12px",
          fontWeight: "medium",
          color: "#9CA4AB",
        }}
      >
        ⭐ {item.vote_average.toFixed(1)} | {item.type}
      </Typography>
    </Box>
  )
}

export default WatchlistCard
