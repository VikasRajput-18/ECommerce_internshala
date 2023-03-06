import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{}],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
