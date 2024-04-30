import React, { useEffect, useState } from 'react'
import ResponsiveLayout from '../../Components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import useRequest from '../../Hooks/useRequest';
import { PRODUCTS } from '../../Data/API';
import ViewProductsSkeleton from '../../Components/Skeleton/ViewProductsSkeleton';
import { Container, Grid, Pagination, PaginationItem, Stack } from '@mui/material';
import { ProductItem } from '../../Components/Products/ProductItem';
import { GrayText } from '../../Style/StyledComponents/Typography';
import PageMeta from '../../Components/Layout/MetaPage';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist.value);
    const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
    const token=JSON.parse(localStorage.getItem("userinfo"))
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        setPage(value);
      };
    // Get discount request
    const [RequestGetWishList, ResponseGetWishList] = useRequest({
      method: "Get",
      path: PRODUCTS + shopInfo?.id + "/products/?favorite=True",
      token:token?`Token ${token}`:null
    });
    const GetProductsWishList = () => {
        RequestGetWishList({
            params:{
                page:page||1
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
        title={`${shopInfo?.sub_domain}-Wishlist`}
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />
      <Container maxWidth='xl' >
    <Grid container  spacing={3}>
        {ResponseGetWishList.isPending ? (
          <ViewProductsSkeleton />
        ) : (wishlist?.results?.length?
            wishlist?.results?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product?.id}>
              <ProductItem {...product} />
            </Grid>
          )):<GrayText>No data to show</GrayText>
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
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            )}
          </Stack>
      </Grid>
      </Container>
   </ResponsiveLayout>
  )
}

export default Wishlist