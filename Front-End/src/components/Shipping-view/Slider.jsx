import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper w-[] ">
        <SwiperSlide>
          <img src={img1} alt="" className=" w-full sm:h-96 lg:h-96 " />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" className=" w-full sm:h-96 lg:h-[400px] " />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" className=" w-full sm:h-96 lg:h-96 " />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
