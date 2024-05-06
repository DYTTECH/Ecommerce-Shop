import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import useControls from "../../Hooks/useControls";
import { Alert, Box, Button, Divider, FormControl, Grid, Snackbar, Stack, TextField } from "@mui/material";
import { ItemsDes, ItemsTitle, MainTitle } from "../../Style/StyledComponents/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Address = () => {

    const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const userAddresses = JSON.parse(localStorage.getItem("userAddresses"));
  const userAddressesRedux = useSelector((state) => state.userAddresses?.value);

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
    const [openAddressDialog, setOpenAddressDialog] = useState(false);

  const handleClickOpenAddreesDialog = () => {
    setOpenAddressDialog(true); // Set openAddressDialog to true
  };

  const handleCloseAddressDialog = () => {
    setOpenAddressDialog(false);
  };
  

    const [RequestAddAddress, ResponseAddAddress] = useRequest({
        method: "POST",
        path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
        token: token ? `Token ${token}` : null,
      });
      const [RequestGetAddresses, ResponseGetAddresses] = useRequest({
        method: "GET",
        path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
        token: token ? `Token ${token}` : null,
      });
    
      const [
        { controls, invalid, required },
        { setControl, resetControls, validate, setInvalid },
      ] = useControls([
        { control: "phone", value: "" },
        { control: "name", value: "", isRequired: true },
        { control: "country", value: "", isRequired: true },
        { control: "governorate", value: "", isRequired: true },
        { control: "city", value: "", isRequired: true },
        { control: "address", value: "", isRequired: true },
        { control: "additional_information", value: "", isRequired: true },
      ]);
    
      
      const getUserAddresses = () => {
        RequestGetAddresses({
          onSuccess: (res) => {
            console.log(res);
            dispatch({ type: "userInfo/setUserAddresses", payload: res.data });
            console.log(res);
          },
        });
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

    const handleSubmitAddAddress = () => {
        validate().then((output) => {
          if (!output.isOk) return;
          RequestAddAddress({
            body: {
              name: controls?.name,
              additional_information: controls?.additional_information,
              address: controls?.address,
              city: controls?.city,
              governorate: controls?.governorate,
              country: controls?.country,
              phone: controls?.phone,
            },
            onSuccess: (res) => {
              console.log(res);
              setSnackbarSeverity("success");
              setSnackbarMessage(t("Address Added Succefully!"));
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
        getUserAddresses();
      }, []);
    return(
        <Box>
          <MainTitle sx={{mb:4}}>{t("MY ADDRESS BOOK")}</MainTitle>
          <Divider />
          {Object.values(userAddresses).length > 0 ? (
            Object.values(userAddresses)?.map((address, index) => (
                <Grid container spacing={2} key={index} sx={{mt:3, alignItems:'center'}}>
                  <Grid item xs={8} sx={{bgcolor:theme.palette.primary.mainLight, borderRadius:'7px', p:2}}>
                    <Box>
                      <ItemsTitle>{address.name}</ItemsTitle>
                      <ItemsTitle>{address.address}</ItemsTitle>
                      <ItemsTitle>{address.phone}</ItemsTitle>
                      <Box sx={{display:'flex'}}>
                      <ItemsTitle>{address.country}&nbsp;,&nbsp;</ItemsTitle>
                      <ItemsTitle>{address.governorate}&nbsp;,&nbsp;</ItemsTitle>
                      <ItemsTitle>{address.city}</ItemsTitle>
                      </Box>
                      <ItemsTitle>{address.additional_information}</ItemsTitle>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sx={{display:'flex', justifyContent:'center'}}>
                    <EditIcon sx={{ml:3}} /> <DeleteIcon />
                  </Grid>
                </Grid>
            ))
          ) : (
            <ItemsDes sx={{ pt: 3 }}>
              {t("You have no configured addresses.")}
            </ItemsDes>
          )}

          <Box
            sx={{
              width: "100%",
              mt: 4,
            }}
          >
            <Button
              onClick={handleClickOpenAddreesDialog} // Add onClick handler
              type="button"
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.dark,
                color: theme.palette.primary.light,
                fontFamily: "Cairo",
                width: { sm: "30%", xs: "100%" },
              }}
            >
              {t("Add New Address")}
            </Button>
          </Box>

          {openAddressDialog && (
            <Box onClose={handleCloseAddressDialog} open={openAddressDialog}>
              <Divider sx={{ mt: 5 }} />
              <MainTitle sx={{ pt: 3 }}>{t("New Address")}</MainTitle>

              <FormControl>
                <Box sx={{ width: "100%", disaplay: "flex" }}>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: { sm: "50%", xs: "100%" },
                    }}
                    type="text"
                    value={controls.name}
                    onChange={(e) => {
                      setControl("name", e.target.value);
                      console.log(e.target.value); // Print the value in the console
                    }}
                    required={required.includes("name")}
                    error={Boolean(invalid?.name)}
                    helperText={invalid?.name}
                    name="name"
                    placeholder="name"
                  ></TextField>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: { sm: "50%", xs: "100%" },
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
                    placeholder="phone number"
                  ></TextField>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: { sm: "50%", xs: "100%" },
                    }}
                    type="text"
                    value={controls?.country}
                    onChange={(e) => {
                      setControl("country", e.target.value);
                      console.log(e.target.value); // Print the value in the console
                    }}
                    required={required.includes("country")}
                    error={Boolean(invalid?.country)}
                    helperText={invalid?.country}
                    name="country"
                    placeholder="country"
                  ></TextField>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: { sm: "50%", xs: "100%" },
                    }}
                    type="text"
                    value={controls?.governorate}
                    onChange={(e) => {
                      setControl("governorate", e.target.value);
                      console.log(e.target.value); // Print the value in the console
                    }}
                    required={required.includes("governorate")}
                    error={Boolean(invalid?.governorate)}
                    helperText={invalid?.governorate}
                    name="governorate"
                    placeholder="governorate"
                  ></TextField>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: { sm: "50%", xs: "100%" },
                    }}
                    type="text"
                    value={controls?.city}
                    onChange={(e) => {
                      setControl("city", e.target.value);
                      console.log(e.target.value); // Print the value in the console
                    }}
                    required={required.includes("city")}
                    error={Boolean(invalid?.city)}
                    helperText={invalid?.city}
                    name="city"
                    placeholder="city"
                  ></TextField>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: { sm: "50%", xs: "100%" },
                    }}
                    type="text"
                    value={controls?.address}
                    onChange={(e) => {
                      setControl("address", e.target.value);
                      console.log(e.target.value); // Print the value in the console
                    }}
                    required={required.includes("address")}
                    error={Boolean(invalid?.address)}
                    helperText={invalid?.address}
                    name="address"
                    placeholder="address"
                  ></TextField>
                  <TextField
                    variant="outlined"
                    sx={{
                      padding: "10.5px 14px !important",
                      width: "100%",
                    }}
                    type="text"
                    value={controls?.additional_information}
                    onChange={(e) => {
                      setControl("additional_information", e.target.value);
                      console.log(e.target.value); // Print the value in the console
                    }}
                    required={required.includes("additional_information")}
                    error={Boolean(invalid?.additional_information)}
                    helperText={invalid?.additional_information}
                    name="additional_information"
                    placeholder="additional information"
                  ></TextField>
                  <Stack spacing={2} sx={{ width: "90%", margin: "30px 15px" }}>
                    <Button
                      onClick={() => {
                        handleSubmitAddAddress();
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
                </Box>
              </FormControl>
            </Box>
          )}
        </Box>

    )
}

export default Address