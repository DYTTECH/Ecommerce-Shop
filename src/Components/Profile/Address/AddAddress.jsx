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
import filter from "../../../utlis/ClearNull";
import compare from "../../../utlis/compare";

const AddAddress = ({
  openAddAddress,
  handleCloseAddAddress,
  editingAddressId,
}) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
const [address,setAddress]=useState({})
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
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
    token: token ? `Token ${token}` : null,
  });

  const [
    { controls, invalid, required },
    { setControl, resetControls, validate },
  ] = useControls([
    { control: "phone", value:address?.phone|| "" },
    { control: "name", value:address?.name|| "", isRequired: true },
    { control: "country", value:address?.country|| "", isRequired: true },
    { control: "governorate", value:address?.governorate|| "", isRequired: true },
    { control: "city", value:address?.city|| "", isRequired: true },
    { control: "address", value:address?.address|| "", isRequired: true },
    { control: "additional_information", value:address?.additional_information|| "", isRequired: false },
  ],[address]);


  useEffect(() => {
    if (editingAddressId) {
      RequestGetAddress({
        id: editingAddressId,
        onSuccess: (res) => {
          setAddress(res?.data)
          // Object.keys(res.data).map((address)=>(
          //   setControl(address,res.data[address])
          // ))
        },
      });
    } else {
      resetControls();
    }
  }, [editingAddressId]);
console.log(editingAddressId);
const handleSubmitAddAddress = (e) => {
    e.preventDefault();
       if (editingAddressId) {
        const isThereChange = compare(
          [
            [controls.name, address?.name, "name"],
            [controls.phone, address?.phone, "phone"],
            [controls.address, address?.address, "address"],
            [controls.city, address?.city, "city"],
            [controls.governorate, address?.governorate, "governorate"],
            [controls.country, address?.country, "country"],
            [controls.additional_information, address?.additional_information, "additional_information"],
          ],
          false
        );
        if (isThereChange.nochange) {
          const requestBody = filter({
            obj: {
              name: isThereChange.array["name"],
              phone: isThereChange.array["phone"],
              address:isThereChange.array["address"],
              city: isThereChange.array["city"],
              governorate: isThereChange.array["governorate"],
              country: isThereChange.array["country"],
              additional_information: isThereChange.array["additional_information"],
            },
            output: "object",
          });

          RequestUpdateAddress({
            id: editingAddressId,
            body: requestBody,
            onSuccess: (res) => {
              dispatch({ type: "address/patchItem", payload: {id:editingAddressId,item:res.data} });
              handleCloseAddAddress();
            },
          });
        }
       } 
      else {
        RequestAddAddress({
          body: {
            name: controls.name,
            additional_information: controls.additional_information,
            address: controls.address,
            city: controls.city,
            governorate: controls.governorate,
            country: controls.country,
            phone: controls.phone,
          },
          onSuccess: (res) => {
            dispatch({ type: "address/addItem", payload: res?.data });
            handleCloseAddAddress();
          },
        });
      }
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
              {Boolean(editingAddressId? ResponceUpdateAddress.isPending: ResponseAddAddress.isPending) ? (
                <CircularProgress />
              ) : (
                t("Save")
              )}
            </DarkButton>
          </Container>
        </DialogContent>
      </Dialog>
     
    </>
  );
};

export default AddAddress;
