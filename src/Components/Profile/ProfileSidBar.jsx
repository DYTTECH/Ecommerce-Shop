import { Box, Button, Divider, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleButtonProfile } from "../../Style/StyledComponents/profileStyle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import { GrayText } from "../../Style/StyledComponents/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProfileSidBar = () => {
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("orders");
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const lang = localStorage.getItem("language");

  const { t } = useTranslation();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const profile = [
    {
      name: t("MY PROFILE"),
      value: "profile",
      icon: <AccountCircle />,
      path: `/t2/${shopInfo?.sub_domain}/profile`,
    },
    {
      name: t("REFER & EARN"),
      value: "refer",
      icon: <WalletIcon />,
      path: `/t2/${shopInfo?.sub_domain}/profile`,
    },
    {
      name: t("MY ORDERS"),
      value: "orders",
      icon: <ListAltIcon />,
      path: `/t2/${shopInfo?.sub_domain}/orders`,
    },
    {
      name: t("MY RETURN/EXCHANGE"),
      value: "return",
      icon: <RotateLeftIcon />,
      path: `/t2/${shopInfo?.sub_domain}/profile`,
    },
    {
      name: t("MY WISHLIST"),
      value: "wishlist",
      icon: <FavoriteBorderOutlinedIcon />,
      path: `/t2/${shopInfo?.sub_domain}/profile/wishlist`,
    },
    {
      name: t("MY ADDRESS BOOK"),
      value: "address",
      icon: <LocationOnIcon />,
      path: `/t2/${shopInfo?.sub_domain}/addresses`,
    },
    {
      name: t("PAYMENTS"),
      value: "payments",
      icon: <CreditCardIcon />,
      path: `/t2/${shopInfo?.sub_domain}/payments`,
    },
  ];
  return (
    <Box>
      <Box>
        <ToggleButtonGroup
          fullWidth
          orientation="vertical"
          size="large"
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="text formatting"
          sx={{ textTransform: "none" }}
        >
          {profile.map((item, index) => {
            return (
              <ToggleButtonProfile
                key={index}
                value={item.value}
                onClick={() => navigate(item?.path)}
              >
                {item.icon}
                <GrayText>{item.name}</GrayText>
                {lang === "ar" ? (
                  <ArrowForwardIosIcon />
                ) : (
                  <ArrowBackIosNewIcon />
                )}
              </ToggleButtonProfile>
            );
          })}
        </ToggleButtonGroup>
      </Box>
      <Divider />
      <Box>
        <Button
          //   onClick={handleSignout}
          sx={{
            width: "100%",
            height: "62px",
            display: "flex",
            justifyContent: "space-between",
            pl: "12px",
          }}
        >
          <LogoutIcon />
          <GrayText sx={{ padding: "0" }}>{t("LOGOUT")}</GrayText>
          {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSidBar;
