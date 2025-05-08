import React from "react";
import footerLogo from "../assets/Footer.jpg";

const Footer = () => {
  return (
    <footer
      className="flex items-center justify-between px-6 py-4"
      style={{ height: "160px", backgroundColor: "#145FEB" }}
    >
      <div className="flex flex-col items-start space-y-2">
        <h2 className="text-white text-xl font-semibold">Pets and Vets</h2>{" "}
        <img src={footerLogo} alt="Logo" className="h-14" />
      </div>

      <div className="flex flex-col space-y-2">
        <a href="#" className="text-white hover:text-gray-200 text-lg">
          About Us
        </a>{" "}
        <a href="#" className="text-white hover:text-gray-200 text-lg">
          Delivery Options
        </a>{" "}
        <a href="#" className="text-white hover:text-gray-200 text-lg">
          Privacy Policy
        </a>{" "}
      </div>

      <div className="flex flex-col space-y-2 items-center">
        <a
          href="mailto:vetsandpetsnepal.com"
          className="text-white hover:text-gray-200 text-lg"
        >
          petsandvetsnepal@gmail.com
        </a>{" "}
        <div className="flex space-x-4 items-center">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="h-6 w-6"
            />
          </a>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-6 w-6"
            />
          </a>
          <a href="#">
            <img
              src="https://abs.twimg.com/favicons/twitter.2.ico"
              alt="Twitter"
              className="h-6 w-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
