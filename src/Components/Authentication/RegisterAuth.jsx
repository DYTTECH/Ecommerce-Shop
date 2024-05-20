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
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import "./index.css";
import { DarkButton } from "../../Style/StyledComponents/Buttons";
import { InputField, PhoneNumber } from "../../Style/StyledComponents/Inputs";
import PasswordField from "../Form/PasswordField";
import SendOtp from "./SendOtp";


const AuthRegister = ({ openRegister, handleCloseRegister }) => {
  const { t } = useTranslation()
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const [birthDate, setBirthDate] = useState(null);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
 const hanndleClosePopup=()=>{
  setShowOtpPopup(false)
}
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
    { control: "gender", value: "F", isRequired: true },
    { control: "birth_date", value: "", isRequired: true }, // Step 3: Add birth_date control
  ]);
  const [RegisterRequest, RegisterResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/customer/create/`,
    method: "post",
  });

  const [SendOtpPostRequest, SendOtpPostResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/auth/send-otp/`,
    method: "post",
  });

  const handleSubmit = () => {
    validate().then((output) => {
      if (!output.isOk) return;
      RegisterRequest({
        body: controls,
        onSuccess: (res) => {
          handleCloseRegister();
          SendOtpPostRequest({
            body:{
              email: controls?.customer_email
            },
            onSuccess:(res)=>{
             
              resetControls();
              setShowOtpPopup(true)
            }
          })
         
        },
        
      })
      });
    };


  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={openRegister}
      onClose={handleCloseRegister}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiPaper-root": {
          borderRadius: "10px",
          width: "100%",
          height: "100%",
        },
      }}
    >
      <DialogContent
        sx={{
          padding: "0 !important",
          mt: 4,
        }}
      >
        <Container>
          <BlackText>
            {t("Register for a unique shopping experience")}
          </BlackText>
          <Stack sx={{ gap: 3, mt: 4, px: 2 }}>
            <InputField
              variant="outlined"
              type="text"
              name="full_name"
              placeholder={t("Full Name")}
              value={controls?.full_name}
              onChange={(e) => {
                setControl("full_name", e.target.value);
              }}
              required={required.includes("full_name")}
              error={Boolean(invalid?.full_name)}
              helperText={invalid?.full_name}
            />
            <InputField
              variant="outlined"
              type="text"
              name="customer_email"
              placeholder={t("Email address")}
              value={controls?.customer_email}
              onChange={(e) => {
                setControl("customer_email", e.target.value);
              }}
              required={required?.includes("customer_email")}
              error={Boolean(invalid?.customer_email)}
              helperText={invalid?.customer_email}
            />
            <PasswordField
              name="password"
              placeholder={t("Password")}
              value={controls?.password}
              onChange={(e) => {
                setControl("password", e.target.value);
              }}
              required={required.includes("password")}
              error={Boolean(invalid?.password)}
              helperText={invalid?.password}
            />

            <PhoneNumber
              name="phone"
              placeholder={t("Phone Number")}
              defaultCountry="EG"
              value={controls?.phone}
              onChange={(e) => {
                setControl("phone", e);
              }}
              required={required.includes("phone")}
              error={Boolean(invalid?.phone)}
              helperText={invalid?.phone}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat={t("dd-MM-yyyy")}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    height: "48px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",

                    fontFamily: "Cairo",
                  },
                }}
                name="birth_date"
                value={controls.birth_date} // Step 4: Set value from birthDate state
                onChange={(date) => {
                  const formattedDate = dayjs(date)
                    ?.startOf("day")
                    ?.format("YYYY-MM-DD");
                  
                  setControl("birth_date", formattedDate);
                }}
                renderInput={(params) => (
                  <InputField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
            <FormControl>
              <FormLabel 
              id="demo-row-radio-buttons-group-label"
              sx={{
                fontFamily:"Cairo"
              }}
              >
                {t("Gender")}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={controls?.gender}
                onChange={(e) => {
                  setControl("gender", e.target.value);
                }}
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontFamily: "Cairo",
                  },
                }}
              >
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label={t("Female")}
                />
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label={t("Male")}
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          <DarkButton
            onClick={handleSubmit}
            type="button"
            variant="contained"
            sx={{
              mt: 3,
              width: "100%",
              fontFamily: "Cairo",
              height: "48px",
              borderRadius:"8px"
            }}
          >
            {Boolean(RegisterResponse.isPending) ? (
              <CircularProgress />
            ) : (
              t("Sign in")
            )}
          </DarkButton>
        </Container>
      </DialogContent>
      <SendOtp openOTPDialog={showOtpPopup} handleCloseOTPDialog={()=>hanndleClosePopup()} email={controls?.customer_email}/>
      {RegisterResponse.failAlert}
      {RegisterResponse.successAlert}
    </Dialog>
  );
};

export default AuthRegister;
