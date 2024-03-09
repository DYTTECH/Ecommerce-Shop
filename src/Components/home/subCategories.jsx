import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Card } from "../../Style/StyledComponents/Cards";
import BASEURL from "../../Data/API";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import { useEffect } from "react";
import { Tooltip } from "@mui/material";
import { useTheme } from "@emotion/react";
import { GrayText } from "../../Style/StyledComponents/Typography";
import { useScrollTrigger } from '@mui/material';
import { useNavigate } from "react-router-dom";

const SubCategories = ({ category_level, props}) => {
  const navigate=useNavigate()
  const { window } = props || {}; // Destructure 'window' with a default value of an empty object
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const dispatch = useDispatch();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  
  const subCategories = useSelector((state) => state.subCategories.value);

  const theme = useTheme();
  const [subCategoryRequest, getSubCategoryResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/categories/?level=${category_level}`,
    method: "get",
  });

  const GetSubCategories = () => {
    subCategoryRequest({
      params: {
        size: 12,
      },
      onSuccess: (res) => {
        
        dispatch({ type: "subCategories/set", payload: res.data});
      },
      onError: (err) => {
        dispatch({ payload: err.message });
      },
    });
  };
  
  useEffect(() => {
    
      if(shopInfo?.id){
        GetSubCategories();
    }
   
  }, [shopInfo?.id]);

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {subCategories?.results?.map((category, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: theme.palette.primary.secondLight,
                height: "5.5rem",
                paddingX: 4,
              }}
              onClick={() => navigate(`/t2/${shopInfo.sub_domain}/products`,{state:{keys:{
                category_id:category?.id
              }}})}
            >
              <GrayText>{category?.name}</GrayText>
              <Tooltip title={category?.name} arrow>
                {category?.image ? (
                  <img
                    src={category?.image}
                    style={{ width: "4rem" }}
                    alt={category?.name}
                  />
                ) : (
                  <Box
                    sx={{
                      backgroundColor: "transparent",
                      color: theme.palette.primary.third,
                      width: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                  >
                    <img
                    src={shopInfo?.logo}
                    style={{ width: "4rem" }}
                    alt={category?.name}
                  />
                  </Box>
                )}
              </Tooltip>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubCategories;
