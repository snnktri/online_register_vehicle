import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import UserForm from './pages/UserForm';
import RegistrationDetails from './pages/RegistrationDetails';
import RegisterVehicle from './pages/RegisterVehicle';
import Payment from './pages/Payment';
import UserProfileInterface from './pages/UserProfileInterface';
import Status from './pages/Status';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "userDetails",
            element: <UserForm />
          },
          {
            path: "registerDetails",
            element: <RegistrationDetails />
          },
          {
            path: "registerVehicle",
            element: <RegisterVehicle />
          },
          {
            path: "payment",
            element: <Payment />
          }
          ,{
            path: "userInterface",
            element: <UserProfileInterface />,
            // children: []
          },
          {
            path: "status",
            element: <Status />
          }
        ]
      }
    ]
  );
  return (
  <RouterProvider router={router}>

  </RouterProvider>
  )
}

export default App
