import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home/Home";
import ProductDetailPage from "../pages/product/ProductDetail";
import ProductList from "../pages/product/ProductList";
import CheckoutForm from "../pages/payment";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SearchResults from "../pages/product/SearchResult";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import AppointmentBookingPage from "../pages/appointment";
import ProfilePage from "../pages/profile";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/categories/:id",
        element: <ProductList />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/checkout",
            element: <CheckoutForm />,
          },
          {
            path: "/bookAppointment",
            element: <AppointmentBookingPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
]);
