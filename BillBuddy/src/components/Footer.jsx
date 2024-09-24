import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      {/* <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          to="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-white"
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 bg-red-500 rounded-full p-1"
          />
          <span className="ml-3 text-xl">BillBuddy</span>
        </Link>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          Made with ❤️ by
          <a
            href="https://github.com/manik-18"
            className="text-gray-500 ml-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @manik-18
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://www.linkedin.com/in/manik1810/"
            target="_blank"
            className="ml-3 text-gray-400"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div> */}
    </footer>
  );
};

export default Footer;
