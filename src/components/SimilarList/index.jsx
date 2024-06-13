import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

import "./styles.css"

import { Box, Typography } from "@mui/material"
import CommonCard from "../Common/CommonCard"

export default function SimilarList({ data, type }) {
  const title =
    type === "tv" ? "Similar TV Shows for you" : "Similar Movies for you"
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          mt: { xs: 2, sm: 4 },
          mb: 2,
        }}
      >
        {title}
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
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        freeMode={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <CommonCard item={item} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
