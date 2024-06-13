import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

import "swiper/css/pagination"
import "./styles.css"

import { Box } from "@mui/material"
import HeroSlide from "./HeroSlide"

export default function Hero({ data, user }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 5000,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <HeroSlide item={item} user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
