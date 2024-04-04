import * as React from "react";
import { useState } from "react"; // Step 1: Import useState
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  Stack,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import BASEURL from "../../Data/API";
import useRequest from "../../Hooks/useRequest";
import useControls from "../../Hooks/useControls";
import { BlackText } from "../../Style/StyledComponents/Typography";
import CloseIcon from "@mui/icons-material/Close";

const SendOtp = ({ openOTPDialog, handleCloseOTPDialog }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const otpMessage = localStorage.getItem("otpMessage");


  const [VerfiyOtpRequest, VerfiyOtpResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/auth/verify-otp/`,
    method: "post",
  });

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate, setInvalid },
  ] = useControls([
    { control: "otp", value: "", isRequired: true }, // Step 3: Add birth_date control
  ]);

  const handleSubmitOtp = () => {
    validate().then((output) => {
      if (!output.isOk) return;
      VerfiyOtpRequest({
        body: {
          email: localStorage.getItem("email"),
          verify_account: true,
          otp: controls.otp,
        },
        onSuccess: (res) => {
          console.log(res);
          localStorage.removeItem("otpMessage");
          localStorage.removeItem("email");

          // Close the OTP dialog if needed or navigate the user elsewhere
          handleCloseOTPDialog();
        },
        // Handle other cases if needed
      }).then((res) => {
        let response = res?.response?.data;
        console.log(res);
      });
    });
  };

  return (
    <>
      <Dialog
        open={openOTPDialog}
        onClose={handleCloseOTPDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{}}
      >
        <BlackText
          sx={{
            padding: "30px 30px 0 0",
          }}
          id="alert-dialog-title"
        >
          {otpMessage}
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
              value={controls?.otp}
              onChange={(e) => {
                setControl("otp", e.target.value);
                console.log(e.target.value); // Print the value in the console
              }}
              required={required.includes("otp")}
              error={Boolean(invalid?.otp)}
              helperText={invalid?.otp}
              name="otp"
              placeholder={t("OTP Code")}
            ></TextField>
            <Stack spacing={2} sx={{ width: "90%", margin: "30px 15px" }}>
              <Button
                onClick={() => {
                  handleSubmitOtp();
                }}
                type="button"
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.dark,
                  color: theme.palette.primary.light,
                  width: "100%",
                  fontFamily: "Cairo",
                }}
              >
                {t("Send Code")}
              </Button>
            </Stack>
          </FormControl>
          <Box sx={{ p: 4, cursor: "pointer" }} onClick={handleCloseOTPDialog}>
          <CloseIcon />
        </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SendOtp;
