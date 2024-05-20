import { Box, CircularProgress, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { MainTitle, TextDiscount } from '../../Style/StyledComponents/Typography'
import { useTranslation } from 'react-i18next'
import CloseIcon from "@mui/icons-material/Close";
import useRequest from '../../Hooks/useRequest';
import { useDispatch } from 'react-redux';
import { PRODUCTS } from '../../Data/API';
const ProductCart = ({product_id,
    quantity,
    product_name,
    price,
    cart_quantity,
    is_free_product,
    product_image,
    is_percentage_discount,
    discount,
    favourite,
    in_offer,
    brand_name,
    purchase,
    currency,
    cart_item_id,isPending}) => {
      const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
      const token=JSON.parse(localStorage.getItem("userinfo"))
        const {t} = useTranslation()
        const dispatch=useDispatch()
        const theme=useTheme()
        const [RequestDeleteProductCart, ResponseDeleteProductCart] = useRequest({
          method: "DELETE",
          path: `${PRODUCTS}${shopInfo?.id}/cart/details/${cart_item_id}/`,
          token:token?`Token ${token}`:null
        });
      
        const handleRemoveFromCart = async (product) => {
          RequestDeleteProductCart({

            onSuccess: (res) => {
              dispatch({ type: "cart/deleteItem", payload: { id: cart_item_id } });
            },
          });
        }
  return (
    <Grid container spacing={3} sx={{ alignItems: "center" }}>
    <Grid item xs={12} sm={6} md={4}>
      {isPending ? (
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
            src={product_image}
            alt={product_name}
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
        <MainTitle sx={{ pt: 2 }}>{product_name}</MainTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
          }}
        >
          <TextDiscount variant="body1">
            {price} {currency}
          </TextDiscount>
          <Typography variant="body1" sx={{ fontFamily: "Cairo" }}>
            {brand_name}
          </Typography>
          <Typography variant="body1" sx={{ paddingRight: 2 }}>
            {discount} %
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
<CloseIcon  onClick={handleRemoveFromCart}/>
</Box>
    </Grid>
    {ResponseDeleteProductCart.successAlert}
    {ResponseDeleteProductCart.failAlert}
  </Grid>
  )
}

export default ProductCart