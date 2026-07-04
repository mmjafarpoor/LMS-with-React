import { createBrowserRouter } from "react-router-dom";

import Landing from "../../pages/Landing";
import Home from "../../pages/Home";
import HomeEdit from "../../pages/Home-Edit";
import Auth from "../../pages/Auth";
import Login from "../../components/AuthContainer/Login";
import SignUp from "../../components/AuthContainer/SignUp";
import ForgetPassword from "../../components/AuthContainer/ForgetPassword";
import Courses from "../../pages/Courses";
import CourseDetails from "../../components/CoursesPage/CourseDetails/CourseDetails";
import Teachers from "../../pages/Teachers";
import TeacherDetails from "../../components/TeacherContainer/TeacherDetails";
import News from "../../pages/News";
import NewsDetails from "../../components/NewsContainer/NewsDetails";
import Contact from "../../pages/Contact";
import Error404 from "../../pages/Error404";
import DashBoard from "../../pages/DashBoard";
import DashBoardMain from "../../components/DashBoard/DashBoardMain/DashBoardMain";
import BookedCourses from '../../components/DashBoard/BookedCourses/BookedCourses'
import Reserved from '../../components/DashBoard/Reserved/Reserved'
import FavouredCourses from '../../components/DashBoard/FavouredCourses/FavouredCourses'
import FavouredBlogs from '../../components/DashBoard/FavouredBlogs/FavouredBlogs'
import DashBoardProfile from '../../components/DashBoard/DashBoardProfile/DashBoardProfile'
import PersonalInfo from "../../components/DashBoard/DashBoardProfile/Personal-Info/PersonalInfo";
import ProfilePicture from "../../components/DashBoard/DashBoardProfile/ProfilePicture/ProfilePicture";
import LivingAddress from "../../components/DashBoard/DashBoardProfile/LivingAddress/LivingAddress";
import Connections from "../../components/DashBoard/DashBoardProfile/Connections/Connections";




const router = createBrowserRouter([
    { path: "/", element: <Landing/> , children:[
        {index: true, element: <Home/> },
        { path: "Home", element: <Home/> },
        { path: "HomeEdit", element: <HomeEdit/> },
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
    {
      path: "/Dashboard",
      element: <DashBoard/>,
      children: [
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
      ],
    },
]);

export default router;
