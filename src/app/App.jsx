import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer , Bounce } from 'react-toastify';
import './App.css'
import useDarkStore from "../store/DarkStore";
import { Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner/LoadingSpinner";
import { ThemeManager } from "@/components/Theme/ThemeManager";

function App() {
  const isDarkMode = useDarkStore((state) => state.isDarkMode);
  
  return (
    <>
      <ThemeManager/>
      <Suspense fallback={<LoadingSpinner/>}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl
          stacked
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
          fontFamily="IranSans" 
          transition={Bounce}
          toastStyle={{fontFamily: "IranSans"}}
        />
      </Suspense>
    </>
  )
}

export default App
