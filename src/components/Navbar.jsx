import React, { useContext } from "react";
import Logo from "../assets/logo.svg";
import { MdOpenInNew } from "react-icons/md";
import { coinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(coinContext);
  const currencyChange = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="flex flex-row justify-between font-outfit font-semibold items-center p-1 bg-[#2b1b26] border-2 border-b-[#5b0f4e] border-t-[#2b1b26] border-r-[#2b1b26] border-l-[#2b1b26]">
      <div className="flex flex-row mr-2">
        <Link to={"/"} className="flex flex-row mr-2">
          <img className="h-20 w-30 rounded-full" src={Logo} alt="Logo" />
          <span className="text-3xl font-bold text-white mt-5">BitNexus</span>
        </Link>
      </div>
      <ul className="flex text-white justify-between items-center">
        <Link to={"/"}>
          <li className="m-10 cursor-pointer text-xl">Home</li>
        </Link>
        <Link to={"/bitcoin"}>
          <li className="m-10 cursor-pointer text-xl">Bitcoin Transactions</li>
        </Link>
        <Link to={"/qrcode"}>
          <li className="m-10 cursor-pointer text-xl">QR Code</li>
        </Link>
      </ul>
      <div className="mr-20 flex">
        <select
          onChange={currencyChange}
          className="mr-20 text-white p-1 bg-[#2b1b26] border-2 rounded-md"
        >
          <option value="usd">USD&nbsp;($)</option>
          <option value="eur">EUR&nbsp;(€)</option>
          <option value="inr">INR&nbsp;(₹)</option>
        </select>

        <div className="flex flex-row cursor-pointer shadow-black shadow-xl bg-[#ddd] text-black p-2 rounded-full justify-between items-center">
          <button className="mr-1 flex justify-between items-center p-1 m-1 cursor-pointer">
            Sign Up &nbsp;
            <MdOpenInNew />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
