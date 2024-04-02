import React, { useEffect } from "react";
import ResponsiveLayout from "../../Components/Layout/Layout";
import PageMeta from "../../Components/Layout/MetaPage";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  DarkText,
  GrayText,
  ItemsDes,
  ItemsTitle,
  MainTitle,
  TextDiscount,
} from "../../Style/StyledComponents/Typography";
import HeroTitle from "../../Components/Layout/HeroTitle";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "../../Data/API";
import useRequest from "../../Hooks/useRequest";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const ProductDetails = useSelector((state) => state.productdetails.value);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
    { label: `${t("My Cart")}`, active: false },
  ];
  const [RequestGetProductDetails, ResponseGetProductDetails] = useRequest({
    method: "Get",
    path: `${PRODUCTS}/${shopInfo?.id}/products/${cartItems[0]?.id}`,
  });
  const GetProductDetails = () => {
    RequestGetProductDetails({
      onSuccess: (res) => {
        dispatch({ type: "productdetails/set", payload: res.data });
      },
    });
  };

  useEffect(() => {
    GetProductDetails();
  }, [shopInfo?.id]);
  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("My Cart")}`}
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
        <Container
          maxWidth="xl"
          sx={{ marginTop: { lg: "69px", md: "0", sm: "0", xs: "0" } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{ display: "flex", mt: 3 }}>
                <DarkText sx={{ fontWeight: theme.font.fontWeight.semibold }}>
                  {t("My Cart")}
                </DarkText>
                <DarkText>(2 Items)</DarkText>
              </Box>
              <Grid container spacing={3} sx={{ alignItems: "center" }}>
                <Grid item xs={12} sm={6} md={4}>
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
                        src={ProductDetails?.main_image}
                        alt={ProductDetails?.name}
                        style={{ width: "100%" }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={8}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <MainTitle sx={{ pt: 2 }}>{ProductDetails?.name}</MainTitle>
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
                  </Box>
                  <Box sx={{ p: 4, cursor: "pointer" }} >
          <CloseIcon />
        </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {/* copoun */}
              <Box
                sx={{
                  bgcolor: "#f4fffc",
                  padding: 3,
                  borderRadius: "3px",
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalOfferIcon />
                  <ItemsTitle sx={{ pr: 2 }}>
                    {t("Enter coupon or promo code")}
                  </ItemsTitle>
                </Box>
                <Box>
                  <ItemsDes>{t("Select")}</ItemsDes>
                </Box>
              </Box>
              {/* order details */}
              <Box
                sx={{
                  bgcolor: theme.palette.primary.secondLight,
                  padding: 3,
                  mt: 3,
                }}
              >
                <DarkText>{t("Order Details")}</DarkText>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 4,
                  }}
                >
                  <DarkText>{t("Subtotal")}</DarkText>
                  <MainTitle
                    sx={{ fontWeight: theme.font.fontWeight.semibold }}
                  >
                    {ProductDetails?.final_price} {t("SAR")}
                  </MainTitle>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <DarkText>{t("Shipping fee")}</DarkText>
                  <DarkText>20.00 {t("SAR")}</DarkText>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 4,
                  }}
                >
                  <DarkText>{t("Total Amount")}</DarkText>
                  <MainTitle
                    sx={{ fontWeight: theme.font.fontWeight.semibold }}
                  >
                    {ProductDetails?.final_price} {t("SAR")}
                  </MainTitle>
                </Box>
              </Box>
              <Button
              sx={{
                color: theme.palette.primary.light,
                bgcolor: theme.palette.primary.dark,
                width: "100%",
                paddingY: 2,
                mt:3
              }}
            >
              {t("Check Out")}
            </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default Cart;
