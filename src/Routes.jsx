import { Route, Routes } from "react-router-dom"
import Details from "./pages/Details"
import Discover from "./pages/Discover"
import Home from "./pages/Home"
import MovieReleases from "./pages/MovieReleases"
import Search from "./pages/Search"
import WatchList from "./pages/WatchList"
import Protected from "./routes/Protected"

const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/watchlist"
          element={
            <Protected>
              <WatchList />
            </Protected>
          }
        />
        <Route path="/discover" element={<Discover />} />
        <Route path="/movie-release" element={<MovieReleases />} />
        <Route path="/:type/:id" element={<Details />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </main>
  )
}

export default AppRoutes
