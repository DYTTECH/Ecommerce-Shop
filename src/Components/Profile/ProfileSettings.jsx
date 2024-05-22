import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import useControls from "../../Hooks/useControls";
import dayjs from "dayjs";
import "dayjs/locale/en";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { GrayText, MainTitle } from "../../Style/StyledComponents/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProfileSidBar from "./ProfileSidBar";
import ResponsiveLayout from "../Layout/Layout";
import PageMeta from "../Layout/MetaPage";
import HeroTitle from "../Layout/HeroTitle";
import { InputField, PhoneNumber } from "../../Style/StyledComponents/Inputs";
import { DarkButton } from "../../Style/StyledComponents/Buttons";

const ProfileSettings = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const userDetails = useSelector((state) => state.userInfo.value);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
  ];

  const [gender, setGender] = useState(userDetails?.gender || "");
  const [birthDate, setBirthDate] = useState(userDetails?.birth_date || "");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [RequestUserInfo, ResponseUserInfo] = useRequest({
    method: "GET",
    path: `${BASEURL}/shop/${shopInfo?.id}/customer/profile/`,
    token: token ? `Token ${token}` : null,
  });

  const [updateRequest, updateResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/customer/profile/`,
    method: "PATCH",
    token: token ? `Token ${token}` : null,
  });

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate, setInvalid },
  ] = useControls([
    { control: "full_name", value: userDetails?.full_name || "" },
    {
      control: "customer_email",
      value: userDetails?.customer_email || "",
      validations: [
        {
          test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "not valid email",
        },
      ],
    },
    { control: "phone", value: userDetails?.phone || "" },
    { control: "gender", value: gender },
    { control: "birth_date", value: birthDate },
  ]);

  const getUserInfo = () => {
    RequestUserInfo({
      onSuccess: (res) => {
        dispatch({ type: "userInfo/setUserInfo", payload: res.data });
        setGender(res.data.gender || "");
        setBirthDate(res.data.birth_date || "");
      },
    });
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : "";
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    setControl("gender", selectedGender);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setSnackbarSeverity("success");
    setSnackbarMessage("");
  };

  const handleSubmitUpdateProfile = () => {
    validate().then((output) => {
      if (!output.isOk) return;
      const requestBody = {
        full_name: controls?.full_name || userDetails?.full_name,
        customer_email: controls?.customer_email || userDetails?.customer_email,
        phone: controls?.phone || userDetails?.phone,
        gender: gender || userDetails?.gender,
        birth_date: birthDate || userDetails?.birth_date,
      };
      updateRequest({
        body: requestBody,
        onSuccess: (res) => {
          setSnackbarSeverity("success");
          setSnackbarMessage(t("Data has been modified!"));
          setOpenSnackbar(true);
        },
      }).then((res) => {
        const response = res?.response?.data;
        if (response && response.errors) {
          const errorMessages = Object.values(response.errors).flat();
          const errorMessage = errorMessages.join(", ");
          setSnackbarSeverity("error");
          setSnackbarMessage(errorMessage);
          setOpenSnackbar(true);
        } else {
          setInvalid(response);
        }
      });
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("My Cart")}`}
        desc="Description of my page for SEO"
        name={shopInfo?.full_name}
        type={shopInfo?.shop_type_name}
        image={shopInfo?.logo}
      />
      <Box sx={{ marginY: { lg: "90px", md: 2, sm: 2, xs: 2 } }}>
        <Box sx={{ pr: 5, mb: 2 }}>
          <GrayText>
            <HeroTitle crumbs={crumbs} />
          </GrayText>
        </Box>
        <Divider />
        <Container
          maxWidth="xl"
          sx={{ marginTop: { lg: "69px", md: "0", sm: "0", xs: "0" } }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Grid
              className="GridItem"
              lg={4}
              md={4}
              xs={12}
              sm={12}
              sx={{ paddingLeft: "50px" }}
            >
              <ProfileSidBar />
            </Grid>
            <Grid lg={8} md={4} xs={12} sm={12}>
              <Stack sx={{ gap: 3, mt: 4, px: 2 }}>
                <MainTitle>{t("MY PROFILE")}</MainTitle>
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
                <FormControl>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{ fontFamily: "Cairo" }}
                  >
                    {t("Gender")}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={controls?.gender}
                    onChange={handleGenderChange}
                    sx={{
                      ".MuiFormControlLabel-label": { fontFamily: "Cairo" },
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="YYYY-MM-DD"
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
                    value={birthDate ? dayjs(birthDate) : null}
                    onChange={(date) => {
                      const formattedDate = date
                        ? dayjs(date).format("YYYY-MM-DD")
                        : "";
                      setBirthDate(formattedDate);
                      setControl("birth_date", formattedDate);
                    }}
                    renderInput={(params) => (
                      <InputField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
                <DarkButton
                  onClick={handleSubmitUpdateProfile}
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
                  {Boolean(updateResponse.isPending) ? (
                    <CircularProgress />
                  ) : (
                    t("Save")
                  )}
                </DarkButton>
              </Stack>
            </Grid>
          </Grid>
        </Container>
        {updateResponse.failAlert}
        {updateResponse.successAlert}
      </Box>
    </ResponsiveLayout>
  );
};

export default ProfileSettings;
