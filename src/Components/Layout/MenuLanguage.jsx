import React, {  useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { setLanguage } from "../../Store/LangSlice";

export const MainMenuLang = ({ open, onClose, anchorElLang }) => {
  const { t, i18n } = useTranslation(); // Retrieve translation functions
  const language = useSelector((state) => state.language.lang);
 
  const dispatch = useDispatch();

  useEffect(() => {
    const currentLanguage = localStorage.getItem("language");
    if (currentLanguage) {
      dispatch(setLanguage  (currentLanguage));
      i18n.changeLanguage(currentLanguage);
    }
  }, [dispatch, i18n]);

  const handleChangeLang = (selectedLang) => {
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang); // Save selected language to localStorage
    onClose();
  };

  return (
    <Menu
      className="langMenu"
      anchorEl={anchorElLang}
      anchorOrigin={{
        vertical: "top",
        horizontal: language === "en" ? "right":"left"  ,
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: language === "en" ? "left" : "right",
      }}
      open={open}
      onClose={onClose}
      sx={{ ".MuiMenuItem-root": { cursor: "pointer"} }} // Use correct class name
      
    >
      <MenuItem
        value="ar"
        onClick={() => handleChangeLang("ar")}
        selected={language === "ar"}

      >
        {t("arabic")}
      </MenuItem>
      <MenuItem
        value="en"
        onClick={() => handleChangeLang("en")}
        selected={language === "en"}
      >
        {t("english")}
      </MenuItem>
    </Menu>
  );
};

export const FooterMenuLang = ({ open, onClose, anchorElLang }) => {
  const { t, i18n } = useTranslation(); // Retrieve translation functions
  const language = useSelector((state) => state.language.lang);
 
  const dispatch = useDispatch();

  useEffect(() => {
    const currentLanguage = localStorage.getItem("language");
    if (currentLanguage) {
      dispatch(setLanguage  (currentLanguage));
      i18n.changeLanguage(currentLanguage);
    }
  }, [dispatch, i18n]);

  const handleChangeLang = (selectedLang) => {
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang); // Save selected language to localStorage
    onClose();
  };

  return (
    <Menu
      className="footerlangMenu"
      anchorEl={anchorElLang}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: language === "en" ? "right":"left"  ,
      }}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: language === "en" ? "left" : "right",
      }}
      open={open}
      onClose={onClose}
      sx={{ ".MuiMenuItem-root": { cursor: "pointer"},top:'665px !important', left: language === "ar" ? "unset !important" : "105px !important", right: language === "en" ? "unset !important" : "105px !important", width:'100%' }} // Use correct class name
      
    >
      <MenuItem
        value="ar"
        onClick={() => handleChangeLang("ar")}
        selected={language === "ar"}

      >
        {t("arabic")}
      </MenuItem>
      <MenuItem
        value="en"
        onClick={() => handleChangeLang("en")}
        selected={language === "en"}
      >
        {t("english")}
      </MenuItem>
    </Menu>
  );
};