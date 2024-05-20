import React, { useEffect, useState } from "react";
import ResponsiveLayout from "../../Components/Layout/Layout";
import PageMeta from "../../Components/Layout/MetaPage";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
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
import ProductCart from "../../Components/Cart/ProductCart";
import CartDetails from "./CartDetails";
import { DarkButton } from "../../Style/StyledComponents/Buttons";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const cartDetails = useSelector((state) => state.cart.value);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
    { label: `${t("My Cart")}`, active: false },
  ];
  const [RequestGetCartDetails, ResponseGetCartDetails] = useRequest({
    method: "Get",
    path: `${PRODUCTS}${shopInfo?.id}/cart/details/`,
    token: token ? `Token ${token}` : null,
  });

  const GetCartDetails = () => {
    RequestGetCartDetails({
      onSuccess: (res) => {
        dispatch({ type: "cart/set", payload: res.data });
      },
    });
  };

  useEffect(() => {
    GetCartDetails();
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
          sx={{ marginTop: { lg: "69px", md: "0", sm: "0", xs: "0" }, mb:5 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{ display: "flex", mt: 3 }}>
                <DarkText sx={{ fontWeight: theme.font.fontWeight.semibold }}>
                  {t("My Cart")}
                </DarkText>
                <DarkText>
                  {cartDetails?.products.length
                    ? `(${cartDetails?.products?.length})Items`
                    : "0 Items"}
                </DarkText>
              </Box>
              {cartDetails?.products &&
                cartDetails?.products?.map((item) => (
                  <ProductCart
                    key={item.cart_item_id}
                    {...item}
                    isPending={ResponseGetCartDetails.isPending}
                  />
                ))}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CartDetails />
              <DarkButton
                sx={{
                  width: "100%",
                  paddingY: 2,
                  mt: 3,
                }}
                onClick={() => navigate(`/t2/${shopInfo.sub_domain}/checkout`)} // Wrap navigate inside an arrow function
              >
                {t("Check Out")}
              </DarkButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default Cart;
