import { OutlinedInput, Select, styled } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

export const DropDown = styled(Select)(({ theme }) => ({}));

export const InputPrice = styled(OutlinedInput)(({ theme }) => ({
  width: "50%",
  height: "36px",
  borderRadius: "20px",
  border: "2px solid #E5E7EB",
  display: "flex",
  alignItems: "center",
  padding: "0px, 24px, 0px, 24px",
  fontFamily: "Cairo",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  letterSpacing: "0em",
  textAlign: "left",
  root: {
    ":-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      backgroundColor: "red !important",
    },
  },
  input: {
    ":-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      backgroundColor: "red !important",
    },
  },
}));

export const InputField = styled(OutlinedInput)(({ theme }) => ({
  width: "100%",
  height: "48px",
  borderRadius: "8px",
  border: "1px solid #E5E7EB",
  display: "flex",
  alignItems: "center",
  // padding: "0px, 24px, 0px, 24px",
  fontFamily: "Cairo",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  letterSpacing: "0em",
  root: {
    ":-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      backgroundColor: "red !important",
    },
  },
  input: {
    ":-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
      backgroundColor: "red !important",
    },
  },
}));

export const PhoneNumber = styled(MuiTelInput)(({ theme }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    height: "48px", // Set the desired height
    borderRadius: "8px", // Set the desired border radius
    "& fieldset": {
      borderWidth: "1px", // Adjust border width if needed
      borderColor: "#ccc", // Set border color
    },
    "&:hover fieldset": {
      borderColor: "#ccc", // Change border color on hover if desired
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main, // Change border color when focused
    },
  },
}));
