import { useTheme } from '@emotion/react';
import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CategoryMenuSkeleton = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 12,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 8,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const theme = useTheme();

  return (
    <Stack
      gap={2}
      sx={{
       flexDirection:"row",
       alignItems:"center",
       justifyContent:"center"
      }}
    >
       <Carousel
      swipeable={true}
        responsive={responsive}
        centerMode
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      >
      
        {Array.from({ length: 6 }, (_, index) => (
          <Stack
            flexDirection="column"
            justifyContent="center"
            spacing={1}
            key={index}
            sx={{ width: "100%"}}
          >
            <Skeleton animation="wave" width={90} height={25} sx={{ bgcolor:theme.palette.primary.gray }} />
          </Stack>
        ))}
      </Carousel>
    </Stack>
  );
};

export default CategoryMenuSkeleton;