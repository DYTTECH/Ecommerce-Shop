import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  Container,
  InputBase,
  Popover,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { styled, alpha } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

// import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MainMenuLang, MenuLanguage } from "./MenuLanguage";
import "./index.css";
import {
  BlackText,
  GrayText,
  MainText,
} from "../../Style/StyledComponents/Typography";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { GrayIcon } from "../../Style/StyledComponents/IconButton";
import { BoxStyle } from "../../Style/StyledComponents/Box";
import Footer from "./footer";
import AuthLogin from "../Authentication/LogInAuth";
import CategoriesMenu from "./categoryMenu";
import AuthRegister from "../Authentication/RegisterAuth";
import CartPopup from "../../Pages/Cart/CartPopup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileMenu from "../Profile/ProfileMenu";
import useRequest from "../../Hooks/useRequest";
import { PRODUCTS } from "../../Data/API";
import SearchSocket from "./Search";


const drawerWidth = 240;

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);

function ResponsiveLayout(props) {
  // const shopInfo=useSelector((state)=>state.shopInfo.value.shop)
  const wishlist=useSelector((state)=>state.wishlist.value)
  const cart=useSelector((state)=>state.cart.value)
  const { window } = props;
  const dispatch=useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // menu lang state
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  const { t, i18n } = useTranslation(); // Retrieve translation functions
  const openLangMenu = Boolean(anchorElLang);
  const openProfile = Boolean(anchorElProfile);

  // const dispatch = useDispatch();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  //Popover
  const [anchorElPopover, setAnchorElPopover] = useState(null);
  const open = Boolean(anchorElPopover);
  const id = open ? "simple-popover" : undefined;

  const lang = localStorage.getItem("language");
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const [openCartPopup, setOpenCartPopup] = useState(false);
  const menuId = "primary-search-account-menu";

  const handleCloseCartPopup = () => {
    setOpenCartPopup(false);
  };
  const handleClickOpenCartPopup = () => {
    setOpenCartPopup(true);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLang = () => {
    setAnchorElLang(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
    setAnchorElPopover(null);
  };
  const handleViewWishList = () => {
    navigate(`/t2/${shopInfo?.sub_domain}/wishlist`);
  };

 

 

  // dark mode and light mode

  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // Empty dependency array ensures the effect runs only once on component mount

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    i18n.language == "ar" ? (document.dir = "rtl") : (document.dir = "ltr");
  }, [i18n.language]);

  // sidebar button links
  const drawer = <Container>hjh</Container>;
  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const renderLanguage = (
    <MainMenuLang
      open={openLangMenu}
      onClose={handleCloseLang}
      anchorElLang={openLangMenu}
    />
  );

  const ViewMainCategories = (<CategoriesMenu />)
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [i18n]);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleCloseLogin = () => {
    setOpenLogin(false);
    handleCloseProfile();
  };
  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  const [openPopover, setOpenPopover] = useState(false);

  // Function to open the popover after a delay
  const openPopoverAfterDelay = () => {
    setOpenPopover(true); // Open the popover
    // Close the popover after 30 seconds (30000 milliseconds)
    setTimeout(() => {
      setOpenPopover(false); // Close the popover
    },5000); // 30 seconds
  };

  // Call the function to open the popover after component mount
  useEffect(() => {
    if (userInfo === null) {
      openPopoverAfterDelay();
    }
  }, [userInfo]);
  return (
    <Box
      className="layout"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { sm: "center" },
        overflow: "hidden",
      }}
      onScroll={handleDrawerTransitionEnd}
    >
      <CssBaseline />
      <AppBar
        elevation={0}
        disableGutters
        position="fixed"
        sx={{
          transition: "0.8s all",
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // mr: { sm: lang === 'ar' ?`${drawerWidth}px`:"auto" },
          paddingInline: "2%",
          paddingBlock: trigger ? "0.4%" : "0.4%",
          background: theme.palette.primary.light,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { lg: "space-between", md: "center", sm: "center" },
            pb: { lg: 0, md: 2, sm: 2 },
          }}
          disableGutters
        >
          <BoxStyle
            sx={{
              pt: { lg: 0, md: 2, sm: 2, xs: 2 },
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              justifyContent: "start",
              width: "20rem",
              cursor:"pointer"
            }}
            onClick={()=>navigate(`/t2/${shopInfo?.sub_domain}/`)}
          >
            <Avatar
              src={shopInfo?.logo}
              sx={{ width: 56, height: 56 }}
              variant="rounded"
              alt="shop-title"
            ></Avatar>

            <BlackText
              sx={{
                pr: 4,
                fontSize: "18px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {shopInfo?.shop_name}
            </BlackText>
          </BoxStyle>

          <BoxStyle
            sx={{
              flexDirection: {
                lg: "row-reverse",
                md: "column",
                sm: "column",
                xs: "column",
              },
            }}
          >
            <Typography variant="h6" noWrap component="div">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  gap: "0.6rem",
                  paddingY: 3,
                  justifyContent: "center",
                }}
              >
                <SearchSocket/>
                <div>|</div>
                <GrayIcon onClick={handleViewWishList}>
                <Badge badgeContent={wishlist?.count} color="error">
                  <FavoriteBorderOutlinedIcon />
                </Badge>
                </GrayIcon>
                <GrayIcon onClick={handleClickOpenCartPopup}>
                <Badge badgeContent={cart?.products?.length} color="error">
                  <ShoppingCartIcon />
                  </Badge>
                </GrayIcon>

                <GrayIcon
                  variant="contained"
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle />
                </GrayIcon>

                <GrayIcon
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleLanguageMenuOpen}
                >
                  <LanguageOutlinedIcon />
                </GrayIcon>
                <GrayIcon
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </GrayIcon>
              </Box>
            </Typography>
          </BoxStyle>
        </Toolbar>
      </AppBar>

      {renderLanguage}
      {/* {renderProfile} */}
      <AuthLogin openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
      <AuthRegister
        openRegister={openRegister}
        handleCloseRegister={handleCloseRegister}
      />
      <CartPopup
        openCartPopup={openCartPopup}
        handleCloseCartPopup={handleCloseCartPopup}
      />
      <ProfileMenu
        openProfile={openProfile}
        handleCloseProfile={handleCloseProfile}
        anchorElProfile={anchorElProfile}
      />
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorElPopover}
        onClose={handleCloseProfile}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Button
            sx={{
              bgcolor: theme.palette.primary.dark,
              color: theme.palette.primary.light,
              width: "100%",
              fontFamily: "Cairo",
            }}
            onClick={handleClickOpenLogin}
          >
            {t("Sign In")}
          </Button>
          <GrayText sx={{ pt: 2, pX: 2 }}>
            {t("New Customer?")}{" "}
            <MainText
              sx={{
                cursor: "pointer",
                display: "inline",
              }}
              onClick={handleClickOpenRegister}
            >
              {t("Register")}
            </MainText>
          </GrayText>
        </Box>
      </Popover>
      <Box
        component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          anchor={lang === "ar" ? "right" : "left"}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { lg: 0, md: 4, sm: 4, xs: "38px" },
          direction: i18n.language == "ar" ? "rtl" : "ltr",
          // height:'auto'
          width: "100%",
        }}
      >
        <Toolbar
          className="gehad"
          sx={{ marginBottom: { lg: "35px", md: "0", sm: "0", xs: "0" } }}
        />
        {ViewMainCategories}
        <Box mt={"50px"}>{props.children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}

ResponsiveLayout.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveLayout;
