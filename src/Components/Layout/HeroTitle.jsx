import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const HeroTitle = ({ crumbs = [] }) => {
  const lang = localStorage.getItem("language");

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <Typography variant="span" component="span">
              <Link
                to={crumb.link}
                style={{
                  opacity: "0.5",
                  color: "#212121",
                  opacity: crumb.active && "0.5",
                  textDecoration:"none",
                  fontFamily:"Cairo",
                }}
              >
                {crumb.label}
              </Link>
            </Typography>
            <Typography
              mx="2px"
              sx={{ opacity: crumb.active && "0.5" }}
              variant="span"
              component="span"
            >
              {!crumb.active && (
                lang === "ar" ? (
                  <ArrowForwardIosIcon style={{height:"12px",width:"16px",marginTop:"8px"}} />
                ) : (
                  <ArrowBackIosNewIcon style={{height:"12px",width:"16px",marginTop:"8px"}} />
                )
              )}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default HeroTitle;