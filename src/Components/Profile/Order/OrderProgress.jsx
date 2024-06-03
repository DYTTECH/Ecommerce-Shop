import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BASEURL from "../../../Data/API";
import useRequest from "../../../Hooks/useRequest";
import {
  DarkText,
  FooterGrayText,
  ItemsDes,
  MainText,
  MainTitle,
} from "../../../Style/StyledComponents/Typography";
import {
  Box,
  Grid,
} from "@mui/material";
import { LightBox } from "../../../Style/StyledComponents/Box";
import OrderStepper from "./OrderStepper";
import OrderSteps from "./OrderSteps";
import { useParams } from "react-router-dom";

const OrderProgress = ({ order }) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const orders = useSelector((state) => state.orders?.value);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userAddresses = useSelector((state) => state.address?.value);
  const [showDerials, setShowDerials] = useState(false);
const {id} = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [RequestGetOrderDetails, ResponseGetOrderDetails] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/${shopInfo?.id}/orders/${order?.id || id}`,
    token: token ? `Token ${token}` : null,
  });

  const [RequestGetAddresses, ResponseGetAddresses] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
    token: token ? `Token ${token}` : null,
  });

  const getOrderDetails = () => {
    RequestGetOrderDetails({
      onSuccess: (res) => {
        dispatch({ type: "orders/setObject", payload: res.data });
      },
    });
  };

  const getUserAddresses = () => {
    RequestGetAddresses({
      onSuccess: (res) => {
        dispatch({ type: "address/set", payload: res.data });
      },
    });
  };

  const shippingAddress = Array.isArray(userAddresses)
    ? userAddresses.find((address) => address.id === orders?.shipping_address)
    : null;

  useEffect(() => {
    getOrderDetails();
    getUserAddresses();
  }, []);

  return (
    <LightBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MainTitle>
          {t("Order")} #{order?.id || id} 
        </MainTitle>
        <DarkText>{order?.status_name}</DarkText>
      </Box>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={3}>
          <Box>
            <ItemsDes>{t("Price")}</ItemsDes>
            <FooterGrayText>{order?.total}</FooterGrayText>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box>
            <ItemsDes>{t("Delivery Date")}</ItemsDes>
            <FooterGrayText>{order?.created_at}</FooterGrayText>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ mb: 4 }}>
          <Box>
            <ItemsDes>{t("Location")}</ItemsDes>
            <Box sx={{ display: "flex" }}>
              <FooterGrayText>
                {shippingAddress?.country}&nbsp;,&nbsp;
              </FooterGrayText>
              <FooterGrayText>
                {shippingAddress?.governorate}&nbsp;,&nbsp;
              </FooterGrayText>
              <FooterGrayText>{shippingAddress?.city}</FooterGrayText>
            </Box>
          </Box>
        </Grid>
        <OrderStepper step={order?.status} />
        <Box sx={{ mt: "32px" }}>
          {showDerials && <OrderSteps />}
          <MainText
            sx={{ cursor: "pointer" }}
            onClick={() => setShowDerials(!showDerials)}
          >
            {t("Show Details")}
          </MainText>
        </Box>
      </Grid>
    </LightBox>
  );
};

export default OrderProgress;
