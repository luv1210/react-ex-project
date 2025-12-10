import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import StudentList from "./Components/Student/StudentList";
import StudentForm from "./Components/Student/StudentForm";
import StudentDetails from "./Components/Student/StudentDetails";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import Footer from "./Components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initAuthListener } from "./Redux/auth/actions";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Add a local loading state to wait for auth init
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Initialize auth state and set authChecked true when done
    dispatch(initAuthListener()).then(() => {
      setAuthChecked(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (authChecked) {
      if (!isAuthenticated) {
        // If not logged in, redirect to signin (unless already there)
        if (location.pathname !== "/signin" && location.pathname !== "/signup") {
          navigate("/signin", { replace: true });
        }
      } else {
        // If logged in and on signin/signup, redirect to home
        if (location.pathname === "/signin" || location.pathname === "/signup") {
          navigate("/", { replace: true });
        }
      }
    }
  }, [isAuthenticated, authChecked, navigate, location.pathname]);

  // While auth is loading, show a loading screen or nothing
  if (!authChecked) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Only show Navbar and Footer if logged in
  const showHeaderFooter = isAuthenticated;

  return (
    <div className="d-flex flex-column min-vh-100">
      {showHeaderFooter && <Navbar />}

      <div className="flex-grow-1">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentDetails />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={isAuthenticated ? <Home /> : <SignIn />} />
        </Routes>
      </div>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
