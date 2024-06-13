import { Chip } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { imagePosterPath } from "../../services/api"

const PopularCard = ({ item, index }) => {
  return (
    <Box
      component={Link}
      to={`/${item.media_type}/${item?.id}`}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
        height: "100%",
        width: "100%",
        gap: 2,
        "& img": {
          width: { xs: "180px", sm: "auto" },
          height: "150px",
          borderRadius: "16px",
          objectFit: "cover",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align="left" variant="h2">
          {index}
        </Typography>
      </Box>
      <img src={imagePosterPath + item?.poster_path} alt={item?.title} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Chip
          label={item.adult ? "18+" : "Pg 13"}
          size="small"
          variant="outlined"
        />
        <Typography
          align="left"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {item.title || item.name}
        </Typography>
        <Typography align="left" variant="caption">
          {item.genre_ids.map((genre) => genre).join(" . ")}
        </Typography>

        <Typography
          align="left"
          sx={{
            fontSize: "12px",
            fontWeight: "medium",
            color: "#9CA4AB",
          }}
        >
          ⭐ {item.vote_average.toFixed(1)} | {item?.media_type}
        </Typography>
      </Box>
    </Box>
  )
}

export default PopularCard
