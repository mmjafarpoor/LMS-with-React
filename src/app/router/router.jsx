import { createBrowserRouter } from "react-router-dom";

import Landing from "../../pages/Landing";
import Auth from "../../pages/Auth";
<<<<<<< HEAD
import Login from "../../components/AuthContainer/Login/Login";
import SignUp from "../../components/AuthContainer/SignUp/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword/ForgetPassword";
import Home from "../../pages/Home";
=======
import Login from "../../components/AuthContainer/Login";
import SignUp from "../../components/AuthContainer/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword";
>>>>>>> authentication

const router = createBrowserRouter([
    { path: "/", element: <Landing/> , children:[
        {index: true, element: <Home/> },
        { path: "Home", element: <Home/> },
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
