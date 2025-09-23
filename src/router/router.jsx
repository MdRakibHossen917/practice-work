import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Components/Pages/Home/Home";
import About from "../Components/Pages/About/About";
import Services from "../Components/Pages/Services/Services";
import Contract from "../Components/Pages/Contract/Contract";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,  
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact",
        element: <Contract />,
      },
     
       
    ],
  },
]);
