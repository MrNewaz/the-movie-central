import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  TextField,
} from "@mui/material"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { useSnackbar } from "notistack"
import { useDebounce } from "use-debounce"
import CommonCard from "../components/Common/CommonCard"
import { searchData } from "../services/api"

const Search = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [searchValue, setSearchValue] = useState("")

  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const [value] = useDebounce(searchValue, 1000)

  useEffect(() => {
    setIsLoading(true)
    searchData(value, activePage)
      .then((res) => {
        setData(res?.results)
        setActivePage(res?.page)
        setTotalPages(res?.total_pages)
      })
      .catch((err) =>
        enqueueSnackbar(`Error fetching watchlist: ${err}`, {
          variant: "error",
        })
      )
      .finally(() => setIsLoading(false))
  }, [value, activePage, enqueueSnackbar])

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Typography align="left" variant="h4">
        Search
      </Typography>

      <TextField
        sx={{ my: 2 }}
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id="search-textField"
        label="Search movies, tv shows..."
        variant="outlined"
        placeholder="Search movies, tv shows..."
      />

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

      {data?.length === 0 && !isLoading && (
        <Typography align="center" variant="h6">
          No results found
        </Typography>
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
                to={`/${item?.media_type}/${item?.id}`}
                item
                xs={12}
                sm={3}
                key={item?.id}
              >
                <CommonCard item={item} type={item?.media_type} />
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

export default Search
