// router.jsx
import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout/RootLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { Loadable } from "../../hooks/Loadable/Loadable";
import ProtectedRoute from "../../comopnents/ProtectedRoute/ProtectedRoute";
import Home from "../../pages/Home/Home";
import Services from "../../pages/Services/Services";
import About from "../../pages/About/About";
import Blogs from "../../pages/Blogs/Blogs";
import Profile from "../../pages/UserItems/Profile/Profile";
import Login from "../../pages/AuthPages/Login/Login";
import SignUp from "../../pages/AuthPages/SignUp/SignUp";
import UserDashboard from "../../DashboardPanel/UserDashboard/UserDashboard";
import Contact from "../../pages/Contact/Contact";
import Pricing from "../../pages/Pricing/Pricing";
import AdminDashboard from "../../DashboardPanel/AdminDashboard/AdminDashboard";
import Edit from "../../pages/UserItems/Profile/Edit/Edit";
import AddPortfolio from "../../DashboardPanel/AdminDashboard/PortfolioSection/AddPortfolio/AddPortfolio";
import AddServices from "../../DashboardPanel/AdminDashboard/ServicesSection/AddServices/AddServices";
import AddTeamMember from "../../DashboardPanel/AboutSection/Team/AddTeamMember/AddTeamMember";
import EditMember from "../../DashboardPanel/AboutSection/Team/Edit/EditMember";
import AddTestimonial from "../../comopnents/AddTestimonial/AddTestimonial";



// Router setup
const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <Home></Home>},
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/blogs", element: <ProtectedRoute><Blogs /></ProtectedRoute> },
      { path: "/profile", element: <Profile /> },
      { path: "/edit/:id", element: <Edit /> },
      {path: "/add-testimonial", element: <AddTestimonial></AddTestimonial>}
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
      { path: "user", element: <UserDashboard /> },
      { path: "admin", element: <AdminDashboard></AdminDashboard> },
      { path: "add-portfolio", element: <AddPortfolio></AddPortfolio> },
      { path: "add-service", element: <AddServices></AddServices> },
      { path: "add-team-member", element: <AddTeamMember></AddTeamMember> },
      { path: "edit-member/:id", element: <EditMember></EditMember> }
    ]
  }
]);

export default route;
