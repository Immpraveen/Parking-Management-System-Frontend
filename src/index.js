import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cookies from "js-cookie";
import './index.css';

import Services from "./pages/Services"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from './pages/Register';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AdminServices from './pages/AdminServices';
import ForgotPassword from './pages/ForgotPassword';
// Define a wrapper component that checks for authentication status
function AuthWrapper({ children }) {
  const token = Cookies.get("token");
  if (token) {
    return children;
  } else {
    return <Login />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/resetpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/services",
    element: <AuthWrapper><Services /></AuthWrapper>,
    auth: true,
  },
  {
    path: "/contact",
    element: <AuthWrapper><Contact /></AuthWrapper>,
    auth: true,
  },
  {
    path: "/about",
    element: <AuthWrapper><About /></AuthWrapper>,
    auth: true,
  },
  {
    path: "/adminservices",
    element: <AuthWrapper><AdminServices /></AuthWrapper>,
    auth: true,
  },
], {
  // Define a custom check for the authentication status
  onBeforeEnter({ route }) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isAuthenticated = userData && userData.auth;
    if (route.auth && !isAuthenticated) {
      return '/';
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
