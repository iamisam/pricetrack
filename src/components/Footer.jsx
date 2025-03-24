import React from "react";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";

const Footer = () => {
  return (
    <div className="align-bottom justify-between items-center text-center h-30 mt-20">
      <hr className="mx-40 text-gray-500" />
      <p className="text-white flex flex-row items-center ml-140 font-bold text-lg mt-10">
        Contact me @ &nbsp;
        <MdEmail className="mt-1"/>: isamaziz256@gmail.com &nbsp; | &nbsp;
        <MdLocalPhone className="mt-1"/>: (+91) 8969692882
      </p>
    </div>
  );
};

export default Footer;
