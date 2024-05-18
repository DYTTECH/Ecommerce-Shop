import React from "react";
import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


const PasswordField = ({
  variant = null,
  onChange,
  label = "",
  value,
  placeholder = "",
  InputProps,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  return (
    <TextField
      type={visible ? "text" : "password"}
      variant={variant ? variant : "outlined"}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      inputProps={{ autoComplete: "new-password" }}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end" sx={{ margin: 0 }}>
            <IconButton onClick={() => setVisible((old) => !old)}>
              {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
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
        "& .MuiOutlinedInput-root": {
          height: "48px", // Set the desired height
          borderRadius: "8px", // Set the desired border radius
          width: "100%",
          fontFamily: "Cairo",
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
      }}
      {...rest}
    />
  );
};

export default PasswordField;
