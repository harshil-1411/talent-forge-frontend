// src/App.js

import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gigs from "./pages/Gigs";
import Gig from "./pages/Gig";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import Message from "./pages/Message";
import MyGigs from "./pages/MyGigs";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// 1. Create the client OUTSIDE the component
const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/myGigs", element: <MyGigs /> },
        { path: "/orders", element: <Orders /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/add", element: <Add /> },
        { path: "/gig/:id", element: <Gig /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    // 2. Wrap your RouterProvider with the QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;