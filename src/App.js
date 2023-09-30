import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signin from './pages/Signin';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/signin",
    element: <Signin/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

const App = () => {

  return (
    <div className="bg-white">
      <RouterProvider router={router} />
    </div>
  )
}

export default App