import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signin from './pages/Signin';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
  const dispatch = useDispatch();
  const {selectedLocation} = useSelector(state => state.user)

  useEffect(() => {
    // eslint-disable-next-line
    // fetchCarData(selectedLocation);
    // fetchLocationData();
  }, [])
  
  const fetchCarData = async (loc) => {
    // const cars = await fetch(`${BACKEND_URL}/api/car?location=${loc}`);
    // const data = await cars.json();
    // dispatch(setCars({
    //   cars : data.cars
    // }));
  };

  const fetchLocationData = async () => {
    // const loc = await fetch(`${BACKEND_URL}/api/location`);

    // const data = await loc.json();
    // dispatch(setLocations({
    //   locations : data.locations
    // }));
  }

  return (
    <div className="bg-white">
      <RouterProvider router={router} />
    </div>
  )
}

export default App