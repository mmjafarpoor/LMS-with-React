import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer , Bounce } from 'react-toastify';
import './App.css'
import useDarkStore from "../store/DarkStore";


function App() {
  const isDarkMode = useDarkStore((state) => state.isDarkMode);
  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        fontFamily="IranSans" 
        transition={Bounce}
        toastStyle={{fontFamily: "IranSans"}}
      />
    </>
  )
}

export default App
