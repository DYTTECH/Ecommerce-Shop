import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import {
  BlackText,
  DarkText,
  DarkTitle,
  ItemsDes,
  MainTitle,
  TextDiscount,
} from "../../Style/StyledComponents/Typography";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "../../Data/API";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../Hooks/useRequest";
import { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ProductCart from "../../Components/Cart/ProductCart";
import { DarkButton } from "../../Style/StyledComponents/Buttons";

const CartPopup = ({ openCartPopup, handleCloseCartPopup }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const CartDetails = useSelector((state) => state.cart.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [RequestGetProductsCart, ResponseGetProductsCart] = useRequest({
    method: "Get",
    path: `${PRODUCTS}${shopInfo?.id}/cart/details/`,
    token:token?`Token ${token}`:null
  });
  const GetProductsCart = () => {
    RequestGetProductsCart({
      onSuccess: (res) => {
        dispatch({ type: "cart/set", payload: res.data });
      },
    });
  };

  useEffect(() => {
    GetProductsCart();
  }, [shopInfo?.id]);
 
  return (
    <Dialog
      open={openCartPopup}
      onClose={handleCloseCartPopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BlackText
          sx={{
            padding: "30px 30px 0 0",
          }}
          id="alert-dialog-title"
        >
          {t("MY BASKET")}
        </BlackText>
        <Box sx={{ p: 4, cursor: "pointer" }} onClick={handleCloseCartPopup}>
          <CloseIcon />
        </Box>
      </Box>
      <DialogContent>
        {CartDetails.products&&
        
        CartDetails.products.map((item) => (
          <ProductCart key={item.id} {...item} isPending={ResponseGetProductsCart.isPending} />
        ))}
        {/* <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={4}>
            {ResponseGetProductsCart.isPending ? (
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid md={8}>
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
            </Grid>
            <Grid
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                  onClick={handleClickDropDown}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  1
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={handleCloseDropDown}
                >
                  <MenuItem onClick={handleCloseDropDown} disableRipple>
                    1
                  </MenuItem>
                  <MenuItem onClick={handleCloseDropDown} disableRipple>
                    2
                  </MenuItem>
                  <MenuItem onClick={handleCloseDropDown} disableRipple>
                    3
                  </MenuItem>
                </StyledMenu>
              </Box>
              <Box sx={{ pt: 3 }}>
                <DeleteOutlineIcon />
              </Box>
            </Grid>
          </Grid>
        </Grid> */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 4 }}>
            <DarkText>{t("Subtotal")}</DarkText>
            <MainTitle sx={{ fontWeight: theme.font.fontWeight.semibold }}>
              {CartDetails?.sub_total} {CartDetails?.currency}
            </MainTitle>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <DarkText>{t("Shipping fee")}</DarkText>
            <DarkText>20.00 {t("SAR")}</DarkText>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <DarkButton
              sx={{
                width: "60%",
                paddingY: 3,
              }}
              onClick={() => navigate(`/t2/${shopInfo.sub_domain}/checkout`)} 
            >
              {t("Check Out")}
            </DarkButton>
            <Button
              sx={{ border: "1px solid", width: "35%" }}
              onClick={() => {
                navigate(`/t2/${shopInfo?.sub_domain}/cart`);
              }}
            >
              {t("View Bag")}
            </Button>
          </Box>
          <Box
            sx={{ bgcolor: "#f6f6f6", padding: 3, borderRadius: "3px", mt: 3, display:'flex', alignItems:'center' }}
          >
            <LocalShippingIcon />
            <DarkText sx={{pr:2}}>
              {t("Add")}{" "}
              <span style={{ fontWeight: theme.font.fontWeight.semibold }}>
                {" "}
                {t("SAR")} 1.000
              </span>{" "}
              {t("more to your cart for")}{" "}
              <span style={{ color: theme.palette.primary.main }}>
                {t("Free Delivery")}
              </span>
            </DarkText>
          </Box>
         
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CartPopup;

// const [cart, setCart] = useState(() => {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : [];
// });

// // Function to add item to cart
// const addToCart = (productId) => {
//   // Add product id to the cart
//   setCart([...cart, productId]);
// };

// // Save cart to local storage whenever it changes
// useEffect(() => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }, [cart]);

// add to cart
// const [RequestAddProductToCart, ResponseAddProductToCart] =
//   useRequest({
//     method: "POST",
//     path: `${PRODUCTS}${shopInfo?.id}/cart/items/`,
//   });
// const AddProductToCart = () => {
//   RequestAddProductToCart({
//     body: {
//       product: params?.id,
//       quantity: 1
//     },
//     onSuccess: (res) => {
//       dispatch({ type: "cart/addItem", payload: res.data });
//     },
//   });
// };

// onClick={() => addToCart({productId:ProductDetails?.id, quantity:1})}
// onClick={AddProductToCart}
