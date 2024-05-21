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
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";
import ProductCart from "../../Components/Cart/ProductCart";
import { DarkButton } from "../../Style/StyledComponents/Buttons";

const CartDetails = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token=JSON.parse(localStorage.getItem("userinfo"))
  const cartDetails = useSelector((state) => state.cart.value);
  const [coupon,setCoupon]=useState("")
  const [openCoupon,setOpenCoupon]=useState(false)
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [RequestGetCartDetails, ResponseGetCartDetails] = useRequest({
    method: "Get",
    path: `${PRODUCTS}${shopInfo?.id}/cart/details/`,
    token:token?`Token ${token}`:null,
  });

 
  const GetCartDetails = () => {
    RequestGetCartDetails({
      onSuccess: (res) => {
        dispatch({ type: "cart/set", payload: res.data });
      },
    });
  };

  // add coupon to cart
  const [RequestPostCoupon, ResponsePostCoupon] = useRequest({
    method: "POST",
    path: `${PRODUCTS}${shopInfo?.id}/cart/apply_coupon/`,
    token: token ? `Token ${token}` : null,
  });
  const handleAddCoupon = () => {
    RequestPostCoupon({
      body: {
        coupon_code: coupon,
      },
      onSuccess: (res) => {
        setCoupon("");
        GetCartDetails();
      },
    });
  };
  useEffect(() => {
    GetCartDetails();
  }, [shopInfo?.id]);
  return (
    
        <Box>
              {/* copoun */}
              <Stack
                direction="column"
                sx={{
                  bgcolor: "#f4fffc",
                  padding: 3,
                  borderRadius: "3px",
                  mt: 3,
                }}
              >
                <Box
                  sx={{
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
                    <ItemsDes
                      onClick={() => setOpenCoupon((prev) => !prev)}
                      sx={{ cursor: "pointer" }}
                    >
                      {t("Select")}
                    </ItemsDes>
                  </Box>
                </Box>
                {openCoupon && (
                  <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    sx={{ mt: 3 }}
                  >
                    <DarkButton
                      variant="contained"
                      sx={{ width: "100px", fontFamily: "Cairo" }}
                      onClick={handleAddCoupon}
                    >
                      {t("Apply")}
                    </DarkButton>
                    <TextField
                      name="coupon"
                      placeholder={t("Enter coupon or promo code")}
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      sx={{ fontFamily: "Cairo" }}
                    />
                    
                  </Stack>
                )}
              </Stack>
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
                    {cartDetails?.sub_total} {t("SAR")}
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
                  <MainTitle
                    sx={{ fontWeight: theme.font.fontWeight.semibold }}
                  >
                    {cartDetails?.shipping_cost} {t("SAR")}
                  </MainTitle>
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
                    {cartDetails?.total} {t("SAR")}
                  </MainTitle>
                </Box>
              </Box>
              
        </Box>
  );
};

export default CartDetails;
