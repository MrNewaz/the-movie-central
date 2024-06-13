import { Button, Grid } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { imagePosterPath } from "../../services/api"
import { useFirestore } from "../../services/firestore"

const CommonActionCard = ({ item, user }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { checkIfInWatchlist, removeFromWatchlist } = useFirestore()

  const handleRemoveFromWatchlist = async (e) => {
    try {
      e.preventDefault()
      await removeFromWatchlist(user?.uid, item.id)
      const isSetToWatchlist = await checkIfInWatchlist(user?.uid, item.id)
      setIsInWatchlist(isSetToWatchlist)
      enqueueSnackbar("Removed from watchlist", { variant: "success" })
    } catch (error) {
      enqueueSnackbar("Error removing from watchlist", { variant: "error" })
    }
  }

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false)
      return
    }

    checkIfInWatchlist(user?.uid, item.id).then((data) => {
      setIsInWatchlist(data)
    })
  }, [item, user, checkIfInWatchlist])

  return (
    <Grid
      component={Link}
      to={`/${item.type}/${item?.id}`}
      item
      xs={12}
      sm={3}
      key={item.id}
    >
      <Box
        sx={{
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
          {new Date(item?.release_date).getFullYear()} •{" "}
          {item?.media_type === "movie" ? "Movie" : "Tv Series"}
        </Typography>

        {isInWatchlist && (
          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{
              mt: 2,
            }}
            onClick={handleRemoveFromWatchlist}
          >
            Remove from WatchList
          </Button>
        )}
      </Box>
    </Grid>
  )
}

export default CommonActionCard
