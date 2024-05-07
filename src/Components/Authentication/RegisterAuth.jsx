import * as React from "react";
import { useState } from "react"; // Step 1: Import useState
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import BASEURL from "../../Data/API";
import useRequest from "../../Hooks/useRequest";
import useControls from "../../Hooks/useControls";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { BlackText } from "../../Style/StyledComponents/Typography";
import Snackbar from "@mui/material/Snackbar";
import "./index.css";

const AuthRegister = ({ openRegister, handleCloseRegister }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const [gender, setGender] = useState("F");
  const [birthDate, setBirthDate] = useState(null);
  const datePickerStyles = {
    "& .MuiOutlinedInput-root": {
      height: "48px !improtant",
      "&:hover fieldset": {
        borderColor: "#7d7d7d",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7d7d7d",
      },
    },
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setControl("gender", event.target.value);
    console.log(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [RegisterRequest, RegisterResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/customer/create/`,
    method: "post",
  });

  const [otpCode, setOtpCode] = useState(""); // State to store OTP code

  // Step 1: Use state to store the cs_token
  const [csToken, setCsToken] = useState("");

  // Step 2: Use csToken in SendOtpRequest headers
  const [SendOtpRequest, SendOtpResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/auth/send-otp/`,
    method: "post",
    headers: { Authorization: `Bearer ${csToken}` }, // Include csToken in headers
  });

  // Step 3: Use VerfiyOtpRequest to verify OTP
  const [VerfiyOtpRequest, VerfiyOtpResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/auth/verify-otp/`,
    method: "post",
  });

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate, setInvalid },
  ] = useControls([
    { control: "full_name", value: "", isRequired: true },
    {
      control: "customer_email",
      value: "",
      isRequired: true,
      validations: [
        {
          test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "not valid email",
        },
      ],
    },
    {
      control: "password",
      value: "",
      isRequired: true,
      validations: [
        {
          message: "In-valid password",
        },
      ],
    },
    { control: "phone", value: "", isRequired: true },
    { control: "gender", value: gender, isRequired: true },
    { control: "birth_date", value: birthDate, isRequired: true }, // Step 3: Add birth_date control
    // { control: "verify_account", value: "True", isRequired: true }, // Step 3: Add birth_date control
    // { control: "otp", value: "", isRequired: true }, // Step 3: Add birth_date control
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Default to success
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // Reset Snackbar state when it is closed
    setOpenSnackbar(false);
    setSnackbarSeverity("success"); // Reset severity to default
    setSnackbarMessage("");
  };
  const handleSubmit = () => {
    validate().then((output) => {
      if (!output.isOk) return;
      RegisterRequest({
        body: controls,
        onSuccess: (res) => {
          console.log(res);
          setSnackbarSeverity("success");
          setSnackbarMessage(t("Code has been sent!"));
          setOpenSnackbar(true);
        },
        // Handle other cases if needed
      }).then((res) => {
        let response = res?.response?.data;
        console.log(res);
        // Check if the response contains errors
        if (response && response.errors) {
          // Extract error messages and display them in the Snackbar
          const errorMessages = Object.values(response.errors).flat();
          const errorMessage = errorMessages.join(", ");

          // Show error Snackbar
          setSnackbarSeverity("error");
          setSnackbarMessage(errorMessage);
          setOpenSnackbar(true);
        } else {
          setInvalid(response);
        }
      });
    });
  };

  return (
    <Dialog
      open={openRegister}
      onClose={handleCloseRegister}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{}}
      className="gehad"
    >
      <BlackText
        sx={{
          padding: "30px 30px 0 0",
        }}
        id="alert-dialog-title"
      >
        {t("Register for a unique shopping experience")}
      </BlackText>
      <DialogContent
        sx={{ display: "flex", width: "350px", justifyContent: "center" }}
      >
        <FormControl>
          <TextField
            variant="outlined"
            sx={{
              padding: "10.5px 14px !important",
              width: "100%",
            }}
            type="text"
            value={controls?.full_name}
            onChange={(e) => {
              setControl("full_name", e.target.value);
              console.log(e.target.value); // Print the value in the console
            }}
            required={required.includes("full_name")}
            error={Boolean(invalid?.full_name)}
            helperText={invalid?.full_name}
            name="full_name"
            placeholder={t("Full Name")}
          ></TextField>
          <TextField
            variant="outlined"
            sx={{
              padding: "10.5px 14px !important",
              width: "100%",
            }}
            type="text"
            value={controls?.customer_email}
            onChange={(e) => {
              setControl("customer_email", e.target.value);
              console.log(e.target.value); // Print the value in the console
            }}
            required={required.includes("customer_email")}
            error={Boolean(invalid?.customer_email)}
            helperText={invalid?.customer_email}
            name="customer_email"
            placeholder={t("Email address")}
          ></TextField>
          <TextField
            variant="outlined"
            sx={{
              padding: "10.5px 14px !important",
              width: "100%",
            }}
            name="password"
            value={controls?.password}
            onChange={(e) => {
              setControl("password", e.target.value);
              console.log(e.target.value); // Print the value in the console
            }}
            required={required.includes("password")}
            error={Boolean(invalid?.password)}
            helperText={invalid?.password}
            type={showPassword ? "text" : "password"}
            placeholder={t("Password")}
          ></TextField>
          <InputAdornment
            sx={{
              position: "absolute",
              top: "35%",
              left: "0",
              padding: "0",
              transform: "translate(5px, -50%)",
            }}
            position="end"
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ color: "#344054" }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
          <TextField
            variant="outlined"
            sx={{
              padding: "10.5px 14px !important",
              width: "100%",
            }}
            name="phone"
            type="text"
            value={controls?.phone}
            onChange={(e) => {
              setControl("phone", e.target.value);
              console.log(e.target.value); // Print the value in the console
            }}
            required={required.includes("phone")}
            error={Boolean(invalid?.phone)}
            helperText={invalid?.phone}
            placeholder={t("Phone Number")}
          ></TextField>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
              value={gender} // Set the value of the radio group to the state
              onChange={handleGenderChange} // Handle radio button selection changes
              sx={{ flexDirection: "row" }}
            >
              <FormControlLabel
                value="F"
                control={<Radio />}
                label={t("Female")}
                sx={{ marginRight: "0 !important" }}
              />
              <FormControlLabel
                value="M"
                control={<Radio />}
                label={t("Male")}
              />
            </RadioGroup>
          </FormControl>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat={t("dd-MM-yyyy")}
                sx={{
                  maxHeight: "48px !important",
                  width: "90%",
                  margin: "10px 15px",
                }}
                name="birth_date"
                value={birthDate} // Step 4: Set value from birthDate state
                onChange={(date) => {
                  const formattedDate = dayjs(date)
                    .startOf("day")
                    .format("YYYY-MM-DD");
                  setBirthDate(formattedDate); // Step 4: Update birthDate state
                  setControl("birth_date", formattedDate);
                  console.log(formattedDate); // Step 5: Set value in useControls
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    style={datePickerStyles}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Stack spacing={2} sx={{ width: '90%',margin: "30px 15px 0 15px" }}>
                        <Button
                          onClick={handleSubmit}
                          type="button"
                          variant="contained"
                          sx={{
                            bgcolor: theme.palette.primary.dark,
                            color: theme.palette.primary.light,
                            width: "100%",
                            fontFamily: "Cairo",
                            height:'50px'
                          }}
                        >
                          {Boolean(RegisterResponse.isPending)? <CircularProgress/>:t("Sign in")}
                        </Button>
                      </Stack>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRegister;
