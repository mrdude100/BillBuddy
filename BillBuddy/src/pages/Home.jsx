import React from "react";
import Feedback from "../components/Feedback";
import billsplit from "../assets/billsplit.png";
import Usage from "../components/Usage";
// import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              BillBuddy: Simplify Your Group Expenses
            </h1>
            <p className="mb-8 leading-relaxed">
              Managing group expenses has never been easier. With BillBuddy, you
              can effortlessly split, and settle shared costs among friends.
              Whether you're out for dinner, shopping, or a trip, BillBuddy
              ensures everyone pays their fair share. Say goodbye to the hassle
              of splitting bills and enjoy more time with your friends.
            </p>
            <div className="flex justify-center">
              <Link
                to="/item-details"
                className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="billsplit"
              src={billsplit}
            />
          </div>
        </div>
      </section>
      <Usage />
      {/* <Testimonials /> */}
      {/* <Feedback /> */}
    </main>
  );
};

export default Home;
