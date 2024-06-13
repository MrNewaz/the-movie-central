import { Avatar, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { imagePosterPath } from "../../services/api"


const CastItem = ({ item }) => {
  return (
    <Box
      sx={{
        "& img": {
          width: "100px",
          height: "150px",
          borderRadius: "16px",
          objectFit: "cover",
        },
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
        gap: 2,
      }}
    >
      <Avatar
        alt={item?.name}
        src={`${imagePosterPath}/${item?.profile_path}`}
        sx={{ width: 48, height: 48 }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "medium",
          }}
        >
          {item?.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#9CA4AB",
          }}
        >
          {item?.character}
        </Typography>
      </Box>
    </Box>
  )
}

export default CastItem
