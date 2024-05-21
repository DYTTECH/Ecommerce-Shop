import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../Hooks/useRequest";
import { Box, Container, Divider, Grid, Pagination, PaginationItem, Stack } from "@mui/material";
import { GrayText, MainTitle } from "../../Style/StyledComponents/Typography";
import ResponsiveLayout from "../Layout/Layout";
import PageMeta from "../Layout/MetaPage";
import HeroTitle from "../Layout/HeroTitle";
import ProfileSidBar from "./ProfileSidBar";
import ViewProductsSkeleton from "../Skeleton/ViewProductsSkeleton";
import { ProductItem } from "../Products/ProductItem";
import { PRODUCTS } from "../../Data/API";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MyWishlist = () => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const wishlist = useSelector((state) => state.wishlist.value);

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
    { label: `${t("MY WISHLIST")}`, active: false },
  ];

  const [page, setPage] = useState(1);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("MY WISHLIST")}`}
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
              sx={{ paddingLeft: "50px" }}
            >
              <ProfileSidBar />
            </Grid>
            <Grid lg={8} md={4} xs={12} sm={12} sx={{ paddingLeft: "20px" }}>
              <Box>
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
  );
};

export default MyWishlist;
