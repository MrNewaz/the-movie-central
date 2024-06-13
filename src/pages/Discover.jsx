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
import { fetchDiscover } from "../services/api"

const Discover = () => {
  const [data, setData] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [type, setType] = useState("movie")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchDiscover(activePage, type)
      .then((res) => {
        console.log(res, "res")
        setData(res?.results)
        setActivePage(res?.page)
        setTotalPages(res?.total_pages)
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false))
  }, [activePage, type])

  const handleType = (event, newType) => {
    setType(newType)
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
          Discover
        </Typography>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={handleType}
          size="small"
          aria-label="Type"
        >
          <ToggleButton value="movie">Movies</ToggleButton>
          <ToggleButton value="tv">Tv Series</ToggleButton>
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
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item, i) =>
            isLoading ? (
              <Grid item xs={12} sm={3} key={i}>
                <CircularProgress color="primary" />
              </Grid>
            ) : (
              <Grid
                component={Link}
                to={`/${item.media_type || type}/${item?.id}`}
                item
                xs={12}
                sm={3}
                key={item.id}
              >
                <CommonCard item={item} type={type} />
              </Grid>
            )
          )}
      </Grid>

      {data?.length > 0 && !isLoading && (
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

export default Discover
