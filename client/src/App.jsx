import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Body from "./pages/Body";
import "./App.css";
import ProductScreen from "./pages/Product/ProductScreen";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import Error from "./screens/Error";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./pages/SignupScreen";
import PaymentMethods from "./screens/PaymentMethods";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistory";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/shipping",
        element: <ShippingAddressScreen />,
      },
      {
        path: "/payment",
        element: <PaymentMethods />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrderScreen />,
      },
      {
        path: "/order/:id",
        element: <OrderScreen />,
      },
      {
        path: "/signin",
        element: <SigninScreen />,
      },
      {
        path: "/signup",
        element: <SignupScreen />,
      },
      {
        path: "/product/:slug",
        element: <ProductScreen />,
      },
      {
        path: "/orderhistory",
        element: <OrderHistoryScreen />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
