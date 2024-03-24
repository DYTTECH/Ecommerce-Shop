import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
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
  ItemsTitle,
  MainTitle,
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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SubCategorySkeleton from "../Skeleton/SubCategorySkeleton";
import RecommendedForYou from "../home/recommendedForYou";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const StyledMenu = styled((props: MenuProps) => (
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
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetails = () => {
  // const product = useSelector((state) => state.products.value);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const productId = localStorage.getItem("productId");
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const { t } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const homecomponents = useSelector((state) => state.homecomponents.value);
  const [open, setOpen] = React.useState(false);
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
  // Get shop home component
  const [RequestGetHomeComponent, ResponseGetHomeComponent] = useRequest({
    method: "Get",
    path: HOMECOMPONENTS + shopInfo?.id + "/home-components/",
  });
  const GetHomeComponent = () => {
    RequestGetHomeComponent({
      onSuccess: (res) => {
        dispatch({ type: "homecomponents/set", payload: res.data });
      },
      onError: (err) => {
        dispatch({ type: "shopInfo/clearShop", payload: err.message });
      },
    });
  };
  const [RequestGetProduct, ResponseGetProduct] = useRequest({
    method: "Get",
    path: `${PRODUCTS}/${shopInfo?.id}/products/${productId}/`,
  });

  const GetProduct = () => {
    RequestGetProduct({
      params: { id: productId },
      onSuccess: (res) => {
        dispatch({ type: "products/set", payload: res.data });
        setProduct(res.data);
      },
    });
  };

  useEffect(() => {
    GetProduct();
    setTimeout(() => {
      if (shopInfo?.id) {
        GetHomeComponent();
      }
    }, 5000);
  }, [shopInfo?.id]);

  console.log(productId);
  console.log(product);
  console.log(homecomponents);

  const parseHTMLToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <Box>
      <ResponsiveLayout>
        <PageMeta
          title={product?.name}
          desc="Description of my page for SEO"
          name={shopInfo?.full_name}
          type={shopInfo?.shop_type_name}
          image={shopInfo?.logo}
        />
        <CategoryMenu />
        <Box sx={{ marginY: { lg: "90px", md: 2, sm: 2, xs: 2 } }}>
          <Box
            sx={{
              pr: 5,
              mb: 2,
              display: { lg: "block", md: "none", sm: "none", xs: "none" },
            }}
          >
            <GrayText>
              {shopInfo?.shop_name}&nbsp;/&nbsp;{product?.categories[0].name}
              &nbsp;/&nbsp;{product?.name}
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
                    alignItems:'center',
                    flexDirection:'column'
                  }}
                >
                  {product?.images.map((image, index) => (
                    <Grid
                      item
                      xs={2}
                      key={index}
                      sx={{maxWidth:'50% !important',objectFit:'cover'}}
                    >
                      <img
                        src={image.image}
                        alt={`Image ${index}`}
                        style={{width:'100%' }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item lg={5} md={6} xs={12}>
                  <Box>
                    <img
                      src={product?.main_image}
                      alt={product?.name}
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
                          src={product?.main_image}
                          alt={product?.name}
                          style={{ width: "100%" }}
                        />
                      </Box>
                      <Box>
                        {product?.images.map((image, index) => (
                          <Box
                            key={index}
                            
                            sx={{ maxWidth: "80px!important", display: "flex" }}
                          >
                            <img
                              src={image.image}
                              alt={`Image ${index}`}
                              style={{ width: "100%" }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </Dialog>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}
                  >
                    <Avatar>
                      <FavoriteBorderIcon />
                    </Avatar>
                    <Avatar sx={{ mr: 3 }}>
                      <ShareIcon />
                    </Avatar>
                  </Box>
                  <MainTitle sx={{ pt: 2 }}>{product?.name}</MainTitle>
                  <ItemsTitle sx={{ pt: 3 }}>
                    {parseHTMLToText(product?.description)}
                  </ItemsTitle>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "red",
                        textDecorationLine: "line-through",
                        fontFamily: "Cairo",
                      }}
                    >
                      {product?.price} {t("SAR")}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: "Cairo" }}>
                      {product?.final_price} {t("SAR")}
                    </Typography>
                    <Typography variant="body1" sx={{ paddingRight: 2 }}>
                      {product?.discount} %
                    </Typography>
                  </Box>
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
                            <BlackText
                              variant="body1"
                              sx={{ pr: 3 }}
                            >
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
                            <BlackText
                              variant="body1"
                              sx={{ pr: 3 }}
                            >
                              {t("Free Returns")}
                            </BlackText>
                          </Box>
                        </Box>
                        <Box>
                          <BlackText
                            variant="body1"
                            sx={{ pr: 3 }}
                          >
                            {t("Product Details")}:
                          </BlackText>
                          <ItemsTitle sx={{ pt: 3 }}>
                            {parseHTMLToText(product?.description)}
                          </ItemsTitle>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sx={{ pr: 4 }}>
                      <BlackText
                        variant="body1"
                        sx={{ pr: 3 }}
                      >
                        {t("Product Attributes")}
                      </BlackText>
                      <List
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                      >
                        {[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        ].map((value) => (
                          <ListItem
                            key={value}
                            disableGutters
                            sx={{ paddingTop: "0", paddingBottom: "0" }}
                            secondaryAction={
                              <IconButton aria-label="comment">
                                <FiberManualRecordIcon sx={{ p: 1 }} />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={t("Attribute ") + `${value}`}
                              sx={{ textAlign: "right", fontFamily:'Cairo' }}
                            />
                          </ListItem>
                        ))}
                      </List>
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
                    {t("Return any unsatisfactory items within 14 days from receiving your order.")}
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
          <Box sx={{pt:4}}>
              {ResponseGetHomeComponent?.isPending ? (
                <Box sx={{ marginTop: 5 }}>
                  <SubCategorySkeleton />
                </Box>
              ) : homecomponents.length ? (
                homecomponents?.map((component) =>
                  component?.name == "New Arrived" ? (
                    <RecommendedForYou
                      key={component?.sort_number}
                      title={component?.title == "most view"}
                      sort_id={component?.query_id}
                    />
                  ) : null
                )
              ) : (
                <Box sx={{ marginTop: 5 }}>
                  <SubCategorySkeleton />
                </Box>
              )}
            </Box>
        </Box>
      </ResponsiveLayout>
    </Box>
  );
};

export default ProductDetails;
