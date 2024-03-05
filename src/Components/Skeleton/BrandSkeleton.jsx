import { Skeleton, Stack } from '@mui/material'
import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";


const BrandSkeleton = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <Stack
          gap={1}
          sx={{
            ".react-multi-carousel-list": {
              justifyContent: "flex-start",
              alignItems: "center",
              // padding: "20px",
            },
            ".react-multi-carousel-item": {
              // padding: "0",
              // margin: "15px",
              width: {md:"100% !important",xs:'fit-content !important'},
              padding: "10px",
            },
          }}
        >
<Carousel
       responsive={responsive}
       centerMode
       ariaLabel="Carousel"
       containerClass="carousel-container"
       removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      {Array.from({length:6},(_,index)=>(
          <Stack flexDirection={"column"} justifyContent={'center'} spacing={1} key={index}  sx={{width:'100%'}}>
    
          <Skeleton variant="rectangular" animation="wave"  width={200} height={180} />
             <Skeleton width={"100%" }animation="wave" />
    
     </Stack>
      ))}
     
    </Carousel>
   </Stack>
  )
}

export default BrandSkeleton