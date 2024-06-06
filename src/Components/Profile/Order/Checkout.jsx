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
} from "@mui/material";
import PageMeta from "../../Layout/MetaPage";
import ViewAddress from "../Address/ViewAddress";
import AddAddress from "../Address/AddAddress";
import { BoxStyle } from "../../../Style/StyledComponents/Box";
import {
  BlackText,
  ItemsDes,
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
  DarkButton,
  PaymentButton,
} from "../../../Style/StyledComponents/Buttons";
import PaymentsIcon from "@mui/icons-material/Payments";
import ProductCart from "../../Cart/ProductCart";
import CartDetails from "../../../Pages/Cart/CartDetails";
import useRequest from "../../../Hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResponsiveLayout from "../../Layout/Layout";
import { PRODUCTS } from "../../../Data/API";

const Checkout = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Delivery Options, Step 2: Payment Options
  const [isEditingDelivery, setIsEditingDelivery] = useState(false); // New state to manage edit mode
  const [selectedAddressId, setSelectedAddressId] = useState(null); // State to manage selected address ID
  const cartDetails = useSelector((state) => state.cart.value);
  const userAddresses = useSelector((state) => state.userAddresses?.value); // Add this line to get user addresses
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
  const [RequestAddOreder, ResponseAddOreder] = useRequest({
    method: "Post",
    path: `${PRODUCTS}${shopInfo?.id}/orders/`,
    token: token ? `Token ${token}` : null,
  });
  const GetCartDetails = () => {
    RequestGetCartDetails({
      onSuccess: (res) => {
        dispatch({ type: "cart/set", payload: res.data });
      },
    });
  };
  const AddOrder = () => {
    RequestAddOreder({
      body:{
        shipping_address:selectedAddressId
      },
      onSuccess: (res) => {
        dispatch({ type: "checkout/set", payload: res.data });
        navigate(`/t2/${shopInfo.sub_domain}/orders`);
      },
    });
  };
  const initializeSelectedAddressId = () => {
    if (userAddresses?.length > 0 && !selectedAddressId) {
      setSelectedAddressId(userAddresses[0].id);
    }
  };

  useEffect(() => {
    GetCartDetails();
  }, []);

  useEffect(() => {
    initializeSelectedAddressId();
  }, [userAddresses]);

  console.log(selectedAddressId);
  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("MY ADDRESS BOOK")}`}
        desc="Description of my page for SEO"
        name={shopInfo?.full_name}
        type={shopInfo?.shop_type_name}
        image={shopInfo?.logo}
      />
      <Container maxWidth="xl" sx={{ my: "100px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <DarkButton
            variant="contained"
            onClick={() => navigate(`/t2/${shopInfo.sub_domain}`)}
          >
            <ReplayIcon />
            <LightText
              sx={{
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              }}
            >
              {t("Back to Shopping")}
            </LightText>
          </DarkButton>
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

        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            height: "100%",
          }}
        >
          <Grid lg={7} md={7} xs={12} sm={12} justifyContent="space-between">
            {step === 1 || isEditingDelivery ? (
              <>
                {/* addresses box */}
                <Box>
                  <MainTitle sx={{ mb: 4 }}>{t("Delivering to")}</MainTitle>

                  <ViewAddress selectedAddressId={selectedAddressId}
                    setSelectedAddressId={setSelectedAddressId} />
                
                  <DarkButton

                    onClick={handleClickOpenAddAddress}
                    variant="contained"
                    sx={{
                      width: "10rem",
                      mt: 4,
                      mr: 3,
                    }}
                  >
                    {t("Add New Address")}
                  </DarkButton>
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
                <DarkButton
                  variant="contained"
                  onClick={handleProceedToPayment}
                >
                  {t("PROCEED TO SECURE PAYMENT")}
                </DarkButton>
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
                <DarkButton type="button" variant="contained" onClick={() => {AddOrder()}}>

                  {t("Check Out")}
                </DarkButton>
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
    </ResponsiveLayout>
  );
};

export default Checkout;
