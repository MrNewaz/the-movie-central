import {
  CircularProgress,
  Container,
  Grid,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CommonCard from "../components/Common/CommonCard"
import { fetchMovies } from "../services/api"

const MovieReleases = () => {
  const [movies, setMovies] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState("vote_average.desc&vote_count.gte=1000")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchMovies(activePage, sortBy)
      .then((res) => {
        setMovies(res?.results)
        setActivePage(res?.page)
        setTotalPages(res?.total_pages)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [activePage, sortBy])

  const handleSort = (event, newType) => {
    setSortBy(newType)
  }
  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Typography align="left" variant="h4">
          Movie Releases
        </Typography>
        <ToggleButtonGroup
          value={sortBy}
          exclusive
          onChange={handleSort}
          size="small"
          aria-label="Sort"
        >
          <ToggleButton value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </ToggleButton>
          <ToggleButton value="popularity.desc">Popular</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      <Grid container spacing={3} alignItems="stretch">
        {movies?.length > 0 &&
          !isLoading &&
          movies?.map((item, i) =>
            isLoading ? (
              <Grid item xs={12} sm={3} key={i}>
                <CircularProgress color="primary" />
              </Grid>
            ) : (
              <Grid
                component={Link}
                to={`/movie/${item?.id}`}
                item
                xs={12}
                sm={3}
                key={item.id}
              >
                <CommonCard key={item?.id} item={item} type="movie" />
              </Grid>
            )
          )}
      </Grid>

      {movies?.length > 0 && !isLoading && (
        <Pagination
          sx={{
            mt: 2,
            mb: { xs: 0, sm: 2 },
          }}
          variant="outlined"
          count={totalPages}
          page={activePage}
          onChange={(_, page) => {
            setActivePage(page.toString())
          }}
          shape="rounded"
        />
      )}
    </Container>
  )
}

export default MovieReleases
