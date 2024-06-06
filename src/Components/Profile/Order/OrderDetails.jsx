import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BASEURL, { PRODUCTS } from "../../../Data/API";
import useRequest from "../../../Hooks/useRequest";
import HeroTitle from "../../Layout/HeroTitle";
import {
  DarkText,
  FooterGrayText,
  GrayText,
  ItemsDes,
  ItemsTitle,
  MainText,
  MainTitle,
  TextDiscount,
} from "../../../Style/StyledComponents/Typography";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PageMeta from "../../Layout/MetaPage";
import ResponsiveLayout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LightBox } from "../../../Style/StyledComponents/Box";
import ProductCart from "../../Cart/ProductCart";
import {
  BlackButton,
  TransparentButton,
} from "../../../Style/StyledComponents/Buttons";
import OrderStepper from "./OrderStepper";
import OrderSteps from "./OrderSteps";
import CartDetails from "../../../Pages/Cart/CartDetails";
import OrderProgress from "./OrderProgress";

const OrderDetails = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const orders = useSelector((state) => state.orders?.value);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const cartDetails = useSelector((state) => state.cart.value);

  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
    { label: `${t("MY ORDER")}`, active: false },
    { label: `${orders.status_name}`, active: false },
    { label: `#${id}`, active: false },
  ];
 
  const [RequestGetOrderDetails, ResponseGetOrderDetails] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/${shopInfo?.id}/orders/${id}`,
    token: token ? `Token ${token}` : null,
  });
  const [RequestCancelOrder, ResponseCancelOrder] = useRequest({
    method: "PATCH",
    path: `${BASEURL}shop/${shopInfo?.id}/orders/${id}/cancel_order/`,
    token: token ? `Token ${token}` : null,
  });
  const [RequestGetCartDetails, ResponseGetCartDetails] = useRequest({
    method: "Get",
    path: `${PRODUCTS}${shopInfo?.id}/cart/details/`,
    token: token ? `Token ${token}` : null,
  });
 const getOrderDetails = () => {
    RequestGetOrderDetails({
      onSuccess: (res) => {
        dispatch({ type: "orders/setObject", payload: res.data });
      },
    });
  };
  const CancelOrder = () => {
    RequestCancelOrder({
      onSuccess: (res) => {
        dispatch({ type: "orders/reset", payload: res.data });
      },
    });
  };
  const GetCartDetails = () => {
    RequestGetCartDetails({
      onSuccess: (res) => {
        dispatch({ type: "cart/set", payload: res.data });
      },
    });
  };

  useEffect(() => {
    getOrderDetails();
    GetCartDetails();
  }, []);

  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("MY ORDERS")}`}
        desc="Description of my page for SEO"
        name={shopInfo?.full_name}
        type={shopInfo?.shop_type_name}
        image={shopInfo?.logo}
      />
      <Box sx={{ marginY: { lg: "90px", md: 2, sm: 2, xs: 2 } }}>
        <Box sx={{ pr: 5, mb: 2 }}>
          <GrayText>
            <HeroTitle crumbs={crumbs} />
          </GrayText>
        </Box>
        <Divider />
        <Container
          maxWidth="xl"
          sx={{ marginTop: { lg: "69px", md: "0", sm: "0", xs: "0" } }}
        >
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <LightBox>
                <ItemsTitle sx={{ pb: 4 }}>{userDetails?.full_name}</ItemsTitle>
                <ItemsDes sx={{ pb: 4 }}>{userDetails?.phone}</ItemsDes>
                {orders?.status_name === "تم الإلغاء" ? null : (
                  <BlackButton
                    onClick={handleClickOpen}
                    type="button"
                    variant="contained"
                  >
                    {t("Cancel Order")}
                  </BlackButton>
                )}
              </LightBox>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogContent>
                  {/* <Box>
                    {orders?.products?.map((product, index) => (
                      <LightBox key={index} sx={{ display: "flex" }}>
                        <img
                          src={product?.main_image}
                          alt={product.name}
                          style={{ width: "25%" }}
                        />
                        <Box sx={{ paddingRight: "30px" }}>
                          <MainTitle sx={{ pt: 2 }}>{product.name}</MainTitle>

                          <Typography>
                            {product.quantity} {t("1 piece")}
                          </Typography>
                          <Typography>{product.price} RSA</Typography>
                        </Box>
                      </LightBox>
                    ))}
                  </Box> */}
                  <CartDetails />
                  <MainTitle sx={{ pt: 4 }}>
                    {t("Are You sure you want to cancel this order?")}
                  </MainTitle>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-between" }}>
                  <TransparentButton
                    sx={{ textAlign: "center" }}
                    autoFocus
                    onClick={handleClose}
                  >
                    Disagree
                  </TransparentButton>
                  <BlackButton
                    onClick={CancelOrder} // Add onClick handler
                    type="button"
                    variant="contained"
                  >
                    {t("Confirm")}
                  </BlackButton>
                </DialogActions>
              </Dialog>
              <OrderProgress key={orders?.id} order={orders} />
            </Grid>
            <Grid item md={4} xs={12}>
            {orders?.products &&
              orders?.products?.map((item) => (
                <ProductCart
                  key={item.cart_item_id}
                  {...item}
                  isPending={ResponseGetOrderDetails.isPending}
                />
              ))}
            <CartDetails orderDetails={orders} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default OrderDetails;
