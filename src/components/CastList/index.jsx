import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

import "./styles.css"

import { Box, Typography } from "@mui/material"
import CastItem from "./CastItem"

export default function CastList({ cast }) {
  return (
    <Box>
      {cast?.length === 0 ? (
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            mt: 2,
          }}
        >
          No Cast Fount
        </Typography>
      ) : (
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            mt: 4,
            mb: 2,
          }}
        >
          Top Cast
        </Typography>
      )}

      <Swiper
        slidesPerView={2}
        breakpoints={{
          // when window width is >= 540px
          540: {
            slidesPerView: 2,
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
        spaceBetween={10}
        freeMode={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {cast &&
          cast?.map((item) => (
            <SwiperSlide key={item.id}>
              <CastItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  )
}
