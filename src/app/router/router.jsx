import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
const Landing = lazy(() => import("../../pages/Landing"));
const Auth = lazy(() => import("../../pages/Auth"));
const DashBoard = lazy(() => import("../../pages/DashBoard"));

// Home
const Home = lazy(() => import("../../pages/Home"));

// Courses
const Courses = lazy(() => import("../../pages/Courses"));
import CourseDetails from "../../components/CoursesPage/CourseDetails/CourseDetails";

// Teachers 
const Teachers = lazy(() => import("../../pages/Teachers"));
import TeacherDetails from "../../components/TeacherContainer/TeacherDetails";

// News 
const News = lazy(() => import("../../pages/News"));
import NewsDetails from "../../components/NewsContainer/NewsDetails";

// Contact 
const Contact = lazy(() => import("../../pages/Contact"));

// NotFound
import NotFound from "../../pages/NotFound";

// Auth
import Login from "../../components/AuthContainer/Login";
import SignUp from "../../components/AuthContainer/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword";

// Dashboard
import DashBoardMain from "../../components/DashBoard/DashBoardMain/DashBoardMain";
import BookedCourses from '../../components/DashBoard/BookedCourses/BookedCourses';
import Reserved from '../../components/DashBoard/Reserved/Reserved';
import FavouredCourses from '../../components/DashBoard/FavouredCourses/FavouredCourses';
import FavouredBlogs from '../../components/DashBoard/FavouredBlogs/FavouredBlogs';

// Dashboard Profile
const DashBoardProfile = lazy(() => import("../../components/DashBoard/DashBoardProfile/DashBoardProfile"));
import PersonalInfo from "../../components/DashBoard/DashBoardProfile/Personal-Info/PersonalInfo";
import ProfilePicture from "../../components/DashBoard/DashBoardProfile/ProfilePicture/ProfilePicture";
import LivingAddress from "../../components/DashBoard/DashBoardProfile/LivingAddress/LivingAddress";
import Connections from "../../components/DashBoard/DashBoardProfile/Connections/Connections";
import Security from "../../components/DashBoard/DashBoardProfile/Security/Security";


const router = createBrowserRouter([
    { path: "/", element: <Landing/> , children:[
        {index: true, element: <Navigate to="Home" replace /> },
        { path: "Home", element: <Home/> },
        { path: "Courses", element: <Courses/> },
        { path: "Courses/:courseId", element: <CourseDetails/> },
        { path: "Teachers", element: <Teachers /> },
        { path: "Teachers/:teacherId/:TeacherName", element: <TeacherDetails /> },
        { path: "News", element: <News/> },
        { path: "News/:id/:NewsName", element: <NewsDetails /> },
        { path: "Contact", element: <Contact/> },
        { path: "*", element: <NotFound/> },
    ]},
    {
      path: "/Auth",
      element: <Auth/>,
      children: [
        {index: true, element: <Login/> },
        { path: "login", element: <Login/> },
        { path: "sign-up", element: <SignUp/> },
        { path: "forget-password", element: <ForgetPassword/> },
      ],
    },
    { element: <ProtectedRoute/>,
      children: [
        {path: "/Dashboard", element: <DashBoard/>,children: [
          {index: true, element: <Navigate to="Main" replace />},
          { path: "Main", element: <DashBoardMain/> },
          { path: "Booked", element: <BookedCourses/> },
          { path: "Reserved", element: <Reserved/> },
          { path: "FavouredCourses", element: <FavouredCourses/> },
          { path: "FavouredBlogs", element: <FavouredBlogs/> },
          { path: "Profile", element: <DashBoardProfile/> ,children:[
            {index: true, element: <Navigate to="Personal-Info" replace />},
            { path: "Personal-Info", element: <PersonalInfo/> },
            { path: "Profile-Picture", element: <ProfilePicture/> },
            { path: "Living-Address", element: <LivingAddress/> },
            { path: "Connections", element: <Connections/> },
            { path: "Security", element: <Security/> },
          ]},
        ]}  ,
      ],
    },
]);

export default router;