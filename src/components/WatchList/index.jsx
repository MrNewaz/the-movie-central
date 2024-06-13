import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

import "./styles.css"

import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import { useSnackbar } from "notistack"
import { useFirestore } from "../../services/firestore"
import WatchlistCard from "./WatchlistCard"

export default function WatchListComponent({ uid }) {
  const { enqueueSnackbar } = useSnackbar()
  const { getWatchlist } = useFirestore()

  const [watchlist, setWatchlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getWatchlist(uid)
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
  }, [uid, getWatchlist, watchlist, enqueueSnackbar])

  if (watchlist.length === 0) return null

  return (
    <Box
      sx={{
        pt: { xs: 3, sm: 8 },
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Your Watchlist
      </Typography>
      <Swiper
        breakpoints={{
          // when window width is >= 540px
          540: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 5,
          },
        }}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {!isLoading &&
          watchlist.map((item) => (
            <SwiperSlide key={item.id}>
              <WatchlistCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  )
}
