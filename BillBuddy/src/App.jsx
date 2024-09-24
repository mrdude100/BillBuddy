import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ItemDetails from "./pages/ItemDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useFirebase } from "./config/context/context";

const App = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      localStorage.getItem("email") === null &&
      location.pathname === "/login"
    ) {
      navigate("/login");
    } else if (
      localStorage.getItem("email") === null &&
      location.pathname === "/signup"
    ) {
      navigate("/signup");
    } else if (localStorage.getItem("email") === null) {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  const isLoggedIn = !!user;

  return (
    <>
      {isLoggedIn &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {isLoggedIn &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && <Footer />}
    </>
  );
};

export default App;
