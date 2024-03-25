import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import "./index.css";
import {
  BlackText,
  DarkText,
} from "../../Style/StyledComponents/Typography";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import useControls from "../../Hooks/useControls";

const AuthLogin = ({ openLogin, handleCloseLogin }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [LoginRequest, LoginResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/customer/login/`,
    method: "post",
  });

  

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate, setInvalid },
  ] = useControls([
    {
      control: "email",
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
  ]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Default to success
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // Reset Snackbar state when it is closed
    setOpenSnackbar(false);
    setSnackbarSeverity('success'); // Reset severity to default
    setSnackbarMessage('');
  };
  const handleSubmit = () => {
    validate().then((output) => {
      if (!output.isOk) return;
  
      LoginRequest({
        body: controls,
        onSuccess: (res) => {
          LoginRequest({
            body: controls.email,
            onSuccess:(res) =>{
              
            }
          })
          
          // resetControls();
          // console.log(res);
          // // Show success Snackbar
          // setSnackbarSeverity("success");
          // setSnackbarMessage("تم إرسال الرسالة !");
          // setOpenSnackbar(true);
        },
        // Handle other cases if needed
      }).then((res) => {
        let response = res?.response?.data;
  
        // Check if the response contains errors
        if (response && response.errors) {
          // Extract error messages and display them in the Snackbar
          const errorMessages = Object.values(response.errors).flat();
          const errorMessage = errorMessages.join(', ');
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
      open={openLogin}
      onClose={handleCloseLogin}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BlackText
        sx={{
          padding: "30px 30px 0 0",
        }}
        id="alert-dialog-title"
      >
        {t("You already have account?")}
      </BlackText>
      <DialogContent>
        <FormControl>
        <TextField
            variant="outlined"
            sx={{
              padding: "10.5px 14px !important",
              width: "100%",
            }}
            type="text"
          value={controls?.email}
          onChange={(e) => {
            setControl('email', e.target.value);
            console.log(e.target.value); // Print the value in the console
          }}
          required={required.includes('email')}
          error={Boolean(invalid?.email)}
          helperText={invalid?.email}
            name="email"
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
            setControl('password', e.target.value);
            console.log(e.target.value); // Print the value in the console
          }}
          required={required.includes('password')}
          error={Boolean(invalid?.password)}
          helperText={invalid?.password}
            type={showPassword ? "text" : "password"}
            placeholder={t("Password")}
          ></TextField>
          <InputAdornment
            sx={{
              position: "absolute",
              top: "38.5%",
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="checked"
                  color="primary"
                  sx={{ padding: " 0 0 0 10px" }}
                />
              }
              label={t("Remember me")}
              sx={{ fontFamily: "Cairo !important" }}
            />
            <DarkText
              variant="subtitle1"
              color="secondary"
              sx={{
                cursor: "pointer",
                paddingLeft: "15px",
              }}
              // onClick={()=>navigate("/authentication/forget-password")}
            >
              {t("Forget Password")}
            </DarkText>
          </Box>
          <Stack spacing={2} sx={{ width: '90%',margin: "30px 15px" }}>
                        <Button
                          onClick={() => {
                            handleSubmit();
                            handleClick();
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
                          {t("Sign in")}
                        </Button>
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                          </Alert>
                        </Snackbar>
                      </Stack>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default AuthLogin;
