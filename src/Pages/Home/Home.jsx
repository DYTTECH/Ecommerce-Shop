import React, { useEffect } from "react";
import PageMeta from "../../Components/Layout/MetaPage";
import ResponsiveLayout from "../../Components/Layout/Layout";
import useRequest from "../../Hooks/useRequest";
import { HOMECOMPONENTS, SHOPINFO } from "../../Data/API";
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
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const homecomponents = useSelector((state) => state.homecomponents.value);
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  const navigate=useNavigate()
  
  // const shopInfo = useSelector((state) => state.shopInfo.value)
  const dispatch = useDispatch();

  // Get shop info request
  const [RequestGetShop, ResponseGetShop] = useRequest({
    method: "Get",
    path: SHOPINFO,
  });
  const GetShopInfo = (shop) => {
    RequestGetShop({
      id: shop.split("/")[0],
      onSuccess: (res) => {
        if(res?.data?.template_number==1){
        dispatch({ type: "shopInfo/setShop", payload: res.data });
      }else{
        navigate('/errorpage')
      }
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
     path: HOMECOMPONENTS + shopInfo?.id + "/home-components/",
  });
  const GetHomeComponent = () => {
    RequestGetHomeComponent({
      onSuccess: (res) => {
        dispatch({ type: "homecomponents/set", payload: res.data });
      },
      onError: (err) => {
        dispatch({ type: "shopInfo/clearShop", payload: err.message });
      },
    });
  };
  useEffect(() => {

    window.scrollTo(10, 0);
    const currentShopInfo = window.location.pathname.split("/t2/")[1];
    if (currentShopInfo) {
      GetShopInfo(currentShopInfo);
    }

    window.scrollTo(10, 0);
  }, []);

  useEffect(() => {
    setTimeout(()=>{
      if(shopInfo?.id){
      GetHomeComponent();
    }
    },50000)
  }, [shopInfo?.id]);

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