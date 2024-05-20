import styled from "@emotion/styled";
import {
  Box,
  Typography,
  ToggleButton,
  TextField,
} from "@mui/material";

export const SideBox = styled(Box)({
  width: "100%",
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #D3D3D3",
  marginTop: "24px",
});
export const TextProfile = styled(Typography)({
  fontFamily: "Cairo",
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "37px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#8150A0",
});
export const ToggleButtonProfile = styled(ToggleButton)({
  border: "none",
  textTransform: "none",
  width:'100%',
  justifyContent:'space-between',
  "&.Mui-selected": {
    color: "#707070",
    background: "none",
  },
  " &.Mui-selected:hover": {
    color: "#707070",
    background: "none",
  },
});
export const AddressTextField = styled(TextField)({
  padding: "10.5px 14px",
  width: "100%",
})
