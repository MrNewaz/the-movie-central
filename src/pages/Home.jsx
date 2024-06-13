import { CircularProgress, Container } from "@mui/material"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import PopularList from "../components/PopularList"
import { useAuth } from "../context/useAuth"
import { fetchLatest, fetchTrending } from "../services/api"

const Home = () => {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData] = await Promise.all([
          fetchTrending("week"),
          fetchLatest(),
        ])

        setTrending(trendingData)
      } catch (error) {
        console.log(error, "error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const { user } = useAuth()

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
      <Hero data={trending} user={user} />
      <Container maxWidth="xl">
        <PopularList data={trending} />
      </Container>
    </Box>
  )
}

export default Home
