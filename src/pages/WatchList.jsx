import { CircularProgress, Container, Grid, Typography } from "@mui/material"

import { useEffect, useState } from "react"

import { useSnackbar } from "notistack"
import CommonActionCard from "../components/Common/CommonActionCard"
import { useAuth } from "../context/useAuth"
import { useFirestore } from "../services/firestore"

const WatchList = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { getWatchlist } = useFirestore()
  const { user } = useAuth()
  const [watchlist, setWatchlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data)
        })
        .catch((err) => {
          enqueueSnackbar(`Error fetching watchlist: ${err}`, {
            variant: "error",
          })
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [user?.uid, getWatchlist, watchlist, enqueueSnackbar])

  if (isLoading) {
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
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Typography align="left" variant="h4" gutterBottom>
        Your Watchlist
      </Typography>

      {!isLoading && (
        <Grid container spacing={3}>
          {watchlist.map((item) => (
            <CommonActionCard key={item.id} item={item} user={user} />
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default WatchList
