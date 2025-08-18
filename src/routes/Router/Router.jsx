// router.jsx
import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import RootLayout from "../../layouts/RootLayout/RootLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { Loadable } from "../../hooks/Loadable/Loadable";

// Lazy imports wrapped with Loadable HOC
const Home = Loadable(lazy(() => import("../../pages/Home/Home")));
const Services = Loadable(lazy(() => import("../../pages/Services/Services")));
const About = Loadable(lazy(() => import("../../pages/About/About")));
const Blogs = Loadable(lazy(() => import("../../pages/Blogs/Blogs")));
const Profile = Loadable(lazy(() => import("../../pages/UserItems/Profile/Profile")));
const Login = Loadable(lazy(() => import("../../pages/AuthPages/Login/Login")));
const SignUp = Loadable(lazy(() => import("../../pages/AuthPages/SignUp/SignUp")));
const UserDashboard = Loadable(lazy(() => import("../../DashboardPanel/UserDashboard/UserDashboard")));
const Contact = Loadable(lazy(() => import("../../pages/Contact/Contact")));
const Pricing = Loadable(lazy(() => import("../../pages/Pricing/Pricing")));

// Router setup
const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/profile", element: <Profile /> }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "user", element: <UserDashboard /> }
    ]
  }
]);

export default route;
