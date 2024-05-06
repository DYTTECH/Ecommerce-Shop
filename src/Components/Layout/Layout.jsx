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
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useRequest from "../../Hooks/useRequest";
import { PRODUCTS } from "../../Data/API";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 5, 2, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 240;

function ResponsiveLayout(props) {
  // const shopInfo=useSelector((state)=>state.shopInfo.value.shop)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
 const wishlist=useSelector((state)=>state.wishlist.value)
 const cart=useSelector(((state)=>state.cart.value))
const handleOpenLogin = () => {
  setOpenLogin(true);
}
  // menu lang state
  const [anchorElLang, setAnchorElLang] = React.useState(null);

  const { t, i18n } = useTranslation(); // Retrieve translation functions
  const openLangMenu = Boolean(anchorElLang);
   const dispatch = useDispatch();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const lang = localStorage.getItem("language");
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openCartPopup, setOpenCartPopup] = useState(false);


  const handleCloseCartPopup = () => {
    setOpenCartPopup(false);
  };
  const handleClickOpenCartPopup = () => {
    setOpenCartPopup(true);
    
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
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

  const handleLanguageMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLang = () => {
    setAnchorElLang(null);
  };
const handleViewWishList=()=>{
  
  navigate(`/t2/${shopInfo.sub_domain}/wishlist`);
}
  // dark mode and light mode

  const isMenuOpen = Boolean(anchorEl);
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

    // Get wishlist request
    const [RequestGetWishList, ResponseGetWishList] = useRequest({
      method: "Get",
      path: PRODUCTS + shopInfo?.id + "/products/?favorite=True",
      token:token?`Token ${token}`:null
    });
    const GetProductsWishList = () => {
        RequestGetWishList({
        onSuccess: (res) => {
          dispatch({ type: "wishlist/set", payload: res.data });
        },
        onError: (err) => {
          dispatch({ type: "wishlist/reset", payload: err.message });
        },
      });
    };
  
    useEffect(() => {
      GetProductsWishList();
    }, [shopInfo?.id]);

  useEffect(() => {
    i18n.language == "ar" ? (document.dir = "rtl") : (document.dir = "ltr");
  }, [i18n.language]);


  // sidebar button links
  const drawer = <Container>hjh</Container>;
  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickOpenRegister}>{t("Register")}</MenuItem>
      <MenuItem onClick={handleClickOpenLogin}>{t("Sign In")}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{t("Profile")}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{t("My account")}</MenuItem>
      <MenuItem onClick={handleLogOut}>{t("Log Out")}</MenuItem>
    </Menu>
  );
  const renderLanguage = (
    <MainMenuLang
      open={openLangMenu}
      onClose={handleCloseLang}
      anchorElLang={openLangMenu}
    />
  );
  const [popperOpen, setPopperOpen] = useState(true);

  const ViewMainCategories=(<CategoriesMenu/>)

useEffect(() => {
  // Close the Popper after 10 seconds
  const timer = setTimeout(() => {
    setPopperOpen(false);
  }, 10000);

  return () => clearTimeout(timer); // Clear the timer on component unmount
}, []);
useEffect(() => {
  i18n.changeLanguage("ar");
  
}, [i18n]);

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
                <Search
                  sx={{ mr: { xs: 3 }, color: theme.palette.primary.dark }}
                >
                  <SearchIconWrapper>
                    <SearchIcon color={theme.palette.primary.dark} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder={t("Search…")}
                    // inputProps={{ "Cairo": "search" }}
                    sx={{
                      border: "1px solid  #e7eaf3",
                      borderRadius: "8px",
                      fontFamily: "Cairo",
                      fontSize: "14px",
                    }}
                  />
                </Search>
                <div>|</div>
                <GrayIcon onClick={handleViewWishList}>
                <Badge badgeContent={wishlist?.count} color="error">
                  <FavoriteBorderOutlinedIcon/>
                  </Badge>
                </GrayIcon>
                <GrayIcon onClick={handleClickOpenCartPopup}>
                <Badge badgeContent={cart?.products?.length} color="error">
                  <ShoppingCartIcon/>
                  </Badge>
                </GrayIcon>
                <PopupState variant="popper" popupId="demo-popup-popper">
                  {(popupState) => (
                    <div>
                      <GrayIcon
                        variant="contained"
                        {...bindToggle(popupState)}
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                      >
                        <AccountCircle />
                      </GrayIcon>
                      <Popper
                        open={popperOpen}
                        transition
                        className={lang === "en" ? "popper-en" : ""}
                        sx={{
                          top: "96px !important",
                          left: lang === "en" ? "unset !important" : "0",
                          right: lang === "en" ? "0" : "unset",
                          zIndex: "1000",
                        }}
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper sx={{p:3, textAlign:'center'}}>
                              <Button sx={{bgcolor:theme.palette.primary.main, color:theme.palette.primary.light, width:'100%', fontFamily:"Cairo"}}>{t("Sign In")}</Button>
                              <GrayText sx={{ pt: 2, pX:2 }}>
                                {t("New Customer?")} <MainText sx={{ cursor:'pointer', display:'inline'}}>{t("Register")}</MainText>
                              </GrayText>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  )}
                </PopupState>

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
      {renderMenu}
      <AuthLogin openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
      <AuthRegister openRegister={openRegister} handleCloseRegister={handleCloseRegister} />
      <CartPopup openCartPopup={openCartPopup} handleCloseCartPopup={handleCloseCartPopup} />
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
          pt: { lg: 0, md: 4, sm: 4, xs: '38px' },
          direction: i18n.language == "ar" ? "rtl" : "ltr",
          // height:'auto'
          width: "100%",
        }}
      >
        <Toolbar className="gehad" sx={{marginBottom:{lg:'35px', md:'0', sm:'0',xs:'0'}}} />
        {ViewMainCategories}
        {props.children}
        <Footer />
      </Box>
     
    </Box>
  );
}

ResponsiveLayout.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveLayout;
