import { Box, Grid, Stack } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useRequest from "../../Hooks/useRequest";
import { PRODUCTS } from "../../Data/API";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem } from "./ProductItem";
import { MainTitle } from "../../Style/StyledComponents/Typography";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ProductSlider = ({ title ,keyId}) => {
  const shopInfo =  JSON.parse(localStorage.getItem("shopInfo"))
  const token=JSON.parse(localStorage.getItem("userinfo"))
  const bestseller=useSelector((state)=>state.bestseller.value)
  const recommendation=useSelector((state)=>state.recommendation.value)
  const newarrive=useSelector((state)=>state.newarrive.value)
  const mostviewed=useSelector((state)=>state.mostviewed.value)
  const mostrated=useSelector((state)=>state.mostrated.value)
  const dispatch=useDispatch();
  const navigate =useNavigate()
  const {t}=useTranslation()
  const lang = localStorage.getItem("language");

    // Get shop info request
  const [RequestGetProductSort, ResponseGetProductSort] = useRequest({
    method: "Get",
    path: PRODUCTS+shopInfo.id+`/products/?query_id=${keyId}`,
    token:token?`Token ${token}`:null
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
      autoPlay: true,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
      autoPlay: true,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
      autoPlay: true,
    },
  };
  
  return (
    <Stack
    gap={1}
    co
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
        width: { md: "23.7vw !important", xs: '47vw !important' },
        padding: "10px",
      },
    }}
  >
    <Stack flexDirection={'row'} justifyContent={'space-between'}>
     <MainTitle sx={{paddingX:4,cursor:'pointer'}}>{title}</MainTitle>
     <MainTitle sx={{paddingX:4,cursor:'pointer'}} onClick={() => navigate(`/t2/${shopInfo.sub_domain}/products`,{state:{keys:{
      sort_id:keyId
     }}})}>{t('More')}</MainTitle>
     </Stack>
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
        
        <ProductItem {...product} key={index} type={ "bestseller"}/>
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
          <ProductItem {...product} key={index} type={"recommendation"}/>
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
        <ProductItem {...product} key={index} type={"newarrive"} />
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
        <ProductItem {...product} key={index} type={"mostviewed"} />
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
        <ProductItem {...product} key={index} type={"mostrated"} />
      ))}
    </Carousel>:null
    )}
  </Stack>
  );
};

export default ProductSlider;
