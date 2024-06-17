import React, { useState } from "react";
import { useMyContext } from "../contexts/MyContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const { isAuthorized, setIsAuthorized, user, setUser } = useMyContext();
  console.log("navbar re-renders");

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${String(import.meta.env.VITE_BACKEND_API_BASEURL)}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser({});

      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <NavLink to='/' className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </NavLink>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              onClick={() => setShow(false)}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/job/getall"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              onClick={() => setShow(false)}
            >
              JOBS
            </NavLink>
          </li>

          {user && user.role === "Job Seeker" && (
            <li>
              <NavLink
                to="/myApplications"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                onClick={() => setShow(false)}
              >
                MY APPLICATIONS
              </NavLink>
            </li>
          )}

          {user && user.role === "Recruiter" && (
            <>
              <li>
                <NavLink
                  to="/job/post"
                  className={({ isActive }) => (isActive ? "active" : "inactive")}
                  onClick={() => setShow(false)}
                >
                  POST NEW JOB
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/job/me"
                  className={({ isActive }) => (isActive ? "active" : "inactive")}
                  onClick={() => setShow(false)}
                >
                  VIEW YOUR JOBS
                </NavLink>
              </li>
            </>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
