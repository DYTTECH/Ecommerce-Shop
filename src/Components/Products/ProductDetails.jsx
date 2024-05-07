import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import * as React from "react";
import PageMeta from "../../Components/Layout/MetaPage";
import ResponsiveLayout from "../../Components/Layout/Layout";
import CategoryMenu from "../../Components/Layout/categoryMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  BlackText,
  GrayText,
  ItemsDes,
  MainTitle,
  TextDiscount,
} from "../../Style/StyledComponents/Typography";
import { HOMECOMPONENTS, PRODUCTS } from "../../Data/API";
import useRequest from "../../Hooks/useRequest";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RecommendedForYou from "../home/recommendedForYou";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../Skeleton/ProductSkeleton";
import HeroTitle from "../Layout/HeroTitle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../../App.css";
import { RWebShare } from "react-web-share";
import Specification from "./ProductSpecification";
import CartPopup from "../../Pages/Cart/CartPopup";
import AuthLogin from "../Authentication/LogInAuth";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 76,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const Transition = forwardRef(function Transition(props, ref) {
  const { children, ...other } = props;
  return (
    <Slide direction="up" ref={ref} {...other}>
      {children}
    </Slide>
  );
});

const ProductDetails = () => {
  const params = useParams();
  const ProductDetails = useSelector((state) => state.productdetails.value);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token=JSON.parse(localStorage.getItem("userinfo"));
  const [openCartPopup, setOpenCartPopup] = useState(false);
  const [selectedimg, setSelectedimg] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const mostviewed = useSelector((state) => state.mostviewed.value);
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [openLogin,setOpenLogin]=useState(false)

  const handleOpenShareDialog = () => {
    setOpenShare(true);
  };

  const handleCloseShareDialog = () => {
    setOpenShare(false);
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseCartPopup = () => {
    setOpenCartPopup(false);
  };
  // Get shop home component
  const [RequestGetProductSort, ResponseGetProductSort] = useRequest({
    method: "Get",
    path: HOMECOMPONENTS + shopInfo?.id + "/products/?query_id=4",
    token:token?`Token ${token}`:null
  });
  const GetProductSort = () => {
    RequestGetProductSort({
      onSuccess: (res) => {
        dispatch({ type: "mostviewed/set", payload: res?.data });
        console.log(res.data);
      },
    });
  };
  // add to cart
  const [RequestAddProductToCart, ResponseAddProductToCart] = useRequest({
    method: "POST",
    path: `${PRODUCTS}${shopInfo?.id}/cart/items/`,
    token:token?`Token ${token}`:null
  });
  const AddProductToCart = () => {
    RequestAddProductToCart({
      body: {
        product: params?.id,
        quantity: 1,
      },
      onSuccess: (res) => {
        setOpenCartPopup(true);
        dispatch({ type: "cart/addItem", payload: res?.data });
      },
    });
  };
  
  const [RequestGetProductDetails, ResponseGetProductDetails] = useRequest({
    method: "Get",
    path: `${PRODUCTS}/${shopInfo?.id}/products/${params?.id}/`,
  });

  const GetProductDetails = () => {
    RequestGetProductDetails({
      onSuccess: (res) => {
        dispatch({ type: "productdetails/set", payload: res.data });
      },
    });
  };

  // add to favorite
  const [RequestAddProductToFavorite, ResponseAddProductToFavorite] =
    useRequest({
      method: "POST",
      path: `${PRODUCTS}/${shopInfo?.id}/favorites/`,
      token:token?`Token ${token}`:null
    });

  const AddProductToFavorite = () => {
    RequestAddProductToFavorite({
      body: {
        product: params?.id,
      },
      onSuccess: (res) => {
        dispatch({ type: "productdetails/favoriteItem", payload: res.data });
      },
    });
  };
  // delete from favorite
  const [RequestDeleteProductFromFavorite, ResponseDeleteProductFromFavorite] =
    useRequest({
      method: "Delete",
      path: `${PRODUCTS}/${shopInfo?.id}/favorites/`,
    });

  const DeleteProductFromFavorite = () => {
    RequestDeleteProductFromFavorite({
      body: {
        product: params?.id,
      },
      onSuccess: (res) => {
        dispatch({ type: "productdetails/favoriteItem", payload: {id:params?.id} });
      },
    });
  };
 // add to favorite
 const [RequestProductView, ResponseProductView] =
 useRequest({
   method: "POST",
   path: `${PRODUCTS}/${shopInfo?.id}/products/${params?.id}/view/`,
   token:token?`Token ${token}`:null
 });
  useEffect(() => {
    GetProductDetails();
    GetProductSort();
    RequestProductView()
  }, []);

  useEffect(() => {
    if (ProductDetails["images"]?.length) {
      setSelectedimg(ProductDetails["images"][0]?.image);
    }
  }, [ProductDetails["images"]]);

  const shareData = {
    text: ProductDetails.name,
    url: window.location.href.replace(" ", "%20"),
    title: ProductDetails.name,
  };
  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    {
      label: `${t("Products")}`,
      link: `/t2/${shopInfo?.sub_domain}/products/`,
      active: false,
    },
    {
      label: `${ProductDetails?.name}`,
      link: `/t2/${shopInfo?.sub_domain}/products/${ProductDetails?.name}`,
      active: false,
    },
  ];


  return (
    <Box>
      <ResponsiveLayout>
        <PageMeta
          title={ProductDetails?.name}
          desc="Description of my page for SEO"
          name={shopInfo?.full_name}
          type={shopInfo?.shop_type_name}
          image={shopInfo?.logo}
        />

        <Box sx={{ marginY: { lg: "90px", md: 2, sm: 2, xs: 2 } }}>
          <Box
            sx={{
              pr: 5,
              mb: 2,
            }}
          >
            <GrayText>
              <HeroTitle crumbs={crumbs} />
            </GrayText>
          </Box>
          <Divider />
          <Container>
            <Box sx={{ marginY: 4 }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={1}
                  xs={2}
                  sx={{
                    display: {
                      lg: "flex",
                      md: "none",
                      sm: "none",
                      xs: "none",
                    },
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {ProductDetails?.images?.map((image, index) => (
                    <Grid
                      item
                      xs={2}
                      key={index}
                      sx={{
                        maxWidth: "50% !important",
                        borderRadius: "8px",
                        objectFit: "cover",
                        border:
                          image?.image === selectedimg
                            ? "1px solid black !important"
                            : "",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedimg(image?.image)}
                    >
                      <img
                        src={image.image}
                        alt={`Img ${index}`}
                        style={{ width: "100%", height: "84px !important" }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item lg={5} md={6} xs={12}>
                  {ResponseGetProductDetails.isPending ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "70vh",
                      }}
                    >
                      <CircularProgress size="3rem" color="primary" />
                    </Box>
                  ) : (
                    <Box>
                      <img
                        src={(selectedimg || ProductDetails?.main_image
                          ? ProductDetails.main_image
                          : "https://easytrady.net/default_images/default_product.png"
                        )?.replace(/\ /g, "%20")}
                        alt={ProductDetails?.name}
                        style={{ width: "100%" }}
                        onClick={handleOpenDialog}
                      />

                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseDialog}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <Box sx={{ maxWidth: "100% !important" }}>
                          <img
                            src={ProductDetails?.main_image}
                            alt={ProductDetails?.name}
                            style={{ width: "100%" }}
                          />
                        </Box>
                        <Box>
                          {ProductDetails?.images?.map((image, index) => (
                            <Box
                              key={index}
                              sx={{
                                maxWidth: "80px!important",
                                display: "flex",
                              }}
                            >
                              <img
                                src={image.image}
                                alt={`Img ${index}`}
                                style={{ width: "100%" }}
                              />
                            </Box>
                          ))}
                        </Box>
                      </Dialog>
                    </Box>
                  )}
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}
                  >
                    <Avatar>
                      {ProductDetails?.is_favorite ? (
                        <FavoriteIcon
                          sx={{ color: "red" }}
                          onClick={DeleteProductFromFavorite}
                        />
                      ) : (
                        <FavoriteBorderIcon onClick={AddProductToFavorite} />
                      )}
                    </Avatar>
                    <Avatar sx={{ mr: 3 }} onClick={handleOpenShareDialog}>
                      <RWebShare
                        data={shareData}
                        sites={[
                          "whatsapp",
                          "facebook",
                          "telegram",
                          "twitter",
                          "copy",
                        ]}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <ShareIcon />
                      </RWebShare>
                    </Avatar>
                  </Box>
                  {ResponseGetProductDetails.isPending ? (
                    <Stack gap={2} direction="column">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem", width: "70%" }}
                      />
                      {Array.from({ length: 8 }, (_, index) => (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "100%" }}
                          key={index}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <>
                      <MainTitle sx={{ pt: 2 }}>
                        {ProductDetails?.name}
                      </MainTitle>
                      <ItemsDes
                        sx={{ pt: 3 }}
                        dangerouslySetInnerHTML={{
                          __html: ProductDetails?.description || "",
                        }}
                      />
                    </>
                  )}

                  {ResponseGetProductDetails.isPending ? (
                    <Stack
                      gap={4}
                      direction="row"
                      justifyContent={"space-between"}
                    >
                      {Array.from({ length: 3 }, (_, index) => (
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "100%" }}
                          key={index}
                        />
                      ))}
                    </Stack>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                      }}
                    >
                      <TextDiscount variant="body1">
                        {ProductDetails?.price} {t("SAR")}
                      </TextDiscount>
                      <Typography variant="body1" sx={{ fontFamily: "Cairo" }}>
                        {ProductDetails?.final_price} {t("SAR")}
                      </Typography>
                      <Typography variant="body1" sx={{ paddingRight: 2 }}>
                        {ProductDetails?.discount} %
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontFamily: "Cairo" }}>
                      {t("deliver by")}&nbsp;
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {t("10 Mar, Sunday")}
                    </Typography>
                  </Box>
                  <Box sx={{ paddingY: 3 }}>
                    <Button variant="outlined" sx={{ fontFamily: "cairo" }}>
                      <LocationOnIcon /> {t("Select Area")}
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 2,
                    }}
                  >
                    <BlackText>{t("Attributes")}:</BlackText>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Cairo",
                        cursor: "pointer",
                        textDecorationLine: "underline",
                      }}
                    >
                      {t("Attributes Guid")}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ pt: 3, display: "flex" }}>
                    <Box>
                      <Button
                        id="demo-customized-button"
                        aria-controls={
                          openDropDown ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openDropDown ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{ ml: 3 }}
                      >
                        EU
                      </Button>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={openDropDown}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose} disableRipple>
                          Uk
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          EU
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          US
                        </MenuItem>
                      </StyledMenu>
                    </Box>
                    <Box
                      sx={{
                        width: "50%",
                        overflowX: "scroll",
                        textWrap: "nowrap",
                      }}
                    >
                      {/* {typeof ProductDetails?.variants_details === "object" ? (
                        Object.keys(ProductDetails.variants_details).map(
                          (variant, index) => (
                            <React.Fragment key={index}>
                              <BlackText sx={{ ml: "0 !important" }}>
                                {variant}
                              </BlackText>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 1,
                                }}
                              >
                                {Array.isArray(
                                  ProductDetails.variants_details[variant]
                                ) ? (
                                  ProductDetails.variants_details[variant].map(
                                    (item, innerIndex) =>
                                      item.is_color == false ? (
                                        <Box
                                          key={innerIndex}
                                          component="button"
                                          value={item.variant_id}
                                          onClick={(e) => {
                                            console.log(e.target.value);
                                            SetSizeandColor((old) => ({
                                              ...old,
                                              variant_id: e.target.value,
                                            }));
                                          }}
                                          sx={{
                                            ...ButtonSize.__emotion_styles[0],
                                            cursor: "pointer",
                                            borderColor: SizeandColor?.variant_id===item?.variant_id? "#000" : "transparent",
                                           borderStyle:"solid",
                                           borderWidth:'1px',
                                            padding: "8px",
                                            width: "fit-content",
                                          }}
                                        >
                                          {item.is_color === false
                                            ? item.value
                                            : null}
                                        </Box>
                                      ) : (
                                        <Box
                                          key={innerIndex}
                                          component="button"
                                          value={item?.variant_id}
                                          onClick={(e) => {
                                            console.log(e.target.value);
                                            SetSizeandColor((old) => ({
                                              ...old,
                                              variant_id: e.target.value,
                                            }));
                                          }}
                                          sx={{
                                            ...ButtonSize.__emotion_styles[0],
                                            cursor: "pointer",
                                            border: SizeandColor.variant_id===item.variant_id ? "1px solid #000" : "transparent",
                                            padding: "8px",
                                            width: "24px",
                                            background: item.value,
                                          }}
                                        />
                                      )
                                  )
                                ) : (
                                  <></>
                                )}
                              </Box>
                            </React.Fragment>
                          )
                        )
                      ) : (
                        <></>
                      )} */}

                      <Button variant="outlined" disabled sx={{ ml: 3 }}>
                        9/10
                      </Button>
                      <Button variant="outlined" sx={{ ml: 3 }}>
                        9/10
                      </Button>
                      <Button variant="outlined" sx={{ ml: 3 }}>
                        9/10
                      </Button>
                      <Button variant="outlined" disabled sx={{ ml: 3 }}>
                        9/10
                      </Button>
                      <Button variant="outlined" disabled sx={{ ml: 3 }}>
                        9/10
                      </Button>
                      <Button variant="outlined" disabled sx={{ ml: 3 }}>
                        9/10
                      </Button>
                      <Button variant="outlined" disabled sx={{ ml: 3 }}>
                        9/10
                      </Button>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{ mt: 4, width: "100%", fontFamily: "cairo" }}
                    onClick={()=>{
                      if(token){
                        AddProductToCart()
                      }else{
                        setOpenLogin(true)
                      }
                     
                    }
                      
                      }
                  >
                    {t("Add to Cart")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box>
              <Accordion sx={{ paddingY: 4, marginY: 4 }} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {t("Product Details")}:
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} xs={12}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", mb: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              ml: 4,
                            }}
                          >
                            <Avatar
                              sx={{ mr: 3, borderRadius: "15px" }}
                              variant="rounded"
                            >
                              <ThumbUpAltIcon />
                            </Avatar>
                            <BlackText variant="body1" sx={{ pr: 3 }}>
                              {t("100% Genuine")}
                            </BlackText>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{ mr: 3, borderRadius: "15px" }}
                              variant="rounded"
                            >
                              <AutorenewIcon />
                            </Avatar>
                            <BlackText variant="body1" sx={{ pr: 3 }}>
                              {t("Free Returns")}
                            </BlackText>
                          </Box>
                        </Box>
                        <Box>
                          <BlackText variant="body1" sx={{ pr: 3 }}>
                            {t("Product Details")}:
                          </BlackText>
                          <ItemsDes
                            sx={{ pt: 3 }}
                            dangerouslySetInnerHTML={{
                              __html: ProductDetails?.description,
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sx={{ pr: 4 }}>
                      <BlackText variant="body1" sx={{ pr: 3 }}>
                        {t("Product Attributes")}
                      </BlackText>
                      <Specification />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ paddingY: 4 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  {t("Return policy")}:
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {t(
                      "Return any unsatisfactory items within 14 days from receiving your order."
                    )}
                  </Typography>
                  <BlackText>
                    {t("* Free delivery for orders above RS 200")}
                  </BlackText>
                  <Button
                    variant="outlined"
                    sx={{ mt: 4, fontFamily: "cairo" }}
                  >
                    {t("More Info")}
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Container>
          <Box sx={{ pt: 4 }}>
            {ResponseGetProductSort?.isPending ? (
              <Box sx={{ marginTop: 5 }}>
                <ProductSkeleton />
              </Box>
            ) : mostviewed?.results?.length ? (
              <RecommendedForYou title={"Most View"} sort_id={4} />
            ) : null}
          </Box>
        </Box>
      </ResponsiveLayout>
      <CartPopup
        openCartPopup={openCartPopup}
        handleCloseCartPopup={handleCloseCartPopup}
      />
      <AuthLogin openLogin={openLogin} handleCloseLogin={()=>setOpenLogin(false)}/>
      {ResponseAddProductToCart.successAlert}
      {ResponseAddProductToCart.failAlert}
    </Box>
  );
};

export default ProductDetails;
