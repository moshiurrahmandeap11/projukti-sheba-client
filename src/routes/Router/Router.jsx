import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout/RootLayout";
import Home from "../../pages/Home/Home";
import Services from "../../pages/Services/Services";
import About from "../../pages/About/About";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Login from "../../pages/AuthPages/Login/Login";
import SignUp from "../../pages/AuthPages/SignUp/SignUp";
import Blogs from "../../pages/Blogs/Blogs";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import UserDashboard from "../../DashboardPanel/UserDashboard/UserDashboard";
import Profile from "../../pages/UserItems/Profile/Profile";


const route = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/services",
                element: <Services />
            },
            {
                path:"/about",
            element: <About />
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/profile",
                element: <Profile></Profile>,
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path:"signup",
                element: <SignUp />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "user",
                element: <UserDashboard></UserDashboard>,
            },
        ]

    }
])

export default route;