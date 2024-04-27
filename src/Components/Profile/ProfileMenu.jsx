import { useTheme } from "@emotion/react";
import { Button, Fade, Menu, MenuItem, Paper, Popper } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLogin from "../Authentication/LogInAuth";
import AuthRegister from "../Authentication/RegisterAuth";
import { useSelector } from "react-redux";
import { GrayText, MainText } from "../../Style/StyledComponents/Typography";
import PopupState, { bindToggle } from "material-ui-popup-state";
import { GrayIcon } from "../../Style/StyledComponents/IconButton";
import { AccountCircle } from "@mui/icons-material";

const ProfileMenu = ({ openProfile, handleCloseProfile, anchorElProfile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const language = useSelector((state) => state.language.lang);
  console.log(userInfo);
  const navigate = useNavigate();
  const menuId = "primary-search-account-menu";
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const lang = localStorage.getItem("language");


  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    navigate("/signin");
    handleCloseProfile();
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

  return (
    <>
      <Menu
        anchorEl={anchorElProfile}
        anchorOrigin={{
          vertical: "top",
          horizontal: language === "en" ? "right" : "left",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: language === "en" ? "left" : "right",
        }}
        open={openProfile}
        onClose={handleCloseProfile}
      >
        {userInfo === null || userInfo === undefined ? (
          <>
            <MenuItem>
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
            </MenuItem>
            <MenuItem>
              <GrayText sx={{ pt: 2, pX: 2 }}>
                {t("New Customer?")}{" "}
                <MainText
                  sx={{ cursor: "pointer", display: "inline" }}
                  onClick={handleClickOpenRegister}
                >
                  {t("Register")}
                </MainText>
              </GrayText>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                navigate(`/t2/${shopInfo.sub_domain}/profile`); // Navigate to profile
                handleCloseProfile(); // Close the menu
              }}
            >
              {t("Profile")}
            </MenuItem>
            <MenuItem onClick={handleCloseProfile}>{t("My account")}</MenuItem>
            <MenuItem onClick={handleLogOut}>{t("Log Out")}</MenuItem>
          </>
        )}
      </Menu>

      <AuthLogin openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
      <AuthRegister
        openRegister={openRegister}
        handleCloseRegister={handleCloseRegister}
      />
    </>
  );
};

export default ProfileMenu
