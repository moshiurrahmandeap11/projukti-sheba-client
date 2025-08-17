import { createBrowserRouter } from "react-router";
import RootLayout from "../../assets/layouts/RootLayout/RootLayout";
import Home from "../../assets/pages/Home/Home";
import Services from "../../assets/pages/Services/Services";

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
                element: <Services></Services>
            }
        ]
    }
])

export default route;