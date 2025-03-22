import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BTC from "../assets/tokenicons/btc.svg";
import ETH from "../assets/tokenicons/eth2.svg";
import ETHC from "../assets/tokenicons/eth.svg";
import USD from "../assets/tokenicons/usd.svg";
import USDT from "../assets/tokenicons/tether.svg";
import BNB from "../assets/tokenicons/binance.svg";
import XRP from "../assets/tokenicons/ripple.svg";
import { coinContext } from "../context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(coinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandle = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandle = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  return (
    <>
      <div
        className="flex flex-col md:flex-row w-4/5 justify-between items-cent
er mx-auto py-10"
      >
        <div className="md:w-3/6 w-full">
          <h1 className="text-white text-5xl font-bold">
            Track Prices, <br /> Market Trends, <br />{" "}
            <span className="text-gradient">Bitcoin</span> Portfolio Management
          </h1>
          <p className="text-gray-500 font-bold text-lg mt-3">
            All in one place.
          </p>
          <div className="mt-3 flex flex-row justify-between items-center">
            <form onSubmit={searchHandle} className="bg-white mt-4 rounded-4xl">
              <input
                onChange={inputHandle}
                value={input}
                required
                className="text-2xl pl-10 border-none outline-none text-black rounded-full"
                type="text"
                placeholder="Search Token..."
                list="coinlist"
              />

              <datalist id="coinlist">
                {allCoin.map((item, index) => (
                  <option key={index} value={item.name} />
                ))}
              </datalist>

              <button
                className="bg-[#7927ff] hover:bg-[#7927ff]/80 text-white border-none outline-none font-semibold text-2xl p-3 rounded-2xl m-6 cursor-pointer"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-5 gap-6 justify-items-center items-center mx-auto mt-10">
            <div></div>
            <img
              className="shadow-[#3AB83A] rounded-full mb-10 shadow-xl bg-transparent h-30 w-30"
              src={ETHC}
              alt="ETHC"
            />
            <div></div>
            <img
              className="shadow-[#83BD67] rounded-full mb-10 shadow-xl bg-transparent h-30 w-30"
              src={USD}
              alt="USD"
            />
            <div></div>
            <img
              className="shadow-[#FFFFFF] rounded-full mb-10 shadow-xl bg-transparent h-30 w-30"
              src={ETH}
              alt="ETH"
            />
            <div></div>
            <img
              className="shadow-[#F7931A] rounded-full mb-10 shadow-xl bg-transparent h-30 w-30"
              src={BTC}
              alt="BTC"
            />
            <div></div>
            <img
              className="shadow-[#F3BA2F] rounded-full mb-10 shadow-xl bg-transparent h-30 w-30"
              src={BNB}
              alt="BNB"
            />
            <div></div>
            <img
              className="shadow-[#00A478] rounded-full shadow-xl bg-transparent h-30 w-30"
              src={USDT}
              alt="USDT"
            />
            <div></div>
            <img
              className="shadow-[#00A478] rounded-full shadow-xl bg-transparent h-30 w-30"
              src={XRP}
              alt="XRP"
            />
            <div></div>
          </div>
        </div>
      </div>
      <div className="max-w-[800px] mt-20 mx-auto bg-[#002834] rounded-2xl text-white">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] justify-between border-b-1 border-b-[#3c3c3c] font-bold items-center px-5 py-10">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] justify-between border-b-1 border-b-[#3c3c3c] items-center px-5 py-10"
            key={index}
          >
            <p>{item.market_cap_rank}</p>
            <div className="flex flex-row items-center font-semibold">
              <img src={item.image} alt="cryptologo" className="w-10 mr-4" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                item.price_change_percentage_24h > 0
                  ? "text-green-500 text-center"
                  : "text-red-600 text-center"
              }
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>
            <p className="text-right">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
