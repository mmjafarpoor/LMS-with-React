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
import Contact from "../../pages/Contact";
import News from "../../pages/News";
import NewsDetails from "../../components/NewsContainer/NewsDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "Courses", element: <Courses /> },
      { path: "Teachers", element: <Teachers /> },
      { path: "Teachers/:teacherId/:TeacherName", element: <TeacherDetails /> },
      { path: "News", element: <News /> },
      { path: "News/:id/:NewsName", element: <NewsDetails /> },
      { path: "Contact", element: <Contact /> },
    ],
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },
]);

export default router;
