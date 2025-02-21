import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import UserForm from './pages/UserForm';

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
