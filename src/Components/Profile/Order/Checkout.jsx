import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import PageMeta from "../../Layout/MetaPage";
import ViewAddress from "../Address/ViewAddress";
import AddAddress from "../Address/AddAddress";
import { BoxStyle } from "../../../Style/StyledComponents/Box";
import {
  BlackText,
  DarkText,
  ItemsDes,
  ItemsTitle,
  LightText,
  MainTitle,
} from "../../../Style/StyledComponents/Typography";
import LockIcon from "@mui/icons-material/Lock";
import ReplayIcon from "@mui/icons-material/Replay";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import PaymentIcon from "@mui/icons-material/Payment";
import EditIcon from "@mui/icons-material/Edit";
import {
  ActivePaymentButton,
  PaymentButton,
} from "../../../Style/StyledComponents/Buttons";
import PaymentsIcon from "@mui/icons-material/Payments";
import Cart from "../../../Pages/Cart/Cart";
import ProductCart from "../../Cart/ProductCart";
import CartDetails from "../../../Pages/Cart/CartDetails";
import useRequest from "../../../Hooks/useRequest";
import { PRODUCTS } from "../../../Data/API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const lang = localStorage.getItem("language");
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Delivery Options, Step 2: Payment Options
  const [isEditingDelivery, setIsEditingDelivery] = useState(false); // New state to manage edit mode
  const cartDetails = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
  };

  const handleClickOpenAddAddress = () => {
    setOpenAddAddress(true);
  };

  const handleProceedToPayment = () => {
    setStep(2);
    setIsEditingDelivery(false); // Exit edit mode when proceeding to payment
  };

  const handleEditDeliveryOptions = () => {
    setIsEditingDelivery(true); // Enter edit mode when edit button is clicked
  };

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
  // useEffect(() => {
  //   document.dir = lang === "ar" ? "rtl" : "ltr";
  // }, [lang]);

  return (
    <Box sx={{ mb: 4 }}>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("MY ADDRESS BOOK")}`}
        desc="Description of my page for SEO"
        name={shopInfo?.full_name}
        type={shopInfo?.shop_type_name}
        image={shopInfo?.logo}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "30px 25px 20px 25px",
        }}
      >
        <Button
          type="button"
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            fontFamily: "Cairo",
          }}
          onClick={() => navigate(`/t2/${shopInfo.sub_domain}`)}
        >
          <ReplayIcon />
          <LightText
            sx={{ display: { lg: "flex", md: "flex", sm: "none", xs: "none" } }}
          >
            {t("Back to Shopping")}
          </LightText>
        </Button>
        <BoxStyle
          sx={{
            display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
            justifyContent: "start",
            width: "15rem",
          }}
        >
          <Avatar
            src={shopInfo?.logo}
            sx={{ width: 56, height: 56 }}
            variant="rounded"
            alt="shop-title"
          ></Avatar>
          <BlackText sx={{ pr: 4, fontSize: "24px" }}>
            {shopInfo?.shop_name}
          </BlackText>
        </BoxStyle>

        <BoxStyle>
          <LockIcon />
          <BlackText sx={{ fontSize: "18px" }}>
            {t("Secure checkout")}
          </BlackText>
        </BoxStyle>
      </Box>
      <Divider />

      {/* responsive box */}
      <BoxStyle
        sx={{
          p: 4,
          display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
          justifyContent: "center",
        }}
      >
        <Box>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor:
                isEditingDelivery || step === 1
                  ? theme.palette.primary.main
                  : theme.palette.secondary.third, // Change to the appropriate color for delivery
            }}
          >
            <WhereToVoteIcon />
          </Avatar>
          <BlackText>{t("Deliver")}</BlackText>
        </Box>
        <Divider sx={{ width: "50%", marginX: 3 }} />
        <Box>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor:
                !isEditingDelivery && step === 2
                  ? theme.palette.primary.main
                  : theme.palette.secondary.third, // Change to the appropriate color for payment
            }}
          >
            <PaymentIcon />
          </Avatar>
          <BlackText>{t("Payment")}</BlackText>
        </Box>
      </BoxStyle>

      <Container maxWidth="xl" sx={{ mt: "20px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100%",
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <Grid lg={7} md={7} xs={12} sm={12} justifyContent="space-between">
            {step === 1 || isEditingDelivery ? (
              <>
                {/* addresses box */}
                <Box>
                  <MainTitle sx={{ mb: 4 }}>{t("Delivering to")}</MainTitle>
                  <ViewAddress />
                  <Button
                    onClick={handleClickOpenAddAddress}
                    type="button"
                    variant="contained"
                    sx={{
                      bgcolor: theme.palette.primary.dark,
                      color: theme.palette.primary.light,
                      fontFamily: "Cairo",
                      width: "10rem",
                      mt: 4,
                      mr: 3,
                    }}
                  >
                    {t("Add New Address")}
                  </Button>
                  <AddAddress
                    openAddAddress={openAddAddress}
                    handleCloseAddAddress={handleCloseAddAddress}
                  />
                </Box>
                {/* payment options step 2 */}
                <BoxStyle
                  sx={{
                    marginY: 4,
                    width: "100%",
                    border: "1px solid #A1A1A1",
                    paddingY: 3,
                    paddingX: 2,
                    borderRadius: "5px",
                  }}
                >
                  <ItemsDes sx={{ fontSize: "18px" }}>
                    {t("Payment Options")}
                  </ItemsDes>
                </BoxStyle>
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.primary.light,
                  }}
                  onClick={handleProceedToPayment}
                >
                  {t("PROCEED TO SECURE PAYMENT")}
                </Button>
              </>
            ) : (
              <>
                {/* delivery options step 1 */}
                <BoxStyle
                  sx={{
                    marginY: 4,
                    width: "100%",
                    border: "1px solid #A1A1A1",
                    padding: 2,
                    borderRadius: "5px",
                    justifyContent: "space-between",
                  }}
                >
                  <ItemsDes sx={{ fontSize: "18px" }}>
                    {t("Delivery Options")}
                  </ItemsDes>
                  <IconButton onClick={handleEditDeliveryOptions}>
                    <EditIcon />
                  </IconButton>
                </BoxStyle>
              </>
            )}

            {step === 2 && !isEditingDelivery && (
              <Box>
                <MainTitle sx={{ mb: 4 }}>{t("Payment type")}</MainTitle>
                <BoxStyle>
                  {/* toggle button payments */}
                  <PaymentButton>
                    <PaymentIcon />
                  </PaymentButton>
                  <PaymentButton>
                    <PaymentIcon />
                  </PaymentButton>
                  <PaymentButton>
                    <PaymentIcon />
                  </PaymentButton>
                  <ActivePaymentButton>
                    <PaymentsIcon />
                  </ActivePaymentButton>
                </BoxStyle>
                {/* changeable box */}
                <Box sx={{ marginY: 4 }}>
                  <MainTitle sx={{ mb: 4 }}>{t("Cash on Delivery")}</MainTitle>
                  <ItemsDes sx={{ fontSize: "18px" }}>
                    {t(
                      "Take note! Cash payment orders will be charged an additional service fee per order."
                    )}
                  </ItemsDes>
                </Box>
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.primary.light,
                  }}
                >
                  {t("PROCEED TO SECURE PAYMENT")}
                </Button>
              </Box>
            )}
          </Grid>
          <Grid
            lg={5}
            md={5}
            sx={{
              paddingRight: "50px !important",
              display: { lg: "block", md: "block", sm: "none", xs: "none" },
            }}
          >
            {cartDetails?.products &&
              cartDetails?.products?.map((item) => (
                <ProductCart
                  key={item.cart_item_id}
                  {...item}
                  isPending={ResponseGetCartDetails.isPending}
                />
              ))}
            <CartDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
