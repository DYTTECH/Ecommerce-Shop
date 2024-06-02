import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { BlackText, DarkText } from "../../Style/StyledComponents/Typography";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import useControls from "../../Hooks/useControls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../Style/StyledComponents/Inputs";
import { DarkButton } from "../../Style/StyledComponents/Buttons";
import PasswordField from "../Form/PasswordField";

const AuthLogin = ({ openLogin, handleCloseLogin }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [LoginRequest, LoginResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/customer/login/`,
    method: "post",
    successMessage: "تم تسجيل الدخول بنجاح",
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

  const handleSubmit = () => {
    validate().then((output) => {
      if (!output.isOk) return;

      LoginRequest({
        body: controls,
        onSuccess: (res) => {
          dispatch({ type: "userInfo/setToken", payload: res.data.token });
          handleCloseLogin();
          resetControls();
          navigate(`/t2/${shopInfo.sub_domain}/`);
          window.location.reload();
        },
        // Handle other cases if needed
      });
    });
  };
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={openLogin}
      onClose={handleCloseLogin}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiPaper-root": {
          borderRadius: "10px",
          width: "100%",
          height: "55%",
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
          <BlackText>{t("You already have account?")}</BlackText>
          <Stack sx={{ gap: 3, mt: 4, px: 2 }}>
          <InputField
              variant="outlined"
              type="text"
              name="customer_email"
              placeholder={t("Email address")}
              value={controls?.email}
              onChange={(e) => {
                setControl("email", e.target.value);
              }}
              required={required?.includes("email")}
              error={Boolean(invalid?.email)}
              helperText={invalid?.email}
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
              <BlackText
                variant="subtitle1"
                color="secondary"
                sx={{
                  cursor: "pointer",
                  paddingLeft: "15px",
                }}
                // onClick={()=>navigate("/authentication/forget-password")}
              >
                {t("Forget Password")}
              </BlackText>
            </Box>
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
              borderRadius: "8px",
            }}
          >
            {Boolean(LoginResponse.isPending) ? (
              <CircularProgress />
            ) : (
              t("Sign in")
            )}
          </DarkButton>
        </Container>
      </DialogContent>

      {LoginResponse.failAlert}
      {LoginResponse.successAlert}
    </Dialog>
  );
};

export default AuthLogin;
