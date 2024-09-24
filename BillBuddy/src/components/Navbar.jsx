import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useFirebase } from "../config/context/context";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useFirebase();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You have to login again to use!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      });

      if (result.isConfirmed) {
        await logout();
        localStorage.removeItem("email");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Logout unsuccessful!");
      Swal.fire({
        title: "Unsuccessful",
        text: "Logout Unsuccessful",
        icon: "error",
      });
    }
  };

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 bg-red-500 rounded-full p-1"
          />
          <span className="ml-3 text-xl">BillBuddy</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <HashLink to="/#usage" className="mr-5 hover:text-white">
            Usage
          </HashLink>
          <HashLink to="/#feedback" className="mr-5 hover:text-white">
            Feedback
          </HashLink>
          <HashLink to="/#testimonials" className="mr-5 hover:text-white">
            Testimonials
          </HashLink>
        </nav>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          <div className="flex items-center justify-center gap-1">
            {user ? (
              <div
                className="flex items-center justify-center"
                onClick={handleLogout}
              >
                {user && user.email && (
                  <p className="mr-1">{user.email.split("@")[0]}</p>
                )}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            )}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
