import React from "react";
import { useMyContext } from "../contexts/MyContext";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useMyContext();
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By JobZee.</div>
      <div>
        <Link >
          <FaFacebookF />
        </Link>
        <Link >
          <FaYoutube />
        </Link>
        <Link>
          <FaLinkedin />
        </Link>
        <Link>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
