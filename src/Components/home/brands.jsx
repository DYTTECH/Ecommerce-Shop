import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Tooltip, useScrollTrigger } from "@mui/material";
import { Card } from "../../Style/StyledComponents/Cards";
import { ItemsTitle, ProductTitle } from "../../Style/StyledComponents/Typography";

const Brands = ({ props, items }) => {
  const { window } = props || {};
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  return (
      <Box
        sx={{
          flexGrow: 1,
          transition: "0.8s all",
          paddingInline: "2%",
          paddingBottom: trigger ? "5%" : "8%",
  
          paddingTop: trigger ? "1%" : "0",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
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
        </Grid>
      </Box>
  
  );
};

export default Brands;
