import { createBrowserRouter } from "react-router-dom";

import Landing from "../../pages/Landing";
import Auth from "../../pages/Auth";
import Login from "../../components/AuthContainer/Login";
import SignUp from "../../components/AuthContainer/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword";

const router = createBrowserRouter([
    { path: "/", element: <Landing/> , children:[
        { path: "Home", element: <Login /> },
        { path: "Courses", element: <Login /> },
        { path: "Instructors", element: <Login /> },
        { path: "WebLog", element: <Login /> },
        { path: "Contact", element: <Login /> },
    ]},
    {
        path: "/",
        element: <Auth/>,
        children: [
            { path: "login", element: <Login /> },
            { path: "sign-up", element: <SignUp /> },
            { path: "forget-password", element: <ForgetPassword /> },
        ],
    },
]);

export default router;
