import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import React from "react";
const HeroTitle = ({ crumbs = [] }) => {
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
              {!crumb.active && <ArrowForwardIosOutlinedIcon style={{height:"12px",width:"16px",marginTop:"8px"}}/>}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default HeroTitle;