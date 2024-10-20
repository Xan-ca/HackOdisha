import React from 'react'
import LandingPage from './LandingPage'
import ChatInterface from './ChatPart/ChatInterface'
import TextContextProvider from './ContextProviders/TextContextProvider'
import Test from './Test'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/home",
    element: <LandingPage/>,
  },
  {
    path:"/chat",
    element:<TextContextProvider>
    <ChatInterface/>
   </TextContextProvider>
  },
  {
    path:"/mytickets",
    element:<div>
      <Test/>
    </div>
  }
]);
const App = () => {
    
  return (
   <>
  <RouterProvider router={router} />
   </>
  )
}






export default App
