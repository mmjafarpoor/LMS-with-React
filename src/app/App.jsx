import { RouterProvider } from "react-router-dom"
import router from "../app/router/router"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./App.css"

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
