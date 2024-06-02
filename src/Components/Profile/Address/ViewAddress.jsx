import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useRequest from "../../../Hooks/useRequest";
import BASEURL from "../../../Data/API";
import {
  ItemsDes,
  ItemsTitle,
  MainTitle,
} from "../../../Style/StyledComponents/Typography";
import AddAddress from "./AddAddress"; // Import AddAddress component

const ViewAddress = ({ selectedAddressId, setSelectedAddressId }) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const userAddresses = useSelector((state) => state.address?.value);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

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

  const [RequestGetAddresses, ResponseGetAddresses] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
    token: token ? `Token ${token}` : null,
  });

  const [RequestDeleteAddress, ResponseDeleteAddress] = useRequest({
    method: "delete",
    path: `${BASEURL}shop/${shopInfo?.id}/customers/addresses/`,
    token: token ? `Token ${token}` : null,
  });

  const getUserAddresses = () => {
    RequestGetAddresses({
      onSuccess: (res) => {
        dispatch({ type: "address/set", payload: res.data });
      },
    });
  };

  const handleDeleteAddress = (addressId) => {
    RequestDeleteAddress({
      id: addressId,
      onSuccess: () => {
        dispatch({ type: "address/deleteItem", payload: { id: addressId } });
        getUserAddresses();
        setSnackbarSeverity("success");
        setSnackbarMessage(t("Address Deleted Successfully!"));
        setOpenSnackbar(true);
      },
    });
  };

  useEffect(() => {
    getUserAddresses();
  }, []);

  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
    setEditingAddressId(null);
  };
  const handleClickOpenAddAddress = (addressId) => {
    setEditingAddressId(addressId);
    setOpenAddAddress(true);
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };
  return (
    <Container maxWidth="xl">
      <Box>
        {/* <MainTitle sx={{ mb: 4 }}>{t("MY ADDRESS BOOK")}</MainTitle>
        <Divider /> */}
        {userAddresses?.length > 0 ? (
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={userAddresses[0].id} // Set default value to the first address
              name="radio-buttons-group"
            >
              {userAddresses.map((address, index) => (
                <FormControlLabel
                  key={index}
                  value={address.id}
                  onClick={() => handleSelectAddress(address.id)}
                  control={<Radio />}
                  label={
                    <Grid
                      container
                      spacing={2}
                      sx={{ mt: 3, alignItems: "center" }}
                    >
                      <Grid
                        item
                        xs={8}
                        sx={{
                          bgcolor: theme.palette.primary.mainLight,
                          borderRadius: "7px",
                          p: 2,
                        }}
                      >
                        <Box>
                          <ItemsTitle>{address.name}</ItemsTitle>
                          <ItemsTitle>{address.address}</ItemsTitle>
                          <ItemsTitle>{address.phone}</ItemsTitle>
                          <Box sx={{ display: "flex" }}>
                            <ItemsTitle>
                              {address.country}&nbsp;,&nbsp;
                            </ItemsTitle>
                            <ItemsTitle>
                              {address.governorate}&nbsp;,&nbsp;
                            </ItemsTitle>
                            <ItemsTitle>{address.city}</ItemsTitle>
                          </Box>
                          <ItemsTitle>
                            {address.additional_information}
                          </ItemsTitle>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <IconButton
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleClickOpenAddAddress(address.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        ) : (
          <ItemsDes sx={{ pt: 3 }}>
            {t("You have no configured addresses.")}
          </ItemsDes>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "16rem" }}
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <AddAddress
          openAddAddress={openAddAddress}
          handleCloseAddAddress={handleCloseAddAddress}
          editingAddressId={editingAddressId}
        />
      </Box>
    </Container>
  );
};

export default ViewAddress;
