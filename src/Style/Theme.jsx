import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
const spacing = [0, 4, 8, 16, 32, 64];
const Theme = () => {
  // const {lang,mode} = useSelector((state) => state.langAndmode);
 
  const theme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light" ,
      primary: {
        light: "#FFFFFF",
        dark: "#000000",
        gray:"#4a4a4a",
        contrastText: "#fff",
        main: "#AF914E",
        secondary: "#164863",
        third: "#A1A1A1",
        forth:"#757575",
        mainLight: "#F9f9f9",
        secondLight: "#f6f6f6",
        background: "#ddf2fd",
        red: "#d12229",
      },
      secondary: {
        light: "#dff1e5",
        main: "#e8dbde",
        dark: "#d0cbd9",
        contrastText: "#e4ecf2",
        cardHead: "#f2e4e5",
        cardHead2: "#f1e4f2",
        background:
          "linear-gradient(-45deg, rgb(249, 168, 37) 0%, rgb(249, 168, 37) 33%, rgb(0, 188, 212) 100%);",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    spacing:spacing,
    rounded: {
      small: 2,
      medium: 4,
      large: 8,
    },
    padding: {
      xs: 2,
      sm: 4,
      md: 8,
      lg: 12,
    },
    shape: {
      borderRadius: 4,
    },
    divider: "rgba(0, 0, 0, 0.12)",
    typography: {
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "normal",
      },
    },
    font: {
      fontSize: {
        large: 32,
        extraLarge:20,
        medium: 18,
        small: 16,
        extraSmall: 14,
      },
      fontWeight: {
        bold: 700,
        semibold: 600,
        medium: 500,
        regular: 400,
        normal: 300,
      },
      
    },
    inputsHeight: {
      textfield: {
        height: 48,
      },
      button: {
        height: 48,
      },
      select: {
        height: 40,
      },
    },
  });

  return theme;
};

export default Theme;
