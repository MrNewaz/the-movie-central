import {
  Bookmark,
  BookmarkBorderOutlined,
  FavoriteBorder,
  FileDownloadOutlined,
  PlayCircle,
  ShareOutlined,
} from "@mui/icons-material"
import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"
import Box from "@mui/material/Box"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useSnackbar } from "notistack"
import CastList from "../components/CastList"
import SimilarList from "../components/SimilarList"
import { useAuth } from "../context/useAuth"
import {
  fetchCredits,
  fetchDetails,
  fetchSimilar,
  imagePath,
} from "../services/api"
import { useFirestore } from "../services/firestore"
import minutesToHours from "../utils/minutesToHours"

const Details = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useParams()
  const { type, id } = router

  const { user } = useAuth()
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore()

  const [details, setDetails] = useState({})
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, similarData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchSimilar(type, id),
        ])

        // Set details
        setDetails(detailsData)

        // Set cast
        setCast(creditsData?.cast?.slice(0, 10))

        // Set similar
        setSimilar(similarData?.results)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, id])

  const handleSaveToWatchlist = async () => {
    if (!user) {
      enqueueSnackbar("Please sign in to add to watchlist", {
        variant: "error",
      })
      return
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    }

    const dataId = details?.id?.toString()
    try {
      await addToWatchlist(user?.uid, dataId, data)
      const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId)
      setIsInWatchlist(isSetToWatchlist)
      enqueueSnackbar("Added to watchlist", { variant: "success" })
    } catch (error) {
      enqueueSnackbar("Error adding to watchlist", { variant: "error" })
    }
  }

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false)
      return
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data)
    })
  }, [id, user, checkIfInWatchlist])

  const handleRemoveFromWatchlist = async () => {
    try {
      await removeFromWatchlist(user?.uid, id)
      const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id)
      setIsInWatchlist(isSetToWatchlist)
    } catch (error) {
      enqueueSnackbar("Error removing from watchlist", { variant: "error" })
    }
  }

  const title = details?.title || details?.name
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date

  if (loading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Container>
    )
  }
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(13, 12, 15, 0.6), rgba(13, 12, 15, 0.3),rgba(13, 12, 15, 0.8), rgba(13, 12, 15,1)), 
              url(${imagePath + details.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: { xs: "100vh", sm: "600px" },
          width: "100%",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            pt: 10,
            pb: 5,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "start",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Chip
            label={details?.media_type === "movie" ? "Movie" : "Series"}
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
            {title}
          </Typography>
          <Typography
            sx={{
              color: "#9CA4AB",
              fontSize: "14px",
              mt: 2,
            }}
          >
            {minutesToHours(details?.runtime)} |{" "}
            {new Date(releaseDate).getFullYear()} •{" "}
            {details?.genres?.map((genre) => genre?.name).join(" • ")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: 2,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button startIcon={<PlayCircle />} variant="contained">
                Continue Watching
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
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                startIcon={<FileDownloadOutlined />}
                color="inherit"
                variant="outlined"
              >
                Download
              </Button>
              <Button
                startIcon={<ShareOutlined />}
                color="inherit"
                variant="outlined"
              >
                Share
              </Button>
              <Button
                startIcon={<FavoriteBorder />}
                color="inherit"
                variant="outlined"
              >
                Like
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            mt: 2,
          }}
        >
          Story Line
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#9CA4AB",
            mt: 1,
          }}
        >
          {details?.overview}
        </Typography>
        <CastList cast={cast} />
        <SimilarList data={similar} type={type} />
      </Container>
    </Box>
  )
}

export default Details
