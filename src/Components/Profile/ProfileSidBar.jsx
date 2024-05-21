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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProfileSidBar = () => {
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("orders");
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const lang = localStorage.getItem("language");

  const { t } = useTranslation();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Box >
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
          <ToggleButtonProfile
            value="profile"
            onClick={() => navigate(`/t2/${shopInfo?.sub_domain}/profile`)}
          >
            <AccountCircle />
            <GrayText>{t("MY PROFILE")}</GrayText>
            {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
          </ToggleButtonProfile>
          <ToggleButtonProfile
            value="profile"
            onClick={() => navigate(`/t2/${shopInfo?.sub_domain}/profile`)}
          >
            <WalletIcon />
            <GrayText>{t("REFER & EARN")}</GrayText>
            {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
          </ToggleButtonProfile>
          <ToggleButtonProfile
            value="orders"
            onClick={() =>
              navigate(`/t2/${shopInfo?.sub_domain}/orders`)
            }
          >
            <ListAltIcon />
            <GrayText>{t("MY ORDERS")}</GrayText>
                        {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}

          </ToggleButtonProfile>
          <ToggleButtonProfile
            value="return"
            onClick={() =>
              navigate(`/t2/${shopInfo?.sub_domain}/profile`)
            }
          >
            <RotateLeftIcon />
            <GrayText>{t("MY RETURN/EXCHANGE")}</GrayText>
                        {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}

          </ToggleButtonProfile>
          <ToggleButtonProfile
            value="wishlist"
            onClick={() =>
              navigate(`/t2/${shopInfo?.sub_domain}/profile/wishlist`)
            }
          >
            <FavoriteBorderOutlinedIcon />
            <GrayText>{t("MY WISHLIST")}</GrayText>
                        {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}

          </ToggleButtonProfile>
          <ToggleButtonProfile
            value="addresses"
            onClick={() =>
              navigate(`/t2/${shopInfo?.sub_domain}/addresses`)
            }
          >
            <LocationOnIcon />
            <GrayText>{t("MY ADDRESS BOOK")}</GrayText>
                        {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}

          </ToggleButtonProfile>

          <ToggleButtonProfile
            value="payments"
            onClick={() =>
              navigate(`/t2/${shopInfo?.sub_domain}/payments`)
            }
          >
            <CreditCardIcon />
            <GrayText>{t("PAYMENTS")}</GrayText>
                        {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}

          </ToggleButtonProfile>
        </ToggleButtonGroup>
      </Box>
      <Divider />
      <Box>
        <Button
          //   onClick={handleSignout}
          sx={{
            width:'100%',
            height: "62px",
            display: "flex",
            justifyContent: "space-between",
            pl: "12px",
          }}
        >
          <LogoutIcon />
          <GrayText sx={{padding:'0'}}>{t("LOGOUT")}</GrayText>
          {lang === "ar" ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSidBar;
