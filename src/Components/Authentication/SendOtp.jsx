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
import OTPInput from "react-otp-input";
import { DarkButton } from "../../Style/StyledComponents/Buttons";

const SendOtp = ({ openOTPDialog, handleCloseOTPDialog ,email}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));

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
          email: email,
          verify_account: true,
          otp: controls.otp,
        },
        onSuccess: (res) => {
          handleCloseOTPDialog();
          window.location.reload()
        },
        // Handle other cases if needed
      })
     
    });
  };
console.log(controls.otp);
  return (
    <>
      <Dialog
      maxWidth='xs'
      fullWidth
        open={openOTPDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{}}
      >
        
        <DialogContent>
          <BlackText>
            {t("Enter your OTP")}
          </BlackText>
        <Stack gap={4} sx={{ width: "90%", margin: "30px 15px",alignItems:"center",justifyContent:"center" }}>
          <OTPInput
      value={controls.otp}
      onChange={
        (e)=>setControl("otp",e)
      }
      numInputs={6}
      renderSeparator={<span style={{minWidth:"12px"}}></span>}
      renderInput={(props) => <input {...props} 
      style={{
        width: "100%",
        height: "48px",
        borderRadius: "8px",
        padding: "10px 12px",
        border: "1px solid #ccc",
        fontSize: "16px",
        fontFamily: "Cairo",
        textAlign:"center",
        
      }}
      />}
    />
            
            
              <DarkButton
                onClick={handleSubmitOtp}
               
                variant="contained"
                sx={{
                  
                  width: "100%",
                  borderRadius:"8px",
                  fontFamily:"Cairo",
                  mt:2
                }}
              >
                {t("Send code")}
              </DarkButton>
            </Stack>
         
          
        </DialogContent>
        {VerfiyOtpResponse.failAlert}
        {VerfiyOtpResponse.successAlert}
      </Dialog>
    </>
  );
};

export default SendOtp;
