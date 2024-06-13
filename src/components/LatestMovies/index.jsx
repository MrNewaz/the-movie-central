import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

import "./styles.css"

import { Box, Typography } from "@mui/material"
import LatestCard from "./LatestCard"

export default function LatestMovies({ data }) {
  return (
    <Box
      sx={{
        pt: { xs: 5, sm: 8 },
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Latest Movies
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
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <LatestCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
