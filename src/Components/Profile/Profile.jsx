import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveLayout from "../Layout/Layout";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  GrayText,
  ItemsDes,
  ItemsTitle,
  MainTitle,
} from "../../Style/StyledComponents/Typography";
import HeroTitle from "../Layout/HeroTitle";
import PageMeta from "../Layout/MetaPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import WalletIcon from "@mui/icons-material/Wallet";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import dayjs from "dayjs";
import "dayjs/locale/en";
import useControls from "../../Hooks/useControls";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  tabInfo: { icon: React.ReactNode, name: string }; // Icon component and tab name
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, tabInfo, ...other } = props;
  const { t } = useTranslation();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: "100%", ...tabInfo.style }}>
          {/* Render content based on the tabInfo object */}
          {tabInfo.content.map((contentItem, contentIndex) => (
            <div key={contentIndex}>{contentItem}</div>
          ))}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Profile = () => {
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
  const [value, setValue] = React.useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [gender, setGender] = useState(userDetails?.gender || "");
  const [birthDate, setBirthDate] = useState(userDetails?.birth_date || {});

  //git customer profile
  const [RequestUserInfo, ResponseUserInfo] = useRequest({
    method: "GET",
    path: `${BASEURL}/shop/${shopInfo?.id}/customer/profile/`,
    token: token ? `Token ${token}` : null,
  });
  //update profile
  const [updateRequest, updateResponse] = useRequest({
    path: `${BASEURL}shop/${shopInfo?.id}/customer/profile/`,
    method: "PATCH",
    token: token ? `Token ${token}` : null,
  });

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate, setInvalid },
  ] = useControls([
    { control: "full_name", value: userDetails?.full_name },
    {
      control: "customer_email",
      value: userDetails?.customer_email,
      validations: [
        {
          test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "not valid email",
        },
      ],
    },
    { control: "phone", value: userDetails?.phone },
    { control: "gender", value: gender },
    { control: "birth_date", value: birthDate }, // Step 3: Add birth_date control
  ]);

  const getUserInfo = () => {
    RequestUserInfo({
      onSuccess: (res) => {
        console.log(res);
        dispatch({ type: "userInfo/setUserInfo", payload: res.data });
        setGender(res.data.gender || "");
        setBirthDate(userDetails?.birth_date); // Set the birth_date state
        console.log("Birth Date:", userDetails?.birth_date);
      },
    });
  };
  useEffect(() => {
    getUserInfo();
  }, [shopInfo?.id]);

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
  const formatDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : ""; // Adjust the format as needed
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender); // Update the gender state
    setControl("gender", selectedGender); // Update the control value for useControls
  };

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
      const requestBody = {};

      // Check each field and update the requestBody accordingly
      requestBody.full_name = controls?.full_name || userDetails?.full_name;
      requestBody.customer_email =
        controls?.customer_email || userDetails?.customer_email;
      requestBody.phone = controls?.phone || userDetails?.phone;
      requestBody.gender = gender || userDetails?.gender;
      requestBody.birth_date = birthDate || userDetails?.birth_date;
      updateRequest({
        body: requestBody,
        onSuccess: (res) => {
          console.log(res);
          setSnackbarSeverity("success");
          setSnackbarMessage(t("Data has been modified!"));
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

  const tabInfoArray = [
    {
      icon: <AccountCircle />,
      name: t("MY PROFILE"),
      content: [
        <Box>
          <MainTitle>{t("MY PROFILE")}</MainTitle>
          <Box>
            <FormControl>
              <TextField
                variant="outlined"
                sx={{
                  padding: "10.5px 14px !important",
                  width: "100%",
                }}
                type="text"
                value={controls.full_name || userDetails?.full_name}
                onChange={(e) => {
                  setControl("full_name", e.target.value);
                  console.log(e.target.value); // Print the value in the console
                }}
                // required={required.includes("full_name")}
                error={Boolean(invalid?.full_name)}
                helperText={invalid?.full_name}
                name="full_name"
              ></TextField>
              <TextField
                variant="outlined"
                sx={{
                  padding: "10.5px 14px !important",
                  width: "100%",
                }}
                type="text"
                value={controls?.customer_email || userDetails?.customer_email}
                onChange={(e) => {
                  setControl("customer_email", e.target.value);
                  console.log(e.target.value); // Print the value in the console
                }}
                // required={required.includes("customer_email")}
                error={Boolean(invalid?.customer_email)}
                helperText={invalid?.customer_email}
                name="customer_email"
              ></TextField>

              <TextField
                variant="outlined"
                sx={{
                  padding: "10.5px 14px !important",
                  width: "100%",
                }}
                name="phone"
                type="text"
                value={controls?.phone || userDetails?.phone}
                onChange={(e) => {
                  setControl("phone", e.target.value);
                  console.log(e.target.value); // Print the value in the console
                }}
                // required={required.includes("phone")}
                error={Boolean(invalid?.phone)}
                helperText={invalid?.phone}
              ></TextField>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  sx={{ flexDirection: "row" }}
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
              <Box>
                <TextField
                  variant="outlined"
                  sx={{
                    padding: "10.5px 14px !important",
                    width: "100%",
                  }}
                  name="phone"
                  type="text"
                  value={userDetails?.birth_date}
                  onFocus={() => setShowDatePicker(true)} // Show date picker when input is focused
                ></TextField>
                {showDatePicker && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat={t("dd-MM-yyyy")}
                      sx={{
                        maxHeight: "48px !important",
                        width: "90%",
                        margin: "10px 15px",
                      }}
                      name="birth_date"
                      value={formatDate(birthDate)} 
                      onChange={(date) => {
                        const formattedDate = dayjs(date)
                          .startOf("day")
                          .format("YYYY-MM-DD");
                        setBirthDate(formattedDate); // Step 4: Update birthDate state
                        setControl("birth_date", formattedDate);
                        console.log(formattedDate); // Step 5: Set value in useControls
                        setShowDatePicker(false); // Hide date picker after selection
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
                )}
              </Box>

              <Stack spacing={2} sx={{ width: "90%", margin: "30px 15px" }}>
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
                  {t("Save")}
                </Button>
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                >
                  <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </Stack>
            </FormControl>
          </Box>
        </Box>,
      ],
    },
    {
      icon: <WalletIcon />,
      name: t("REFER & EARN"),
      content: [<Typography>Refer & Earn content</Typography>],
    },
    { icon: <ListAltIcon />, name: t("MY ORDERS") },
    { icon: <RotateLeftIcon />, name: t("MY RETURN/EXCHANGE") },
    { icon: <FavoriteBorderOutlinedIcon />, name: t("MY WISHLIST") },
    { icon: <LocationOnIcon />, name: t("MY ADDRESS BOOK") },
    { icon: <CreditCardIcon />, name: t("PAYMENTS") },
    { icon: <LogoutIcon />, name: t("LOGOUT") },
    // Add more tab info objects as needed
  ];

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
        <Box
          sx={{
            pr: 5,
            mb: 2,
          }}
        >
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
              overflowY: "hidden",
            }}
          >
            <Grid lg={4} md={4} xs={12} sm={12}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", height: "100%" }}
              >
                {tabInfoArray.map((tabInfo, index) => (
                  <Tab
                    label={
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>{tabInfo.icon}</Grid>
                        <Grid item>{t(tabInfo.name)}</Grid>
                        <Grid item>
                          <ArrowBackIosNewIcon />
                        </Grid>
                      </Grid>
                    }
                    {...a11yProps(index)}
                    key={index}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid lg={4} md={4} xs={12} sm={12}>
              {tabInfoArray.map((tabInfo, index) => (
                <TabPanel
                  value={value}
                  index={index}
                  key={index}
                  tabInfo={tabInfo}
                >
                  {t(tabInfo.name)} content
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default Profile;

