import React, { useEffect } from "react";
import PageMeta from "../../Components/Layout/MetaPage";
import ResponsiveLayout from "../../Components/Layout/Layout";
import useRequest from "../../Hooks/useRequest";
import { HOMECOMPONENTS, PRODUCTS, SHOPINFO } from "../../Data/API";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Banners from "../../Components/home/banners";
import SubCategories from "../../Components/home/subCategories";
import RecommendedForYou from "../../Components/home/recommendedForYou";
import Brands from "../../Components/home/brands";
import ProductSkeleton from "../../Components/Skeleton/ProductSkeleton";
import BrandSkeleton from "../../Components/Skeleton/BrandSkeleton";
import BannerSkeleton from "../../Components/Skeleton/BannerSkeleton";
import SubCategorySkeleton from "../../Components/Skeleton/SubCategorySkeleton";
import { checkTokenExpiration } from "../../Components/Authentication/SessionExpireToken";

const Home = () => {
  const homecomponents = useSelector((state) => state.homecomponents.value);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  
  // const shopInfo = useSelector((state) => state.shopInfo.value)
  const dispatch = useDispatch();

  // Get shop info request
  const [RequestGetShop, ResponseGetShop] = useRequest({
    method: "Get",
    path: SHOPINFO,
  });
    // Get wishlist request
    const [RequestGetWishList, ResponseGetWishList] = useRequest({
      method: "Get",
      path: PRODUCTS ,
      token:userInfo?`Token ${userInfo}`:null
    });
    const GetProductsWishList = (id) => {
        RequestGetWishList({
          id:id+"/products/?favorite=True",
        onSuccess: (res) => {
          dispatch({ type: "wishlist/set", payload: res.data });
        },
        onError: (err) => {
          dispatch({ type: "wishlist/reset", payload: err.message });
        },
      });
    };
  const GetShopInfo = (shop) => {
    RequestGetShop({
      id: shop.split("/")[0],
      onSuccess: (res) => {
        dispatch({ type: "shopInfo/setShop", payload: res.data });
        RequestGetHomeComponent({
        
            id:res?.data?.id+"/home-components",
       
          onSuccess: (res) => {
            dispatch({ type: "homecomponents/set", payload: res.data });

          },
          onError: (err) => {
            dispatch({ type: "shopInfo/clearShop", payload: err.message });
          },
        });
        GetProductsWishList(res.data.id);
      },
      onError: (err) => {
        dispatch({ type: "shopInfo/clearShop", payload: err.message });
      },
    });
  };


  useEffect(()=>{
   
    checkTokenExpiration()
  },[])

  // Get shop home component
  const [RequestGetHomeComponent, ResponseGetHomeComponent] = useRequest({
    method: "Get",
     path: HOMECOMPONENTS,
  });
  
  useEffect(() => {

   
    const currentShopInfo = window.location.pathname.split("/t2/")[1];
    if (currentShopInfo) {
      GetShopInfo(currentShopInfo);
    }

    window.scrollTo(10, 0);
  }, []);

  // useEffect(() => {
  //   setTimeout(()=>{
  //     if(shopInfo?.id){
  //     GetHomeComponent();
  //   }
  //   },5000)
  // }, [shopInfo?.id]);

  return (
    <Box>
      <ResponsiveLayout>
        <PageMeta
          title={shopInfo?.shop_name}
          desc="Description of my page for SEO"
          name={shopInfo?.full_name}
          type={shopInfo?.shop_type_name}
          image={shopInfo?.logo}
        />
        {/* <CategoryMenu /> */}

        {ResponseGetHomeComponent?.isPending ? (
          <Box sx={{marginTop:5}}>
            <SubCategorySkeleton />
            <ProductSkeleton />
            <BannerSkeleton />
            <BrandSkeleton />
          </Box>
        ) : (
          homecomponents.length ?
          homecomponents?.map((component) =>
            component?.content_type_name === "specialcategory" ? (
              
              <RecommendedForYou
                key={component?.sort_number}
                title={component?.title}
                sort_id={component?.query_id}
              />
            
            ) : component?.content_type_name === "category" ? (
              <SubCategories
              key={component?.sort_number}
              category_level={component?.category_level}
                frame={component?.frame}
              />
            ) : component?.content_type_name === "shopbrand" ? (
             
                <Brands 
              key={component?.sort_number}
              items={component?.items}
              title={component?.title}
              />
              
            ) : (
              component?.content_type_name === "banner" && 
              <Banners 
              key={component?.sort_number}
              items={component?.items}
              display={component?.display}
              overflow_type={component?.overflow_type}
              />
            )
          ):(
            <Box sx={{marginTop:5}}>
            <SubCategorySkeleton />
            <ProductSkeleton />
            <BannerSkeleton />
            <BrandSkeleton />
          </Box>
          )
        )}
       
      </ResponsiveLayout>
    </Box>
  );
};

export default Home;