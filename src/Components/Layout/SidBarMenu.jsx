import { Container } from "@mui/material";
import { MainMenuLang } from "./MenuLanguage";
import ProfileSidBar from "../Profile/ProfileSidBar";
import { useEffect, useState } from "react";
import {
  BlackText,
  DarkText,
  GrayText,
} from "../../Style/StyledComponents/Typography";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Store/LangSlice";
import { SidBarButton } from "../../Style/StyledComponents/Buttons";
import { BoxStyleRow } from "../../Style/StyledComponents/Box";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTheme } from "@emotion/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ToggleButtonProfile } from "../../Style/StyledComponents/profileStyle";
const SidBarMenu = () => {
  const [anchorElLang, setAnchorElLang] = useState(null);
  const openLangMenu = Boolean(anchorElLang);
  const { t, i18n } = useTranslation(); // Retrieve translation functions
  const language = useSelector((state) => state.language.lang);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));

  const lang = localStorage.getItem("language");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLanguage = localStorage.getItem("language");
    if (currentLanguage) {
      dispatch(setLanguage(currentLanguage));
      i18n.changeLanguage(currentLanguage);
    }
  }, [dispatch, i18n]);

  const handleChangeLang = (selectedLang) => {
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang); // Save selected language to localStorage
  };
  return (
    <Container>
      <BoxStyleRow>
        <TranslateIcon sx={{ ml: 4, color: theme.palette.primary.main }} />

        <SidBarButton>
          {lang === "ar" ? (
            <BlackText
              value="ar"
              onClick={() => handleChangeLang("ar")}
              selected={language === "ar"}
              sx={{
                padding: "0",
                // Add any additional BlackText styles here
              }}
            >
              {t("arabic")}
            </BlackText>
          ) : (
            <GrayText
              value="ar"
              onClick={() => handleChangeLang("ar")}
              selected={language === "ar"}
              sx={{
                padding: "0",
                // Add any additional GrayText styles here
              }}
            >
              {t("arabic")}
            </GrayText>
          )}
        </SidBarButton>
        <SidBarButton>
          {lang === "en" ? (
            <BlackText
              value="en"
              onClick={() => handleChangeLang("en")}
              selected={language === "en"}
              sx={{
                padding: "0",
                // Add any additional BlackText styles here
              }}
            >
              {t("english")}
            </BlackText>
          ) : (
            <GrayText
              value="en"
              onClick={() => handleChangeLang("en")}
              selected={language === "en"}
              sx={{
                padding: "0",
                // Add any additional GrayText styles here
              }}
            >
              {t("english")}
            </GrayText>
          )}
        </SidBarButton>
      </BoxStyleRow>
      <ToggleButtonProfile
        sx={{ padding: "15px" }}
        onClick={() => {
          navigate(`/t2/${shopInfo?.sub_domain}/cart`);
        }}
      >
        <ShoppingCartIcon />
        <GrayText sx={{ paddingBottom: "0 !important" }}>
          {t("View Bag")}
        </GrayText>
        {lang === "ar" ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
      </ToggleButtonProfile>

      <ProfileSidBar />
    </Container>
  );
};

export default SidBarMenu;
