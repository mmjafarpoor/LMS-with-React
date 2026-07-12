import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Landing = lazy(() => import("../../pages/Landing"));
// import Landing from "../../pages/Landing";
const Home = lazy(() => import("../../pages/Home"));
// import Home from "../../pages/Home";
const Auth = lazy(() => import("../../pages/Auth"));
// import Auth from "../../pages/Auth";
import Login from "../../components/AuthContainer/Login";
import SignUp from "../../components/AuthContainer/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword";
const Courses = lazy(() => import("../../pages/Courses"));
// import Courses from "../../pages/Courses";
import CourseDetails from "../../components/CoursesPage/CourseDetails/CourseDetails";
const Teachers = lazy(() => import("../../pages/Teachers"));
// import Teachers from "../../pages/Teachers";
import TeacherDetails from "../../components/TeacherContainer/TeacherDetails";
const News = lazy(() => import("../../pages/News"));
// import News from "../../pages/News";
import NewsDetails from "../../components/NewsContainer/NewsDetails";
const Contact = lazy(() => import("../../pages/Contact"));
// import Contact from "../../pages/Contact";
import Error404 from "../../pages/Error404";
const DashBoard = lazy(() => import("../../pages/DashBoard"));
// import DashBoard from "../../pages/DashBoard";
import DashBoardMain from "../../components/DashBoard/DashBoardMain/DashBoardMain";
import BookedCourses from '../../components/DashBoard/BookedCourses/BookedCourses';
import Reserved from '../../components/DashBoard/Reserved/Reserved';
import FavouredCourses from '../../components/DashBoard/FavouredCourses/FavouredCourses';
import FavouredBlogs from '../../components/DashBoard/FavouredBlogs/FavouredBlogs';
const DashBoardProfile = lazy(() => import("../../components/DashBoard/DashBoardProfile/DashBoardProfile"));
// import DashBoardProfile from '../../components/DashBoard/DashBoardProfile/DashBoardProfile';
import PersonalInfo from "../../components/DashBoard/DashBoardProfile/Personal-Info/PersonalInfo";
import ProfilePicture from "../../components/DashBoard/DashBoardProfile/ProfilePicture/ProfilePicture";
import LivingAddress from "../../components/DashBoard/DashBoardProfile/LivingAddress/LivingAddress";
import Connections from "../../components/DashBoard/DashBoardProfile/Connections/Connections";





const router = createBrowserRouter([
    { path: "/", element: <Landing/> , children:[
        {index: true, element: <Home/> },
        { path: "Home", element: <Home/> },
        { path: "Courses", element: <Courses/> },
        { path: "Courses/:courseId", element: <CourseDetails/> },
        { path: "Teachers", element: <Teachers /> },
        { path: "Teachers/:teacherId/:TeacherName", element: <TeacherDetails /> },
        { path: "News", element: <News/> },
        { path: "News/:id/:NewsName", element: <NewsDetails /> },
        { path: "Contact", element: <Contact/> },
        { path: "*", element: <Error404/> },
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
          {index: true, element: <DashBoardMain/> },
          { path: "Main", element: <DashBoardMain/> },
          { path: "Booked", element: <BookedCourses/> },
          { path: "Reserved", element: <Reserved/> },
          { path: "FavouredCourses", element: <FavouredCourses/> },
          { path: "FavouredBlogs", element: <FavouredBlogs/> },
          { path: "Profile", element: <DashBoardProfile/> ,children:[
            {index: true, element: <PersonalInfo/> },
            { path: "Personal-Info", element: <PersonalInfo/> },
            { path: "Profile-Picture", element: <ProfilePicture/> },
            { path: "Living-Address", element: <LivingAddress/> },
            { path: "Connections", element: <Connections/> },
          ]},
        ]}  ,
      ],
    },
]);

export default router;
