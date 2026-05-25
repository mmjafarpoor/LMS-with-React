import { createBrowserRouter } from "react-router-dom";

import Auth from "../../pages/Auth";
import Login from "../../components/AuthContainer/Login/Login";
import SignUp from "../../components/AuthContainer/SignUp/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword/ForgetPassword";

const router = createBrowserRouter([

    {
        path: "/Auth",
        element: <Auth/>,
        children: [
        { path: "/login", element: <Login /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/forget-password", element: <ForgetPassword /> },
        ],
    },
]);

export default router;
