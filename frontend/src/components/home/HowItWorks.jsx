import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZee Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Creating an account on JobZee is simple and straightforward.
              Sign up today to unlock endless opportunities on JobZee!
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
              On JobZee, job seekers can easily find their ideal job, while recruiters can effortlessly post job listings to attract top talent. Join JobZee today and connect with your next opportunity or candidate!
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
              On JobZee, job seekers can effortlessly apply for their ideal positions, while recruiters can find and hire top talent swiftly. Join JobZee to connect with your next career move or perfect candidate today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
