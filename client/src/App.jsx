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
import SucessPayment from './pages/SucessPayment';
import LoginAdAdmin from './admin/LoginAdAdmin';
import AdminPanel from './admin/AdminPanel';
import AdminBoard from './admin/AdminBoard';
import UpdateRegister from './pages/UpdateRegister';
import UpdatePayment from './pages/UpdatePayment';
import ChangeStatus from './admin/ChangeStatus';
import UserDetails from './admin/UserDetails';
import VehicleDetails from './admin/VehicleDetails';
import RegisterDetails from './admin/RegisterDetails';

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
          },
          {
            path: "updateRegister",
            element: <UpdateRegister />
          },
          {
            path: "SucessPayment",
            element: <SucessPayment />
          },
          {
            path: "updatePay",
            element: <UpdatePayment />
          },

          {
            path: "loginAdmin",
            element: <LoginAdAdmin />
          },
          {
            path: "admin",
            element: <AdminPanel />,
            children: [
              {
                index: true,
                element: <AdminBoard />
              },
              {
                path: "changeStutus",
                element: <ChangeStatus />
              },
              {
                path: "userDetails",
                element: <UserDetails />
              },
              {
                path: "vDetails",
                element: <VehicleDetails />
              },
              {
                path: "rDetails",
                element: <RegisterDetails />
              },

              
            ]
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
