import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Products from "@pages/products/Products";
import ProductDetail from "@pages/products/productdetail";
import AdminProducts from "@pages/admin/AdminProducts";
import AdminCategories from "@pages/admin/AdminCategories";
import Me from "@pages/Me";
import Pay from "@pages/Pay";
import Success from "@pages/cart/Success";
import Orders from "@pages/orders/Orders";
import CreateOrder from "@pages/orders/CreateOrder";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login/:redirect?",
        element: <Login />,
    },
    {
        path: "/signup/:redirect?",
        element: <Signup />,
    },
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/me",
        element: <Me />,
    },
    {
        path: "/products/:productId",
        element: <ProductDetail />,
    },
    {
        path: "/admin/products",
        element: <AdminProducts />,
    },
    {
        path: "/admin/categories",
        element: <AdminCategories />,
    },
    {
        path: "/cart/pay",
        element: <Pay />,
    },
    {
        path: "/cart/success",
        element: <Success />,
    },
    {
        path: "/orders",
        element: <Orders />,
    },
    {
        path: "/create_order",
        element: <CreateOrder />,
    },
]);
