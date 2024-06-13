import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

import "./styles.css"

import { Box, Typography } from "@mui/material"
import PopularCard from "./PopularCard"

export default function PopularList({ data }) {
  return (
    <Box
      sx={{
        pt: 10,
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Popular of the week
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
        spaceBetween={20}
        freeMode={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id}>
            <PopularCard item={item} index={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
