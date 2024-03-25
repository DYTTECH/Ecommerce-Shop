const { styled, Typography } = require("@mui/material");

export const RedText = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: theme.font.fontSize.extraSmall,
  fontWeight: theme.font.fontWeight.bold,
  fontFamily: "Cairo",
}));
export const BlackText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: theme.font.fontSize.extraSmall,
  fontWeight: theme.font.fontWeight.bold,
  fontFamily: "Cairo",
}));
export const GrayText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.gray,
  fontSize: theme.font.fontSize.extraSmall,
  fontFamily: "Cairo",
  paddingBottom: "16px"
}));

export const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.font.fontSize.extraLarge,
  fontWeight: theme.font.fontWeight.bold,
  boxShadow: "none",
  fontFamily: "Cairo",
  bgcolor: theme.palette.primary.light,
  paddingBottom: "16px"
}));
export const FooterGrayText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.gray,
  fontSize: theme.font.fontSize.small,
  fontFamily: "Cairo",
  paddingBottom: "10px"
}));
export const FooterMenuText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.gray,
  fontSize: theme.font.fontSize.small,
  fontFamily: "Cairo",
  paddingBottom: "10px",
  alignItems: "center" ,
  display: "flex"
}));

export const LightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: theme.font.fontSize.small,
  fontWeight: theme.font.fontWeight.medium,
  fontFamily: "Cairo",
}));

export const MainText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: theme.font.fontSize.small,
  fontWeight: theme.font.fontWeight.medium,
  fontFamily: "Cairo",
}));
export const DarkText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: theme.font.fontSize.small,
  fontWeight: theme.font.fontWeight.medium,
  fontFamily: "Cairo",
}));

export const MainTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: theme.font.fontSize.extraLarge,
  fontWeight: theme.font.fontWeight.medium,
  fontFamily: "Cairo",
}));

export const ItemsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: theme.font.fontSize.extraSmall,
  fontWeight: theme.font.fontWeight.semibold,
  fontFamily: "Cairo",
}));
 
export const ItemsDes = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.forth,
  fontSize: theme.font.fontSize.extraSmall,
  fontWeight: theme.font.fontWeight.medium,
  fontFamily: "Cairo",
}));

export const TextDiscount = styled(Typography)(({ theme }) => ({
  color: "red",
  textDecorationLine: "line-through",
  fontFamily: "Cairo",
}));