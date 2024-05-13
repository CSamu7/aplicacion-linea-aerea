import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainPage from "./pages/MainPage.jsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import ConfirmPage from "./pages/ConfirmPage.jsx";
import ReserveSeatsPage from "./pages/ReserveSeatsPage.jsx";
import RegisterUserPage from "./pages/RegisterUserPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
  },
  {
    path: "/registro",
    element: <RegisterUserPage></RegisterUserPage>,
  },
  {
    path: "/asientos",
    element: <ReserveSeatsPage></ReserveSeatsPage>,
  },
  {
    path: "/pago",
    element: <PaymentPage></PaymentPage>,
  },
  {
    path: "confirmacion",
    element: <ConfirmPage></ConfirmPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
