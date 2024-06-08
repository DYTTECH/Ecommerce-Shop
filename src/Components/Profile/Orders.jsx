import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { Box, Container, Divider, Grid, Tab } from "@mui/material";
import { GrayText, ItemsDes, ItemsTitle, MainTitle } from "../../Style/StyledComponents/Typography";
import ResponsiveLayout from "../Layout/Layout";
import PageMeta from "../Layout/MetaPage";
import HeroTitle from "../Layout/HeroTitle";
import ProfileSidBar from "./ProfileSidBar";
import useRequest from "../../Hooks/useRequest";
import BASEURL from "../../Data/API";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dellivery from "../../assets/images/delivery.png";
import Canceled from "../../assets/images/canceled.png";
import dlivered from "../../assets/images/deliverd.png";
import shipping from "../../assets/images/shipping.png";
import inpackage from "../../assets/images/package.png";
import review from "../../assets/images/review.png";
import OrderProgress from "./Order/OrderProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

const Orders = () => {
  const shopInfo = useMemo(() => JSON.parse(localStorage.getItem("shopInfo")), []);
  const token = useMemo(() => JSON.parse(localStorage.getItem("userinfo")), []);
  const orders = useSelector((state) => state.orders.results);
  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id } = useParams();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const crumbs = useMemo(() => [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
    { label: `${t("MY ORDERS")}`, active: false },
  ], [shopInfo, t]);

  const [RequestGetOrders, ResponseGetOrders] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/${shopInfo?.id}/orders/`,
    token: token ? `Token ${token}` : null,
  });

  const [RequestGetOrdersStatus, ResponseGetOrdersStatus] = useRequest({
    method: "GET",
    path: `${BASEURL}shop/dashboard/order/status/`,
  });

  const getUserOrders = useCallback(() => {
    RequestGetOrders({
      onSuccess: (res) => {
        console.log("Fetched Orders:", res.data);
        dispatch({ type: "orders/set", payload: res.data.results });
      },
    });
  }, []);

  const getUserOrdersStatus = useCallback(() => {
    RequestGetOrdersStatus({
      onSuccess: (res) => {
        console.log("Fetched Order Statuses:", res.data);
        setOrderStatus(res.data);
      },
    });
  }, []);

  useEffect(() => {
    getUserOrders();
    getUserOrdersStatus();
  }, []);

  const getStatusOrders = useCallback((statusName) => {
    return orders?.filter((order) => order.status_name === statusName);
  }, []);

  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("MY ORDERS")}`}
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
              lg={4}
              md={4}
              xs={12}
              sm={12}
              sx={{ paddingLeft: "50px !important" }}
            >
              <ProfileSidBar />
            </Grid>
            <Grid lg={8} md={8} xs={12} sm={12} justifyContent="space-between">
              <MainTitle sx={{ mb: 4 }}>{t("MY ORDERS")}</MainTitle>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  aria-label="visible arrows tabs example"
                  sx={{
                    flexGrow: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                    [`& .${tabsClasses.scrollButtons}`]: {
                      "&.Mui-disabled": { opacity: 0.3 },
                    },
                  }}
                >
                  <Tab
                    label={t("All Orders")}
                    {...a11yProps(0)}
                    sx={{ color: theme.palette.primary.dark }}
                  />
                  {orderStatus?.map((status, index) => (
                    <Tab
                      key={status.id}
                      label={status.name}
                      {...a11yProps(index + 1)}
                      sx={{ color: theme.palette.primary.dark }}
                    />
                  ))}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <MainTitle>{t("MY ORDERS")}</MainTitle>
                {orders?.length > 0 ? (
                  orders?.map((order, index) => (
                    <Box
                      key={index}
                      onClick={() => navigate(`/t2/${shopInfo?.sub_domain}/orders/${order.id}`)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          mt: 3,
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
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
                            <ItemsTitle>#{order.id}</ItemsTitle>
                            <ItemsDes>
                              {order.total}&nbsp;
                              {t("SAR")}
                            </ItemsDes>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Box width={"20px"}>
                            <img
                              src={
                                order.status_id === "1"
                                  ? shipping
                                  : order.status === "4"
                                  ? dlivered
                                  : order.status === "6"
                                  ? Canceled
                                  : order.status === "3"
                                  ? shipping
                                  : order.status === "7"
                                  ? shipping
                                  : order.status === "5"
                                  ? dlivered
                                  : order.status === "2" && Canceled
                              }
                              alt="dellivery"
                              width={"100%"}
                              height={"100%"}
                            />
                          </Box>
                          <ItemsTitle
                            sx={{
                              color:
                                order.status === "1"
                                  ? "#2629DB"
                                  : order.status === "7"
                                  ? "#2629DB"
                                  : order.status === "3"
                                  ? "#2629DB"
                                  : order.status === "4"
                                  ? "#2629DB"
                                  : order.status === "5"
                                  ? "#5CB85C"
                                  : order.status === "6"
                                  ? "#D9534F"
                                  : order.status === "2" && "#D9534F",
                              pr: 2,
                            }}
                          >
                            {order.status_name}
                          </ItemsTitle>
                        </Grid>
                      </Grid>
                    </Box>
                  ))
                ) : (
                  <ItemsDes sx={{ pt: 3 }}>
                    {t("There are no orders.")}
                  </ItemsDes>
                )}
              </TabPanel>
              {orderStatus?.map((status, index) => (
                <TabPanel key={status.id} value={value} index={index + 1}>
                  <MainTitle>{status.name}</MainTitle>
                  {getStatusOrders(status.name)?.map((order) => (
                    <OrderProgress key={order.id} orderId={order.id} />
                  ))}
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default Orders;
