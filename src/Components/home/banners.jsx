import {
  Box,
  Card,
  Container,
  Grid,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MainTitle } from "../../Style/StyledComponents/Typography";

const Banners = ({ items, display, overflow_type, props }) => {
  const { window } = props || {}; // Destructure 'window' with a default value of an empty object
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const theme = useTheme();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
console.log(items);
  return (
    <Box
      sx={{
        flexGrow: 1,
        transition: "0.8s all",
        paddingBottom: trigger ? "5%" : "8%",
        paddingTop: trigger ? "1%" : "0",
        marginTop:{lg:'69px', md:'0', sm:'0',xs:'0'}
      }}
    >
      <MainTitle>{items.title}</MainTitle>
      {display === "multiple" ? (
        overflow_type === "scroll" ? (
          <Container maxWidth="xl">
            <Carousel
              swipeable={true}
              responsive={responsive}
              customTransition="all .5"
              transitionDuration={1000}
              containerClass="carousel-container"
              arrows
            >
              {items?.map((banner, index) => (
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={index}
                >
                  <img
                    src={banner?.image}
                    alt={banner?.name}
                    style={{ width: "100%", height: 320 }}
                  />
                </Card>
              ))}
            </Carousel>
          </Container>
        ) : (
          overflow_type === "wrap" && (
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                {items &&
                  items?.map((banner, index) => (
                    <Grid item xs={6} md={2} key={index}>
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={banner?.image}
                          alt={banner?.name}
                          style={{ width: "100%" }}
                        />
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          )
        )
      ) : (
        display === "single" &&
        items?.map((banner, index) => (
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={index}
          >
            <img
              src={banner?.image}
              alt={banner?.name}
              style={{ width: "100%", height: 350 }}
            />
          </Card>
        ))
      )}
    </Box>
  );
};

export default Banners;
