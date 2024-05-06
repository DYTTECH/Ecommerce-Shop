import { createBrowserRouter } from "react-router-dom";
import ResponsiveLayout from "../Components/Layout/Layout";
import Home from "../Pages/Home/Home";
import { Products } from "../Pages/Products/Products";
import ErrorPage from "./ErrorPage";
import ProductDetails from "../Components/Products/ProductDetails";
import Discount from "../Pages/Discount/Discount";
import Wishlist from "../Pages/WishList/Wishlist";
import Cart from "../Pages/Cart/Cart";

const createRoutes = () => {
  
  return [
    // {
    //   path: "/t2/",
    //   element: <ResponsiveLayout />,
    //   // errorElement: <ErrorPage />,
     
    // },
    {
      path: "/t2/:name",
      element: <Home />,
       index: true,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/products",
      element: <Products />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/products/:name/:id",
      element: <ProductDetails />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/discounts",
      element: <Discount />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/wishlist",
      element: <Wishlist />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/cart",
      element: <Cart />,
      // errorElement: <ErrorPage />,
    },
    // Add more routes if needed
  ];
};

export const Pages = createBrowserRouter(createRoutes());
