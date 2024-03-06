import {
  Button,
  Container,
  useTheme,
  Box,
  Grid,
  Menu,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import { BlackText, FooterGrayText, FooterMenuText, FooterTitle, GrayText, LightText } from "../../Style/StyledComponents/Typography";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import AppGallery from "../../assets/images/icon_huaweiappgallery.svg";
import GoogleStore from "../../assets/images/unnamed.png";
import AppStore from "../../assets/images/apple-store-badge.svg";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { FooterMenuLang, MenuLanguage } from "./MenuLanguage";
import Visa from "../../assets/images/Visa_Logo.png";
import MasterCard from "../../assets/images/MasterCard_Logo.svg.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./index.css";
import { useSelector } from "react-redux";
import { FooterGrayIcon, GrayIcon } from "../../Style/StyledComponents/IconButton";
import { FooterGridCenter, FooterGridDisplay, GridCenter } from "../../Style/StyledComponents/Grid";
import { BoxStyle } from "../../Style/StyledComponents/Box";
import { useTranslation } from "react-i18next";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Footer = () => {
  const theme = useTheme();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  //   const shopInfo=useSelector((state)=>state.shopInfo.value.shop)

  const lang = localStorage.getItem("language");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const openLangMenu = Boolean(anchorElLang);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLang = () => {
    setAnchorElLang(null);
  };
  const menuId = "primary-search-account-menu";
  const renderLanguage = (
    <FooterMenuLang
      open={openLangMenu}
      onClose={handleCloseLang}
      anchorElLang={openLangMenu}
    />
  );
  const [popperOpen, setPopperOpen] = useState(true);
  return (
    <Box sx={{ flexGrow: 1, bgcolor: theme.palette.primary.secondLight }}>
      <Container>
        <Grid container spacing={2} sx={{ paddingY: 4 }}>
          <Grid xs={12} md={5} sx={{ paddingX: 5 }}>
            <BoxStyle sx={{ justifyContent: "space-around" }}>
              <GrayIcon
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              >
                <FacebookIcon />
              </GrayIcon>
              <GrayIcon
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              >
                {/* <img src={Xapp} alt='X-app' style={{width:'1.5rem'}} /> */}
                <YouTubeIcon />
              </GrayIcon>
              <GrayIcon
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              >
                <InstagramIcon />
              </GrayIcon>
              <GrayIcon
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              >
                <LinkedInIcon />
              </GrayIcon>
            </BoxStyle>
          </Grid>
          <Grid xs={12} md={7} sx={{ pl: { lg: 4, md: 4, sm: 0 } }}>
            <BoxStyle
              sx={{
                justifyContent: "space-around",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "row",
                  xs: "column",
                },
              }}
            >
              <FooterTitle sx={{pb:'0'}}>
                {t("Subscribe For News")}
              </FooterTitle>
              <BoxStyle
                sx={{
                  padding: "8px 0",
                  borderRadius: "24px",
                  textAlign: "end !important",
                  width:"60%"
                }}
              >
                <Button
                  sx={{
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.primary.light,
                    padding: "10px",
                    borderRadius: "4px",
                    fontFamily: "Cairo",
                    width: "50%",
                  }}
                >
                  {t("Send")}
                </Button>
                <TextField
                className="gehad"
                  variant="outlined"
                  InputProps={{
                    placeholder:t("Enter your E-mail"),
                    style: {
                    fontFamily: 'Cairo',
                  }
                  }}
                  sx={{
                    bgcolor: theme.palette.primary.secondLight,
                    textAlign: "center !important",
                    border: "none",
                    marginX: 3,
                    width:"100%",
                    padding:'10.5px 14px !important'
                  }}
                  htmlFor="outlined-adornment-email-register"
                />
              </BoxStyle>
            </BoxStyle>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <FooterGridDisplay
            xs={6}
            md={3}
          >
            <Box>
              <FooterTitle>{t("About")}</FooterTitle>
              <FooterGrayText>{t("Customer Rights")}</FooterGrayText>
              <FooterGrayText>{t("Disclaimer")}</FooterGrayText>
              <FooterGrayText>{t("Privacy Policy")}</FooterGrayText>
            </Box>
          </FooterGridDisplay>
          <FooterGridDisplay
            xs={6}
            md={3}
          >
            <Box>
            <FooterTitle>{t("Customer Service")}</FooterTitle>
            <FooterGrayText>{t("Shipping Information")}</FooterGrayText>
            <FooterGrayText>{t("Returns Information")}</FooterGrayText>
            <FooterGrayText>{t("Order Tracking")}</FooterGrayText>
            <FooterGrayText>{t("FAQs")}</FooterGrayText>
            <FooterGrayText>{t("Feedback")}</FooterGrayText>
            </Box>
          </FooterGridDisplay>
          <Grid xs={12} md={3} sm={6}>
            <FooterTitle>{t("Customer Support")}</FooterTitle>
            <FooterGrayText>
              {t("We are available all days from:")}
              <BlackText>{t("OPEN 9AM - 9PM")}</BlackText>
            </FooterGrayText>
            <FooterGrayText>
              <FooterGrayIcon>
                <PhoneInTalkIcon />
              </FooterGrayIcon>{" "}
              +999999999999
            </FooterGrayText>
            <FooterGrayText>
              <FooterGrayIcon>
                <EmailIcon />
              </FooterGrayIcon>{" "}
              {shopInfo?.email}
            </FooterGrayText>
          </Grid>
          <Grid xs={12} md={3} sm={6} pb={3}>
            <FooterTitle>{t("Download The App")}</FooterTitle>
            <Box>
              <img src={AppStore} alt="App-Store" />
            </Box>
            <Box>
              <img
                src={GoogleStore}
                alt="Google-Store"
                style={{ width: "8.5rem" }}
              />
            </Box>
            <Box>
              <img
                src={AppGallery}
                alt="App-Gallery"
                style={{ width: "8.5rem" }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ paddingY: 4, display: { lg: "flex", md: "flex", xs: "none" } }}
        >
          <FooterGridCenter
            xs={6}
            md={3}
          >
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                bgcolor: theme.palette.primary.dark,
                fontFamily:"Cairo"
                          }}
            >
              {t("Customer Services")}
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <FooterMenuText>
                  <FooterGrayIcon>
                    <PhoneInTalkIcon />
                  </FooterGrayIcon>{" "}
                  +999999999999
                </FooterMenuText>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FooterMenuText>
                  <FooterGrayIcon>
                    <EmailIcon />
                  </FooterGrayIcon>{" "}
                  {shopInfo?.email}
                </FooterMenuText>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FooterMenuText>
                  <FooterGrayIcon>
                    <DensityMediumIcon />
                  </FooterGrayIcon>{" "}
                  {t("FAQs")}
                </FooterMenuText>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FooterMenuText>
                  <FooterGrayIcon>
                    <DeliveryDiningIcon />
                  </FooterGrayIcon>{" "}
                  {t("FREE DELIVERY ON MIN. ORDER")}
                </FooterMenuText>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FooterMenuText>
                  <FooterGrayIcon>
                    <AutorenewIcon />
                  </FooterGrayIcon>{" "}
                  {t("14 DAYS FREE RETURN")}
                </FooterMenuText>
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleClose} disableRipple sx={{}}>
                <GrayText sx={{ margin: "auto" }}>
                  {t("CoD | multiple payment options | T&Cs apply")}
                </GrayText>
              </MenuItem>
            </StyledMenu>
          </FooterGridCenter>
          <FooterGridCenter xs={3} md={6}>
            <BoxStyle
              sx={{
                pb: 2,
                justifyContent: "center",
              }}
            >
              <FooterGrayIcon>
                <AccountCircle />
              </FooterGrayIcon>{" "}
              <BlackText sx={{ cursor: "pointer" }}>{t("Sign In")}</BlackText>
              <BlackText>&nbsp;/&nbsp;</BlackText>
              <BlackText sx={{ cursor: "pointer" }}>{t("Register")}</BlackText>
            </BoxStyle>
          </FooterGridCenter>
          <FooterGridCenter
            xs={3}
            md={3}
          >
            <Box id="footer-lang">
            <FooterGrayIcon
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleLanguageMenuOpen}
            >
              <LanguageOutlinedIcon />
            </FooterGrayIcon>
            {renderLanguage}
            </Box>

          </FooterGridCenter>
        </Grid>
      </Container>
      <Grid
        container
        spacing={2}
        sx={{ paddingY: 3, bgcolor: theme.palette.primary.dark, width: "100%", justifyContent:'center' }}
      >
        <FooterGridCenter
          xs={12}
          md={6}
          lg={4}
        >
          <LightText>
            {t("Copyright © 2024 Easytrade | All Rights Reserved")}
          </LightText>
        </FooterGridCenter>
        <FooterGridCenter
          md={4}
          lg={4}
          sx={{
            display: { lg: "flex", xs: "none" },
          }}
        >
          <LightText
            sx={{ cursor: "pointer" }}
          >
            {t("Shipping")}
          </LightText>
          <LightText>
            &nbsp;/&nbsp;
          </LightText>
          <LightText
            sx={{ cursor: "pointer" }}
          >
            {t("Returns")}
          </LightText>
          <LightText>
            &nbsp;/&nbsp;
          </LightText>
          <LightText
            sx={{ cursor: "pointer" }}
          >
            {t("FAQs")}
          </LightText>
        </FooterGridCenter>
        <FooterGridCenter
          md={4}
          lg={4}
          sx={{
            display: { lg: "flex", xs: "none" },
          }}
        >
          <Box sx={{ pl: 2 }}>
            <LightText>
              CASH ON
            </LightText>
            <LightText>
              DELIVERY
            </LightText>
          </Box>
          <Box sx={{ pl: 2 }}>
            <img src={MasterCard} alt="Master-Card" style={{ width: "4rem" }} />
          </Box>
          <Box>
            <img src={Visa} alt="Visa" style={{ width: "4rem" }} />
          </Box>
        </FooterGridCenter>
      </Grid>
    </Box>
  );
};

export default Footer;
