import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Skeleton, Stack } from '@mui/material';

const ProductSkeleton = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
      autoPlay: false,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1,
    },
  };

  return (
    <Stack
      gap={1}
      sx={{
        ".react-multi-carousel-list": {
          justifyContent: "flex-start",
          alignItems: "center",
        },
        ".react-multi-carousel-item": {
          // padding: "0",
          width: { md: "100% !important", xs: "fit-content !important" },
          padding: "10px",
        },
      }}
    >
      <Carousel
      swipeable={true}
        responsive={responsive}
        centerMode
        autoPlay={responsive.desktop.autoPlay}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        deviceType="desktop"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <Stack
            flexDirection={"column"}
            justifyContent={"center"}
            spacing={1}
            key={index}
            sx={{ width: "100%" }}
          >
            <Skeleton variant="rectangular" width={308} height={200} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton animation="wave" />
              <Skeleton width="60%" animation="wave" />
            </Box>
          </Stack>
        ))}
      </Carousel>
    </Stack>
  );
};

export default ProductSkeleton;