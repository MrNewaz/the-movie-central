import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import { imagePosterPath } from "../../services/api"

const CommonCard = ({ item, type }) => {
  return (
    <Box
      component={Link}
      to={`/${item?.media_type || type}/${item?.id}`}
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
      {item?.poster_path ? (
        <img src={imagePosterPath + item?.poster_path} alt={item?.title} />
      ) : (
        <Box
          sx={{
            height: "183px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#F4F4F4",
            borderRadius: "16px",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#9CA4AB",
            }}
          >
            No Image
          </Typography>
        </Box>
      )}
      <Typography gutterBottom>{item?.title || item?.name}</Typography>

      <Typography
        align="left"
        sx={{
          fontSize: "12px",
          fontWeight: "medium",
          color: "#9CA4AB",
        }}
      >
        ⭐ {item?.vote_average?.toFixed(1)} |{" "}
        {item?.media_type || type === "tv" ? "TV Series" : "Movie"}
      </Typography>
    </Box>
  )
}

export default CommonCard
