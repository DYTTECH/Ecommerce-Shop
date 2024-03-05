import { createBrowserRouter } from "react-router-dom";
import ResponsiveLayout from "../Components/Layout/Layout";
import Home from "../Pages/Home/Home";
import { Products } from "../Pages/Products/Products";
import ErrorPage from "./ErrorPage";
import ProductDetails from "../Components/Products/ProductDetails";

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
      errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/products",
      element: <Products />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/t2/:name/products/:name",
      element: <ProductDetails />,
      errorElement: <ErrorPage />,
    },
    // Add more routes if needed
  ];
};

export const Pages = createBrowserRouter(createRoutes());
