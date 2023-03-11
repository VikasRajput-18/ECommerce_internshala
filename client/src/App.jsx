import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Body from "./pages/Body";
import "./App.css";
import ProductScreen from "./pages/Product/ProductScreen";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./pages/SigninScreen";

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
        path: "/signin",
        element: <SigninScreen />,
      },
      {
        path: "/product/:slug",
        element: <ProductScreen />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
