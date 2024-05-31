import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, IconButton, Radio } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useRequest from "../../../Hooks/useRequest";
import BASEURL from "../../../Data/API";
import { ItemsDes, ItemsTitle, MainTitle } from "../../../Style/StyledComponents/Typography";
import AddAddress from "./AddAddress"; // Import AddAddress component

const ViewAddress = ({value,type}) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const userAddresses = useSelector((state) => state.address.value);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
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

  
  return (
    <Container maxWidth="xl">
      <Box>
        {/* <MainTitle sx={{ mb: 4 }}>{t("MY ADDRESS BOOK")}</MainTitle>
        <Divider /> */}
        {userAddresses?.length > 0 ? (
          userAddresses?.map((address, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 3, alignItems: 'center' }}>
              <Grid item xs={8} sx={{ bgcolor: theme.palette.primary.mainLight, borderRadius: '7px', p: 2 }}>
             {type==="checkout"&&(
               <Radio
               checked={value}
               // onChange={handleChange}
               value={address?.id}
               name="radio-buttons"
               inputProps={{ 'aria-label': 'B' }}
             />
             )}
             
               <Box>
                  <ItemsTitle>{address.name}</ItemsTitle>
                  <ItemsTitle>{address.address}</ItemsTitle>
                  <ItemsTitle>{address.phone}</ItemsTitle>
                  <Box sx={{ display: 'flex' }}>
                    <ItemsTitle>{address.country}&nbsp;,&nbsp;</ItemsTitle>
                    <ItemsTitle>{address.governorate}&nbsp;,&nbsp;</ItemsTitle>
                    <ItemsTitle>{address.city}</ItemsTitle>
                  </Box>
                  <ItemsTitle>{address.additional_information}</ItemsTitle>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={() => handleDeleteAddress(address.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleClickOpenAddAddress(address.id)}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))
        ) : (
          <ItemsDes sx={{ pt: 3 }}>
            {t("You have no configured addresses.")}
          </ItemsDes>
        )}
        <AddAddress
          openAddAddress={openAddAddress}
          handleCloseAddAddress={handleCloseAddAddress}
          editingAddressId={editingAddressId}
        />
      </Box>
      {ResponseDeleteAddress.failAlert}
      {ResponseDeleteAddress.successAlert}
    </Container>
  );
};

export default ViewAddress;
