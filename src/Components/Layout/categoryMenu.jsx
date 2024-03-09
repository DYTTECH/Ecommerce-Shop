import { useEffect, useState } from "react";
import BASEURL from "../../Data/API";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import { Box, CircularProgress, Menu, MenuItem, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { ButtonStyle } from "../../Style/StyledComponents/Buttons";
import { BoxMenuSkew } from "../../Style/StyledComponents/Box";
import CategoryMenuSkeleton from "../Skeleton/CategoryMenuSkeleton";
import { GrayText } from "../../Style/StyledComponents/Typography";
import { useNavigate } from "react-router-dom";

const CategoriesMenu = () => {
  const navigate=useNavigate()
  const storedLanguage = localStorage.getItem("language");
  const dispatch = useDispatch();
  // const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));  
  const shopInfo=useSelector((state)=>state.shopInfo.value.shop)
   const categories = useSelector((state) => state.categories.value);

  const [subCategories, setSubCategories] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null); // State for the "More" menu
  let { t } = useTranslation();
  const open = Boolean(anchorEl);
  const moreOpen = Boolean(moreAnchorEl); // Boolean for the "More" menu
  const theme = useTheme();
  

  const handleClick = (event, categoryId) => {
    setAnchorEl(event.currentTarget);
    setCategoryID(categoryId);
  };

  const handleClose = (categoryId) => {
    navigate(`/t2/${shopInfo.sub_domain}/products`, { state: { keys: { category_id: categoryId } } });
    setAnchorEl(null);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const [GetCategoryRequest, GetCategoryResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/categories/?level=${"0"}`,
    method: "get",
  });

  const [GetSubCategoryRequest, GetSubCategoryResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/categories/?level=${"1"}`,
    method: "get",
  });


  const GetCategories = (sizeParams = 200) => {
    GetCategoryRequest({
      params: {
        size:sizeParams,
      }, 
      onSuccess: (res) => {
         dispatch({ type: "categories/set", payload: res?.data});
        
      },
      onError: (err) => {
        dispatch({ payload: err.message });
       
      }
    });
  };

  const GetSubCategories = (sizeParams = 200) => {
    GetSubCategoryRequest({
      params: {
        size:sizeParams,
      }, 
      onSuccess: (res) => {
        const filteredSubCategories = res.data.results.filter(subCategory =>
          subCategory?.parent_id === categoryID
        );
        setSubCategories(filteredSubCategories);
        
      },
      onError: (err) => {
        dispatch({ payload: err.message });
        
      },
    });
  };


  useEffect(() => {
    setTimeout(()=>{
      if(shopInfo?.id){
        GetCategories();
    }
    },5000)
  }, [shopInfo?.id]);
  useEffect(() => {
   
      if(shopInfo?.id){
        GetSubCategories();
    }
   
  }, [shopInfo?.id,categoryID]);

 

  return (
    <>
      <Box
        elevation={0}
        disableGutters
        position="fixed"
        sx={{
          display: { lg: "flex", md: 'none', sm: 'none', xs: 'none' },
          justifyContent: "center",
          textAlign: "center",
          mt: { lg: 4, md: 1, sm: 2, xs: 3 },
          background: theme.palette.primary.dark,
          width: '100%',
          zIndex:'1',
          gap:2
        }}
      >
        {GetCategoryResponse.isPending?<CategoryMenuSkeleton/>:
        categories?.results?.slice(0, 4).map((category, index) => (
          <ButtonStyle
            key={index}
            id="demo-positioned-button"
            aria-controls={open ? "subcategories-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => handleClick(event, category.id)}
            sx={{fontFamily:"Cairo"}}
          >
            {category.name}
          </ButtonStyle>
        ))}
        {categories?.results?.length > 4 && (
          <Box sx={{ position: 'relative', mr: 2 }}>
          <BoxMenuSkew sx={{bgcolor: theme.palette.primary.main}}></BoxMenuSkew>
          <ButtonStyle
            onClick={handleMoreClick} 
            sx={{fontFamily:"Cairo"}}
          >
            {t("More")}
          </ButtonStyle>
        </Box>
        )}
        <Box sx={{ position: 'relative', mr: 3 }}>
          <BoxMenuSkew sx={{bgcolor: theme.palette.primary.red}}></BoxMenuSkew>
          <ButtonStyle sx={{fontFamily:"Cairo"}} onClick={()=>navigate(`/t2/${shopInfo?.sub_domain}/discounts`)} >
            {t("Sales")}
          </ButtonStyle>
        </Box>
        {/* "More" menu */}
        <Menu
          id="more-menu"
          anchorEl={moreAnchorEl}
          open={moreOpen}
          onClose={handleMoreClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {categories?.results?.slice(4).map((category, index) => (
            <MenuItem key={index} onClick={handleMoreClose} sx={{fontFamily:"Cairo"}}>
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/* Dropdown menu for subcategories */}
      <Box>
        <Menu
          id="subcategories-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {
          GetSubCategoryResponse.isPending?
          <Stack   alignItems="center" justifyContent={'center'} sx={{height:"220px",width:200}}>
          <CircularProgress   size={36}  /> </Stack> : subCategories.length>0?
          subCategories?.map((subcategory, index) => (
            <MenuItem key={index} onClick={()=>handleClose(subcategory.id)} sx={{fontFamily:"Cairo"}}>
              {subcategory.name}
            </MenuItem>
          )):<Stack justifyContent={'center'} alignItems={'center'} sx={{height:"220px",width:200}}>
          <GrayText>No subcategories</GrayText>
          </Stack>}
        </Menu>
      </Box>
    </>
  );
};

export default CategoriesMenu;
