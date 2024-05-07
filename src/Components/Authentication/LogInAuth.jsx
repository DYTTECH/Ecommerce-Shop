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
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLogin = ({ openLogin, handleCloseLogin }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch=useDispatch()
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
    successMessage:"تم تسجيل الدخول بنجاح"
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
         dispatch({ type: "userInfo/setToken", payload: res.data.token })
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
        "& .MuiPaper-root": {
          borderRadius: "10px",
          width: "100%",
          height: "66%",
          margin:"auto",
        },
      }}
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
        <FormControl fullWidth sx={{justifyContent:"flex-end",display:"flex",gap:"10px",}}>
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
          }}
          required={required.includes('email')}
          error={Boolean(invalid?.email)}
          helperText={invalid?.email}
            name="email"
            placeholder={t("Email address")}

          />
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
          }}
          required={required.includes('password')}
          error={Boolean(invalid?.password)}
          helperText={invalid?.password}
            type={showPassword ? "text" : "password"}
            placeholder={t("Password")}
          />
          <InputAdornment
            sx={{
              position: "absolute",
              top: "44%",
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
                          {Boolean(LoginResponse.isPending)? <CircularProgress/>:t("Sign in")}
                        </Button>
                      </Stack>
        </FormControl>
      </DialogContent>
      {LoginResponse.failAlert}
      {LoginResponse.successAlert}
    </Dialog>
  );
};

export default AuthLogin;