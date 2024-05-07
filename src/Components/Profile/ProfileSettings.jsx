import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import useControls from "../../Hooks/useControls";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { MainTitle } from "../../Style/StyledComponents/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

  const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of date picker
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
    { control: "phone", value: "" },
    { control: "gender", value: gender },
    { control: "birth_date", value: birthDate },
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // Reset Snackbar state when it is closed
    setOpenSnackbar(false);
    setSnackbarSeverity("success"); // Reset severity to default
    setSnackbarMessage("");
  };

  const handleSubmitUpdateProfile = () => {
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

  useEffect(() => {
    // Fetch user info when component mounts
    getUserInfo();
  }, []); // Run only once on component mount

  return (
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
                handleSubmitUpdateProfile();
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
    </Box>
  );
};

export default ProfileSettings;
