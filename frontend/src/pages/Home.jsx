import React from "react";
import { useMyContext } from "../contexts/MyContext";
import { Navigate } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import PopularCategories from "../components/home/PopularCategories";
import PopularCompanies from "../components/home/PopularCompanies";

const Home = () => {
  console.log("home re-renders....")
  const { isAuthorized } = useMyContext();
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;