const { styled, Button, IconButton } = require("@mui/material");

export const ButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.light,
}));
export const DarkButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.primary.dark,
  ":hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
export const TransparentButton = styled(Button)(({ theme }) => ({
  fontFamily: "Cairo",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: "28.11px",
  letterSpacing: "-0.24 px",
  textDecoration: "none",
  textTransform: "none",
  display: "flex",
  flexDirection: "row",
  height: "28px",
  width: "60px",
}));

export const PaymentButton = styled(IconButton)(({ theme }) => ({
  width: "6rem",
  height: "4rem",
  borderRadius: "6px",
  border: "1px solid #A1A1A1",
  margin: 3,
}));

export const ActivePaymentButton = styled(IconButton)(({ theme }) => ({
  width: "6rem",
  height: "4rem",
  borderRadius: "6px",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  margin: 3,
}));


export const BlackButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    fontFamily: "Cairo",
    width: "10rem",
    mt: 4,
    mr: 3,
}));


export const SidBarButton = styled(Button)(({ theme }) => ({
  width: "100%",
            height: "62px",
            display: "flex",
            justifyContent: "space-between",
            padding: '15px'
}));
