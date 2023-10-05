import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Register from "./pages/Register";
import Login from "./pages/Login";
import OnPrem from "./pages/OnPrem";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/InStore",
    element: <Home></Home>,
  },
  {
    path: "/",
    element: <Welcome></Welcome>
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/onPrem",
    element: <OnPrem></OnPrem>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
