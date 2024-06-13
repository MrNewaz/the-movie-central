import {
  Bookmark,
  BookmarkBorderOutlined,
  PlayCircle,
  PlayCircleOutline,
} from "@mui/icons-material"
import { Button, Chip, Container, Grid, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { imagePath } from "../../services/api"
import { useFirestore } from "../../services/firestore"
import idToGenre from "../../utils/idToGenre"

const HeroSlide = ({ item, user }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore()

  const handleSaveToWatchlist = async () => {
    if (!user) {
      console.log("Please login to add to watchlist")
      return
    }

    const data = {
      id: item?.id,
      title: item?.title || item?.name,
      type: item?.media_type || "movie",
      poster_path: item?.poster_path,
      release_date: item?.release_date || item?.first_air_date,
      vote_average: item?.vote_average,
      overview: item?.overview,
    }

    const dataId = item?.id?.toString()
    await addToWatchlist(user?.uid, dataId, data)
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId)
    setIsInWatchlist(isSetToWatchlist)
  }

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, item.id)
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, item.id)
    setIsInWatchlist(isSetToWatchlist)
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

  console.log("item", item)
  return (
    <Box sx={{ height: "100vh" }}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(13, 12, 15, 0.6), rgba(13, 12, 15, 0.3),rgba(13, 12, 15, 0.8), rgba(13, 12, 15,1)), 
              url(${imagePath + item?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 10,

            display: "flex",
            justifyContent: "flex-end",
            alignItems: "start",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <Chip
                label={item?.media_type === "movie" ? "Movie" : "Series"}
                sx={{
                  bgcolor: "#0D0C0F",
                }}
              />
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "32px",
                  fontWeight: "bold",
                  mt: 2,
                }}
              >
                {item?.title || item?.name}
              </Typography>
              <Typography
                sx={{
                  color: "#9CA4AB",
                  fontSize: "14px",
                  mt: 2,
                }}
              >
                {new Date(
                  item?.first_air_date || item?.release_date
                ).getFullYear()}{" "}
                •{" "}
                {item?.genre_ids
                  ?.map((genre) => idToGenre(genre, item?.media_type))
                  .join(" • ")}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  mt: 2,
                }}
              >
                {item?.overview}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                <Button startIcon={<PlayCircle />} variant="contained">
                  Play Now
                </Button>
                <Button
                  startIcon={<PlayCircleOutline />}
                  color="inherit"
                  variant="outlined"
                >
                  Watch Trailer
                </Button>
                {!isInWatchlist ? (
                  <Button
                    startIcon={<BookmarkBorderOutlined />}
                    color="inherit"
                    variant="outlined"
                    onClick={handleSaveToWatchlist}
                  >
                    Add to Watchlist
                  </Button>
                ) : (
                  <Button
                    startIcon={<Bookmark />}
                    variant="contained"
                    onClick={handleRemoveFromWatchlist}
                  >
                    In Watchlist
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default HeroSlide
