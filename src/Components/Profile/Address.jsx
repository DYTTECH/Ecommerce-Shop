import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import useControls from "../../Hooks/useControls";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import {
  GrayText,
  ItemsDes,
  ItemsTitle,
  MainTitle,
} from "../../Style/StyledComponents/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ResponsiveLayout from "../Layout/Layout";
import PageMeta from "../Layout/MetaPage";
import HeroTitle from "../Layout/HeroTitle";
import ProfileSidBar from "./ProfileSidBar";
import ViewAddress from "./Address/ViewAddress";
import AddAddress from "./Address/AddAddress";

const Address = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const { t } = useTranslation();
  const theme = useTheme();
  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
    { label: `${t("MY ADDRESS BOOK")}`, active: false },
  ];

  const [openAddAddress, setOpenAddAddress] = useState(false);

  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
  };
  const handleClickOpenAddAddress = () => {
    setOpenAddAddress(true);
  };

  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("MY ADDRESS BOOK")}`}
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
              overflow: "hidden",
            }}
          >
            
            <Grid
              lg={4}
              md={4}
              xs={12}
              sm={12}
              sx={{ paddingLeft: "50px !important" }}
            >
              <ProfileSidBar />
            </Grid>
            <Grid lg={8} md={8} xs={12} sm={12} justifyContent="space-between">
              <MainTitle sx={{ mb: 4 }}>{t("MY ADDRESS BOOK")}</MainTitle>
              <Divider />
              <ViewAddress />
              <Button
                onClick={handleClickOpenAddAddress} // Add onClick handler
                type="button"
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.dark,
                  color: theme.palette.primary.light,
                  fontFamily: "Cairo",
                  width: "10rem",
                  mt: 4,
                  mr: 3,
                }}
              >
                {t("Add New Address")}
              </Button>
              <AddAddress
                openAddAddress={openAddAddress}
                handleCloseAddAddress={handleCloseAddAddress}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default Address;
