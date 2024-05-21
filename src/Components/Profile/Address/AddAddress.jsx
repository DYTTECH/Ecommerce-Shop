import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Snackbar,
  Stack,
} from "@mui/material";
import useRequest from "../../../Hooks/useRequest";
import useControls from "../../../Hooks/useControls";
import { BlackText } from "../../../Style/StyledComponents/Typography";
import BASEURL from "../../../Data/API";
import {
  InputField,
  PhoneNumber,
} from "../../../Style/StyledComponents/Inputs";
import { DarkButton } from "../../../Style/StyledComponents/Buttons";

const AddAddress = ({
  openAddAddress,
  handleCloseAddAddress,
  editingAddressId,
}) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));

  const userAddresses = useSelector((state) => state.userAddresses?.value);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [RequestAddAddress, ResponseAddAddress] = useRequest({
    method: "POST",
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
    token: token ? `Token ${token}` : null,
  });

  const [RequestGetAddress, ResponceGetAddress] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
    token: token ? `Token ${token}` : null,
  });

  const [RequestUpdateAddress, ResponceUpdateAddress] = useRequest({
    method: "PATCH",
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/${editingAddressId}/`,
    token: token ? `Token ${token}` : null,
  });

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate },
  ] = useControls([
    { control: "phone", value: "" },
    { control: "name", value: "", isRequired: true },
    { control: "country", value: "", isRequired: true },
    { control: "governorate", value: "", isRequired: true },
    { control: "city", value: "", isRequired: true },
    { control: "address", value: "", isRequired: true },
    { control: "additional_information", value: "", isRequired: true },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setSnackbarSeverity("success");
    setSnackbarMessage("");
  };
  const getUserAddresses = () => {
    RequestGetAddress({
      onSuccess: (res) => {
        dispatch({ type: "address/set", payload: res.data });
      },
    });
  };
  useEffect(() => {
    if (editingAddressId) {
      RequestGetAddress({
        id: editingAddressId,
        onSuccess: (res) => {
          const {
            name,
            additional_information,
            address,
            city,
            governorate,
            country,
            phone,
          } = res.data;
          setControl("name", name);
          setControl("additional_information", additional_information);
          setControl("address", address);
          setControl("city", city);
          setControl("governorate", governorate);
          setControl("country", country);
          setControl("phone", phone);
        },
      });
    } else {
      resetControls();
    }
  }, [editingAddressId]);

  const handleSubmitAddAddress = () => {
    validate().then((output) => {
      if (!output.isOk) return;
      const requestPayload = {
        name: controls.name,
        additional_information: controls.additional_information,
        address: controls.address,
        city: controls.city,
        governorate: controls.governorate,
        country: controls.country,
        phone: controls.phone,
      };

      if (editingAddressId) {
        RequestUpdateAddress({
          body: requestPayload,
          onSuccess: (res) => {
            dispatch({
              type: "address/updateItem",
              payload: { id: editingAddressId, item: res.data },
            });
            handleCloseAddAddress();
            setSnackbarSeverity("success");
            setSnackbarMessage(t("Address Updated Successfully!"));
            setOpenSnackbar(true);
            getUserAddresses();
          },
        });
      } else {
        RequestAddAddress({
          body: requestPayload,
          onSuccess: (res) => {
            dispatch({ type: "address/addItem", payload: res.data });
            handleCloseAddAddress();
            setSnackbarSeverity("success");
            setSnackbarMessage(t("Address Added Successfully!"));
            setOpenSnackbar(true);
            getUserAddresses();
          },
        });
      }
    });
  };

  return (
    <>
      <Dialog
        open={openAddAddress}
        onClose={handleCloseAddAddress}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiPaper-root": {
            borderRadius: "10px",
            width: "50%",
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
              {editingAddressId ? t("Edit Address") : t("New Address")}
            </BlackText>
            <Stack sx={{ gap: 3, mt: 4, px: 2 }}>
              <InputField
                variant="outlined"
                type="text"
                value={controls.name}
                onChange={(e) => setControl("name", e.target.value)}
                required={required.includes("name")}
                error={Boolean(invalid?.name)}
                helperText={invalid?.name}
                name="name"
                placeholder="name"
              />
              {/* <InputField
                variant="outlined"
                name="phone"
                type="text"
                value={controls.phone}
                onChange={(e) => setControl("phone", e.target.value)}
                required={required.includes("phone")}
                error={Boolean(invalid?.phone)}
                helperText={invalid?.phone}
                placeholder="phone number"
              /> */}
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
              <InputField
                variant="outlined"
                sx={{ padding: "10.5px 14px !important", width: "100%" }}
                type="text"
                value={controls.country}
                onChange={(e) => setControl("country", e.target.value)}
                required={required.includes("country")}
                error={Boolean(invalid?.country)}
                helperText={invalid?.country}
                name="country"
                placeholder="country"
              />
              <InputField
                variant="outlined"
                type="text"
                value={controls.governorate}
                onChange={(e) => setControl("governorate", e.target.value)}
                required={required.includes("governorate")}
                error={Boolean(invalid?.governorate)}
                helperText={invalid?.governorate}
                name="governorate"
                placeholder="governorate"
              />
              <InputField
                variant="outlined"
                type="text"
                value={controls.city}
                onChange={(e) => setControl("city", e.target.value)}
                required={required.includes("city")}
                error={Boolean(invalid?.city)}
                helperText={invalid?.city}
                name="city"
                placeholder="city"
              />
              <InputField
                variant="outlined"
                type="text"
                value={controls.address}
                onChange={(e) => setControl("address", e.target.value)}
                required={required.includes("address")}
                error={Boolean(invalid?.address)}
                helperText={invalid?.address}
                name="address"
                placeholder="address"
              />
              <InputField
                variant="outlined"
                type="text"
                value={controls.additional_information}
                onChange={(e) =>
                  setControl("additional_information", e.target.value)
                }
                required={required.includes("additional_information")}
                error={Boolean(invalid?.additional_information)}
                helperText={invalid?.additional_information}
                name="additional_information"
                placeholder="additional information"
              />
            </Stack>
            <DarkButton
              onClick={handleSubmitAddAddress}
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
              {Boolean(ResponseAddAddress.isPending && ResponceUpdateAddress.isPending) ? (
                <CircularProgress />
              ) : (
                t("Save")
              )}
            </DarkButton>
          </Container>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "17rem" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddAddress;
