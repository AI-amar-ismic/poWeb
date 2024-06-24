import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
}

function Carousel({ children, className }: CarouselProps) {
  return (
    <div style={{ padding: "25px", width: "100%" }}>
      <Slider
        arrows
        className={className}
        infinite
        dots={false}
        slidesToScroll={1}
        slidesToShow={1}
        slide="div"
        autoplay={false}
        autoplaySpeed={4000}
        adaptiveHeight={true}
        centerPadding="200px"
        responsive={[
          {
            breakpoint: 850,
            settings: {
              adaptiveHeight: true,
            },
          },
        ]}
      >
        {children}
      </Slider>
    </div>
  );
}

export default Carousel;
