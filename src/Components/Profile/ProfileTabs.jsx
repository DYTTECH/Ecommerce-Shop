import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveLayout from "../Layout/Layout";
import {
  Box,
  Container,
  Divider,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  GrayText,
  ItemsDes,
  MainTitle,
} from "../../Style/StyledComponents/Typography";
import HeroTitle from "../Layout/HeroTitle";
import PageMeta from "../Layout/MetaPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AccountCircle } from "@mui/icons-material";
import WalletIcon from "@mui/icons-material/Wallet";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useRequest from "../../Hooks/useRequest";
import ViewProductsSkeleton from "../Skeleton/ViewProductsSkeleton";
import { ProductItem } from "../Products/ProductItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Profile from "./ProfileSettings";
import Address from "./Address";
import { PRODUCTS } from "../../Data/API";
import { useNavigate } from "react-router-dom";
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

const ProfileTabs = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const wishlist = useSelector((state) => state.wishlist.value);
  const navigate = useNavigate();
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
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [page, setPage] = useState(1);

  //get wishlist products
  const [RequestGetWishList, ResponseGetWishList] = useRequest({
    method: "GET",
    path: PRODUCTS + shopInfo?.id + "/products/?favorite=True",
    token: token ? `Token ${token}` : null,
  });

  const GetProductsWishList = () => {
    RequestGetWishList({
      params: {
        page: page || 1,
      },
      onSuccess: (res) => {
        dispatch({ type: "wishlist/set", payload: res.data });
      },
      onError: (err) => {
        dispatch({ type: "wishlist/reset", payload: err.message });
      },
    });
  };

  useEffect(() => {
    GetProductsWishList();
  }, []);

  const tabInfoArray = [
    {
      icon: <AccountCircle />,
      name: t("MY PROFILE"),
      content: [<Profile />],
    },
    {
      icon: <WalletIcon />,
      name: t("REFER & EARN"),
      content: [<Typography>Refer & Earn content</Typography>],
    },
    {
      icon: <ListAltIcon />,
      name: t("MY ORDERS"),
      content: [
        <>
          <MainTitle>{t("MY ORDERS")}</MainTitle>
          <ItemsDes sx={{ pt: 3 }}>{t("There is no orders.")}</ItemsDes>
        </>,
      ],
    },
    {
      icon: <RotateLeftIcon />,
      name: t("MY RETURN/EXCHANGE"),
      content: [
        <>
          <MainTitle>{t("MY RETURN/EXCHANGE")}</MainTitle>
          <ItemsDes sx={{ pt: 3 }}>
            {t("There is no RETURN/EXCHANGE.")}
          </ItemsDes>
        </>,
      ],
    },
    {
      icon: <FavoriteBorderOutlinedIcon />,
      name: t("MY WISHLIST"),
      content: [
        <>
          <MainTitle>{t("MY WISHLIST")}</MainTitle>
          {/* <ItemsDes sx={{pt:3}}>{t("There is no orders.")}</ItemsDes> */}
          <Grid container spacing={3}>
            {ResponseGetWishList.isPending ? (
              <ViewProductsSkeleton />
            ) : wishlist?.results?.length ? (
              wishlist?.results?.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product?.id}>
                  <ProductItem {...product} />
                </Grid>
              ))
            ) : (
              <GrayText>No data to show</GrayText>
            )}
            {/* Your products will be displayed here. You can */}
            <Stack
              spacing={2}
              mt={3}
              mb={3}
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {wishlist?.count > 0 && wishlist?.count > 8 && (
                <Pagination
                  count={Math.ceil(wishlist?.count / 8)}
                  page={page}
                  onChange={handleChange}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              )}
            </Stack>
          </Grid>
        </>,
      ],
    },
    {
      icon: <LocationOnIcon />,
      name: t("MY ADDRESS BOOK"),
      content: [<Address />],
    },
    {
      icon: <CreditCardIcon />,
      name: t("PAYMENTS"),
      content: [
        <>
          <MainTitle>{t("PAYMENTS")}</MainTitle>
          <ItemsDes sx={{ pt: 3 }}>{t("There is no PAYMENTS.")}</ItemsDes>
        </>,
      ],
    },
    {
      icon: <LogoutIcon />,
      name: t("LOGOUT"),
      content: [
        <>
          <MainTitle>{t("LOGOUT")}</MainTitle>
          <ItemsDes sx={{ pt: 3 }}>{t("There is no orders.")}</ItemsDes>
        </>,
      ],
    },
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
        <Grid lg={8} md={4} xs={12} sm={12}>
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

export default ProfileTabs;
