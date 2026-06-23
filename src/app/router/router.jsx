import { createBrowserRouter } from "react-router-dom";

import Landing from "../../pages/Landing";
import Home from "../../pages/Home";
import Auth from "../../pages/Auth";
import Login from "../../components/AuthContainer/Login";
import SignUp from "../../components/AuthContainer/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword";
import Courses from "../../pages/Courses";
import Teachers from "../../pages/Teachers";
import TeacherDetails from "../../components/TeacherContainer/TeacherDetails";
import News from "../../pages/News";
import NewsDetails from "../../components/NewsContainer/NewsDetails";
import Contact from "../../pages/Contact";
import Error404 from "../../pages/Error404";
import HomeTest from "../../pages/HomeTest";

const router = createBrowserRouter([
    { path: "/", element: <Landing/> , children:[
        {index: true, element: <Home/> },
        { path: "Home", element: <Home/> },
        { path: "Home/test", element: <HomeTest/> },
        { path: "Courses", element: <Courses/> },
        { path: "Teachers", element: <Teachers /> },
        { path: "Teachers/:teacherId/:TeacherName", element: <TeacherDetails /> },
        { path: "News", element: <News/> },
        { path: "News/:id/:NewsName", element: <NewsDetails /> },
        { path: "Contact", element: <Contact/> },
        { path: "*", element: <Error404/> },
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
