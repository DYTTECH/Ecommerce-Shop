import { configureStore } from "@reduxjs/toolkit";
import LangSlice from "./LangSlice";
import ProductsSlice from "./Pages/ProductsSlice";
import userInfo  from "./UserInfo";
import ShopInfoSlice from "./Pages/ShopInfoSlice";
import HomeComponentSlice from "./Pages/HomeComponentSlice";
import CategoriesSlice from "./Pages/CategoriesSlice";
import NewArriveSlice from "./Pages/NewArriveSlice";
import RecommendationSlice from "./Pages/RecommendationSlice";
import MostViewedSlice from "./Pages/MostViewedSlice";
import MostRatedSlice from "./Pages/MostRatedSlice";
import BestSellerSlice from "./Pages/BestSellerSlice";
import BrandsSlice from "./Pages/BrandSlice"
import BannersSlice from "./Pages/BannerSlice"
import subCategoriesSlice from "./Pages/SubCategorieSlice"
import DiscountsSlice from "./Pages/DiscountsSlice";
import FilterSlice from "./Pages/FilterSlice";
import ProductDetailsSlice from "./Pages/ProductDetailsSlice";


export const store = configureStore({
    reducer: {
      language:LangSlice,
      userInfo:userInfo,
      products:ProductsSlice,
      shopInfo:ShopInfoSlice,
      homecomponents:HomeComponentSlice,
      categories:CategoriesSlice,
      newarrive:NewArriveSlice,
      recommendation:RecommendationSlice,
      mostviewed:MostViewedSlice,
      mostrated:MostRatedSlice,
      bestseller:BestSellerSlice,
      BannersSlice: BannersSlice,
      BrandsSlice:BrandsSlice,
      subCategories: subCategoriesSlice,
      discounts:DiscountsSlice,
      filter:FilterSlice,
      productdetails:ProductDetailsSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })