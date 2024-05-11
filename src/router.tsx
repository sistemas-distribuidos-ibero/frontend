import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Products from "@pages/products/products";  
import ProductDetail from "@pages/products/productdetail";
import AdminProducts from "@pages/admin/AdminProducts";
import AdminCategories from "@pages/admin/AdminCategories";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/products",
        element: <Products />
    },
    {
        path: "/products/:productId",
        element: <ProductDetail />
    },
    {
        path: "/admin/products",
        element: <AdminProducts />
    },
    {
        path: "/admin/categories",
        element: <AdminCategories />
    }
]);
