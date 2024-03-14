const { styled, Button } = require("@mui/material");

export const ButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.light
}));
export const DarkButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.light,
    bgcolor: theme.palette.primary.dark,

}));
export const TransparentButton = styled(Button)(({ theme }) => ({
    fontFamily: "Cairo",
    fontSize: "15px",
    fontWeight: 500,
    lineHeight: "28.11px",
    letterSpacing: "-0.24 px",
    textDecoration:"none",
    textTransform:"none",
    display:"flex",
    flexDirection:"row",
    height:"28px",
    width:"41px"
  }));