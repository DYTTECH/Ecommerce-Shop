import { Box, Grid, Stack } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ProductSkeleton from "../Skeleton/ProductSkeleton";
import useRequest from "../../Hooks/useRequest";
import { PRODUCTS } from "../../Data/API";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem } from "./ProductItem";
const ProductSlider = ({ title ,keyId}) => {
  const shopInfo =  JSON.parse(localStorage.getItem("shopInfo"))
  const bestseller=useSelector((state)=>state.bestseller.value)
  const recommendation=useSelector((state)=>state.recommendation.value)
  const newarrive=useSelector((state)=>state.newarrive.value)
  const mostviewed=useSelector((state)=>state.mostviewed.value)
  const mostrated=useSelector((state)=>state.mostrated.value)
  const dispatch=useDispatch();
  const lang = localStorage.getItem("language");

    // Get shop info request
  const [RequestGetProductSort, ResponseGetProductSort] = useRequest({
    method: "Get",
    path: PRODUCTS+shopInfo.id+`/products/?query_id=${keyId}`,
  });
  const GetProductSort=(shop)=>{
    RequestGetProductSort({
      onSuccess: (res) => {
        switch (keyId) {
          case 1:
            dispatch({ type: "bestseller/set", payload: res.data });
            break;
          case 2:
            dispatch({ type: "recommendation/set", payload: res.data });
            break;
            case 3:
            dispatch({ type: "newarrive/set", payload: res.data });
            break;
            case 4:
            dispatch({ type: "mostviewed/set", payload: res.data });
            break;
            case 5:
            dispatch({ type: "mostrated/set", payload: res.data });
            break;
          default:
            dispatch({ type: "products/set", payload: res.data });
            // Default case if keyId doesn't match any of the specified cases
            break;
        }
       
			},
      onError: (err) => {
        dispatch({type: "newarrive/reset", payload:err.message});
      }
    })
    
  }

  useEffect(()=>{
    GetProductSort()
  },[])
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
      autoPlay: false,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };
  
  return (
    <Stack
    gap={1}
    className={lang === 'en' ? 'productStack' : ''}
    sx={{
      ".react-multi-carousel-list": {
        justifyContent: lang === 'en' ? 'flex-start' : "flex-end",
        alignItems: "center",
        // padding: "20px",
      },
      ".react-multi-carousel-item": {
        // padding: "0",
        // margin: "15px",
        width: { md: "100% !important", xs: 'fit-content !important' },
        padding: "10px",
      },
    }}
  >
  {keyId===1?(
     bestseller?.results?.length?
    <Carousel
    swipeable={true}
      responsive={responsive}
      centerMode
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      direction={lang === 'en' ? 'rtl' : 'ltr'}
    >
      {bestseller.results.slice(0, 4).map((product, index) => (
        <ProductItem {...product} key={index} />
      ))}
    </Carousel>
    
    :null):keyId==2?(
      recommendation.results.length?
      <Carousel
      swipeable={true}
        responsive={responsive}
        centerMode
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        direction={lang === 'en' ? 'rtl' : 'ltr'}
      >
        {recommendation.results.slice(0, 4).map((product, index) => (
          <ProductItem {...product} key={index} />
        ))}
      </Carousel>:null
    ):keyId==3?(
      newarrive.results.length?
      <Carousel
    swipeable={true}
      responsive={responsive}
      centerMode
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      direction={lang === 'en' ? 'rtl' : 'ltr'}
    >
      {newarrive.results.slice(0, 4).map((product, index) => (
        <ProductItem {...product} key={index} />
      ))}
    </Carousel>:null
    ):keyId==4?(
      mostviewed.results.length?
      <Carousel
    swipeable={true}
      responsive={responsive}
      centerMode
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      direction={lang === 'en' ? 'rtl' : 'ltr'}
    >
      {mostviewed.results.slice(0, 4).map((product, index) => (
        <ProductItem {...product} key={index} />
      ))}
    </Carousel>:null
    ):keyId==5&&
    (
      mostrated.results.length?
      <Carousel
    swipeable={true}
      responsive={responsive}
      centerMode
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      direction={lang === 'en' ? 'rtl' : 'ltr'}

    >
      {mostrated.results.slice(0, 4).map((product, index) => (
        <ProductItem {...product} key={index} />
      ))}
    </Carousel>:null
    )}
  </Stack>
  );
};

export default ProductSlider;
