import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Tooltip, useScrollTrigger } from "@mui/material";
import { Card } from "../../Style/StyledComponents/Cards";
import { ItemsTitle, MainTitle, ProductTitle } from "../../Style/StyledComponents/Typography";
import Carousel from "react-multi-carousel";

const Brands = ({ props, items ,title}) => {
  const lang = localStorage.getItem("language");
  const { window } = props || {};
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
      autoPlay: true,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
      autoPlay: true,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
      autoPlay: true,
    },
  };
  return (
      <Box
        sx={{
          flexGrow: 1,
          transition: "0.8s all",
          paddingInline: "2%",
          paddingBottom: trigger ? "5%" : "0%",
  
          paddingTop: trigger ? "1%" : "0",
        }}
      >
         <Stack
    gap={1}
    co
    className={lang === 'en' ? 'productStack' : ''}
    sx={{
      ".react-multi-carousel-list": {
        justifyContent: lang === 'en' ? 'flex-start' : "flex-end",
        alignItems: "center",
        // padding: "20px",
      },
      ".react-multi-carousel-item": {
        // padding: "0",
        // margin: "15px",
        // width: { md: "23.7vw !important", xs: '47vw !important' },
        padding: "10px",
      },
    }}
  >
     <MainTitle sx={{paddingX:4,}}>{title}</MainTitle>
         <Carousel
      swipeable={true}
        responsive={responsive}
        centerMode
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        direction={lang === 'en' ? 'rtl' : 'ltr'}
      >
          {items &&
            items?.map((brand, index) => (
              <Tooltip title={brand?.name} arrow>
                <Grid xs={2} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      bgcolor: "#f2f2f2",
                      flexDirection:"column",
                      pb: 3
                    }}
                  >
                    <img
                      src={brand?.logo}
                      alt={brand?.name}
                      style={{ width: "100%" }}
                    />
                    <ItemsTitle>{brand?.name}</ItemsTitle>
                  </Card>
                </Grid>
              </Tooltip>
            ))}
            
       </Carousel>
       </Stack>
      </Box>
  
  );
};

export default Brands;
