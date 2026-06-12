import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer , Bounce } from 'react-toastify';
import './App.css'
function App() {
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
        theme="light"
        fontFamily="IranSans" 
        transition={Bounce}
      />
    </>
  )
}

export default App
