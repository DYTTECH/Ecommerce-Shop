import React, { useEffect } from "react";
import ResponsiveLayout from "../../Components/Layout/Layout";
import PageMeta from "../../Components/Layout/MetaPage";
import useRequest from "../../Hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS } from "../../Data/API";
import { Grid } from "@mui/material";
import { ProductItem } from "../../Components/Products/ProductItem";
import ProductSkeleton from "../../Components/Skeleton/ProductSkeleton";
import { GrayText } from "../../Style/StyledComponents/Typography";
import ViewProductsSkeleton from "../../Components/Skeleton/ViewProductsSkeleton";

const Discount = () => {
  const discounts = useSelector((state) => state.discounts.value);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const dispatch = useDispatch();
  // Get discount request
  const [RequestGetDiscounts, ResponseGetDiscounts] = useRequest({
    method: "Get",
    path: PRODUCTS + shopInfo?.id + "/products/?discount=True",
  });
  const GetProductsDiscount = () => {
    RequestGetDiscounts({
      onSuccess: (res) => {
        dispatch({ type: "discounts/set", payload: res.data });
      },
      onError: (err) => {
        dispatch({ type: "discounts/reset", payload: err.message });
      },
    });
  };

  useEffect(() => {
    GetProductsDiscount();
  }, []);
  return (
    <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-Discounts`}
        desc="Description of my page for SEO"
        name="Your Name"
        type="website"
        image="URL_to_your_image"
      />
      <Grid container  spacing={3}>
        {ResponseGetDiscounts.isPending ? (
          <ViewProductsSkeleton />
        ) : (discounts?.results?.length?
          discounts?.results?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product?.id}>
              <ProductItem {...product} />
            </Grid>
          )):<GrayText>No data to show</GrayText>
        )}
      </Grid>
    </ResponsiveLayout>
  );
};

export default Discount;
